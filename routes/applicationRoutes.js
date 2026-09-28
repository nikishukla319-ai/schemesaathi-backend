const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==================== CREATE APPLICATION ====================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      applicantName,
      businessName,
      category,
      amount,
      purpose,
      schemeId,
      schemeName,
    } = req.body;

    if (
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

    const applicationId = `SS-${Date.now()}`;

    const application = await Application.create({
      userId: req.user.userId,
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


// ==================== GET MY APPLICATIONS ====================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});


// ==================== GET SINGLE APPLICATION ====================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message,
    });
  }
});


// ==================== UPDATE APPLICATION STATUS ====================
// Prototype/admin simulation
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Submitted",
      "Under Review",
      "Documents Required",
      "Approved",
      "Rejected",
      "Disbursed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application status",
      error: error.message,
    });
  }
});

module.exports = router;