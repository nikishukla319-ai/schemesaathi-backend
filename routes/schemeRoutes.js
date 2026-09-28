const express = require("express");
const Scheme = require("../models/Scheme");

const router = express.Router();

// ==================== GET ALL ACTIVE SCHEMES ====================
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


// ==================== GET SINGLE SCHEME ====================
router.get("/:id", async (req, res) => {
  try {
    const scheme = await Scheme.findOne({
      _id: req.params.id,
      active: true,
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
      });
    }

    res.json({
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch scheme",
      error: error.message,
    });
  }
});


// ==================== SMART SCHEME MATCHING ====================
router.post("/match", async (req, res) => {
  try {
    const {
      category,
      amount,
      age,
      annualIncome,
      occupation,
      businessType,
      state,
    } = req.body;

    const requiredAmount = Number(amount) || 0;
    const userAge = Number(age) || 0;
    const income = Number(annualIncome) || 0;

    const schemes = await Scheme.find({
      active: true,
    });

    const matchedSchemes = schemes
      .map((scheme) => {
        let score = 50;
        const reasons = [];
        const warnings = [];

        // ==================== CATEGORY MATCH ====================
        if (
          !category ||
          category === "any" ||
          category === scheme.category
        ) {
          score += 20;

          reasons.push("Scheme category matches your requirement");
        } else {
          score -= 10;

          warnings.push("Scheme category may not exactly match your requirement");
        }


        // ==================== AMOUNT MATCH ====================
        if (requiredAmount > 0) {
          if (
            requiredAmount >= scheme.minAmount &&
            requiredAmount <= scheme.maxAmount
          ) {
            score += 20;

            reasons.push(
              "Required project amount is within the scheme limit"
            );
          } else if (requiredAmount <= scheme.maxAmount) {
            score += 10;

            reasons.push(
              "Required amount can be partially covered under the scheme"
            );
          } else {
            score -= 20;

            warnings.push(
              "Required project amount is higher than the scheme limit"
            );
          }
        }


        // ==================== AGE CHECK ====================
        if (userAge > 0) {
          if (userAge >= 18 && userAge <= 60) {
            score += 5;

            reasons.push("Age requirement appears suitable");
          } else {
            score -= 10;

            warnings.push("Age may not satisfy common eligibility requirements");
          }
        }


        // ==================== INCOME CHECK ====================
        if (income > 0) {
          if (income <= 1000000) {
            score += 5;

            reasons.push("Income profile may fit targeted assistance schemes");
          } else {
            warnings.push(
              "Income may be above the limit for some assistance schemes"
            );
          }
        }


        // ==================== OCCUPATION CHECK ====================
        if (occupation) {
          const occupationText = occupation.toLowerCase();

          if (
            occupationText.includes("business") ||
            occupationText.includes("entrepreneur") ||
            occupationText.includes("self")
          ) {
            if (
              scheme.category === "Business" ||
              scheme.category === "Employment"
            ) {
              score += 5;

              reasons.push(
                "Scheme is relevant to entrepreneurship/self-employment"
              );
            }
          }
        }


        // ==================== BUSINESS TYPE CHECK ====================
        if (businessType) {
          if (scheme.category === "Business") {
            score += 5;

            reasons.push(
              "Business-related scheme matches your business requirement"
            );
          }
        }


        // ==================== STATE ====================
        if (state) {
          score += 2;

          reasons.push(
            "Scheme can be considered for your selected state"
          );
        }


        // ==================== FINAL SCORE ====================
        score = Math.max(0, Math.min(99, score));


        // ==================== ELIGIBILITY ====================
        const eligible = score >= 65;


        return {
          _id: scheme._id,
          name: scheme.name,
          shortName: scheme.shortName,
          category: scheme.category,
          ministry: scheme.ministry,
          summary: scheme.summary,
          minAmount: scheme.minAmount,
          maxAmount: scheme.maxAmount,
          interestRate: scheme.interestRate,
          maxTenureMonths: scheme.maxTenureMonths,
          benefits: scheme.benefits,
          documents: scheme.documents,
          officialLink: scheme.officialLink,

          matchScore: score,
          eligible,

          reasons,
          warnings,
        };
      })
      .filter((scheme) => scheme.matchScore >= 55)
      .sort((a, b) => b.matchScore - a.matchScore);


    res.json({
      message: "Scheme recommendations generated successfully",

      userInput: {
        category,
        amount: requiredAmount,
        age: userAge,
        annualIncome: income,
        occupation,
        businessType,
        state,
      },

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