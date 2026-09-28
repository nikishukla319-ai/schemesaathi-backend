const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==================== GET PROFILE ====================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
});


// ==================== UPDATE PROFILE ====================
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      state,
      district,
      category,
      annualIncome,
      occupation,
      businessType,
      projectCost,
      phone,
      address,
    } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update only provided fields
    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (gender !== undefined) user.gender = gender;
    if (state !== undefined) user.state = state;
    if (district !== undefined) user.district = district;
    if (category !== undefined) user.category = category;
    if (annualIncome !== undefined) user.annualIncome = annualIncome;
    if (occupation !== undefined) user.occupation = occupation;
    if (businessType !== undefined) user.businessType = businessType;
    if (projectCost !== undefined) user.projectCost = projectCost;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        gender: user.gender,
        state: user.state,
        district: user.district,
        category: user.category,
        annualIncome: user.annualIncome,
        occupation: user.occupation,
        businessType: user.businessType,
        projectCost: user.projectCost,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

module.exports = router;