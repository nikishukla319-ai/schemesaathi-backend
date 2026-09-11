const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

// Get all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find({ active: true })
      .sort({ createdAt: -1 });

    res.json({
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch schemes",
      error: error.message,
    });
  }
});

// Match schemes according to user's requirement
router.post("/match", async (req, res) => {
  try {
    const {
      category,
      amount,
    } = req.body;

    const requiredAmount = Number(amount) || 0;

    const schemes = await Scheme.find({
      active: true,
    });

    const matchedSchemes = schemes
      .map((scheme) => {
        let score = 60;

        // Category match
        if (
          !category ||
          category === "any" ||
          scheme.category === category
        ) {
          score += 20;
        } else {
          score -= 20;
        }

        // Amount fit
        if (
          requiredAmount >= scheme.minAmount &&
          requiredAmount <= scheme.maxAmount
        ) {
          score += 20;
        } else if (
          requiredAmount > 0 &&
          requiredAmount <= scheme.maxAmount
        ) {
          score += 10;
        }

        score = Math.max(0, Math.min(99, score));

        return {
          ...scheme.toObject(),
          match: score,
        };
      })
      .filter((scheme) => scheme.match >= 60)
      .sort((a, b) => b.match - a.match);

    res.json({
      count: matchedSchemes.length,
      schemes: matchedSchemes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Scheme matching failed",
      error: error.message,
    });
  }
});

module.exports = router;