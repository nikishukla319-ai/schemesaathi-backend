const express = require("express");

const router = express.Router();

// ==================== EMI CALCULATOR ====================
router.post("/emi", (req, res) => {
  try {
    const { amount, interestRate, tenureMonths } = req.body;

    const principal = Number(amount);
    const annualRate = Number(interestRate);
    const months = Number(tenureMonths);

    if (!principal || principal <= 0) {
      return res.status(400).json({
        message: "Valid loan amount is required",
      });
    }

    if (annualRate < 0) {
      return res.status(400).json({
        message: "Interest rate cannot be negative",
      });
    }

    if (!months || months <= 0) {
      return res.status(400).json({
        message: "Valid tenure is required",
      });
    }

    const monthlyRate = annualRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    res.json({
      message: "EMI calculated successfully",

      input: {
        amount: principal,
        interestRate: annualRate,
        tenureMonths: months,
      },

      result: {
        monthlyEMI: Number(emi.toFixed(2)),
        totalPayment: Number(totalPayment.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "EMI calculation failed",
      error: error.message,
    });
  }
});

module.exports = router;