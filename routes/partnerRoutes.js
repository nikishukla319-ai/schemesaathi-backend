const express = require("express");
const Partner = require("../models/Partner");

const router = express.Router();

// ==================== GET ALL PARTNERS ====================
router.get("/", async (req, res) => {
  try {
    const partners = await Partner.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.json({
      count: partners.length,
      partners,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch partners",
      error: error.message,
    });
  }
});


// ==================== MATCH PARTNERS ====================
router.post("/match", async (req, res) => {
  try {
    const {
      category,
      amount,
      state,
    } = req.body;

    const requiredAmount = Number(amount) || 0;

    const partners = await Partner.find({
      active: true,
    });

    const matchedPartners = partners
      .map((partner) => {
        let score = 50;
        const reasons = [];

        // Category match
        if (
          !category ||
          category === "any" ||
          partner.category === category
        ) {
          score += 25;
          reasons.push("Partner supports your selected category");
        } else {
          score -= 15;
        }

        // Loan amount
        if (requiredAmount > 0) {
          if (requiredAmount <= partner.maxLoanAmount) {
            score += 20;
            reasons.push("Required amount is within partner loan limit");
          } else {
            score -= 20;
          }
        }

        // State
        if (
          !state ||
          state === "any" ||
          partner.state === "All India" ||
          partner.state.toLowerCase() === state.toLowerCase()
        ) {
          score += 5;
          reasons.push("Partner is available for your location");
        }

        score = Math.max(0, Math.min(99, score));

        return {
          ...partner.toObject(),
          matchScore: score,
          reasons,
        };
      })
      .filter((partner) => partner.matchScore >= 55)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      message: "Partner recommendations generated successfully",
      count: matchedPartners.length,
      partners: matchedPartners,
    });
  } catch (error) {
    res.status(500).json({
      message: "Partner matching failed",
      error: error.message,
    });
  }
});

module.exports = router;