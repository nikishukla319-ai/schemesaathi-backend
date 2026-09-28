const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Bank", "NBFC", "Government", "Private"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Business",
        "Housing",
        "Education",
        "Agriculture",
        "Employment",
        "Welfare",
      ],
      required: true,
    },

    state: {
      type: String,
      default: "All India",
    },

    interestRate: {
      type: Number,
      default: 0,
    },

    maxLoanAmount: {
      type: Number,
      default: 0,
    },

    processingTime: {
      type: String,
      default: "7-15 days",
    },

    description: {
      type: String,
    },

    contact: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;