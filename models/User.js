const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["citizen", "partner", "admin"],
      default: "citizen",
    },

    // ==================== PROFILE ====================
    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    state: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "Other"],
    },

    annualIncome: {
      type: Number,
      min: 0,
    },

    occupation: {
      type: String,
      trim: true,
    },

    businessType: {
      type: String,
      trim: true,
    },

    projectCost: {
      type: Number,
      min: 0,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "SchemeSaathiUser",
  userSchema,
  "schemesaathi_users"
);

module.exports = User;