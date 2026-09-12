const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// ==================== CREATE APPLICATION ====================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      applicantName,
      businessName,
      category,
      amount,
      purpose,
      schemeId,
      schemeName,
    } = req.body;

    // Check required fields
    if (
      !userId ||
      !applicantName ||
      !businessName ||
      !category ||
      !amount ||
      !purpose ||
      !schemeId ||
      !schemeName
    ) {
      return res.status(400).json({
        message: "All application fields are required",
      });
    }

    // Generate application ID
    const applicationId = `SS-${Date.now()}`;

    // Create application
    const application = await Application.create({
      userId,
      applicantName,
      businessName,
      category,
      amount,
      purpose,
      schemeId,
      schemeName,
      applicationId,
      status: "Submitted",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Application creation error:", error);

    res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
});


// ==================== GET USER APPLICATIONS ====================
router.get("/user/:userId", async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      applications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error);

    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});


module.exports = router;