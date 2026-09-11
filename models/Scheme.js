const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortName: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Business",
        "Housing",
        "Education",
        "Agriculture",
        "Employment",
        "Welfare",
      ],
    },

    ministry: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    minAmount: {
      type: Number,
      default: 0,
    },

    maxAmount: {
      type: Number,
      default: 0,
    },

    interestRate: {
      type: Number,
      default: 0,
    },

    maxTenureMonths: {
      type: Number,
      default: 0,
    },

    eligibility: [
      {
        label: String,
        met: {
          type: Boolean,
          default: false,
        },
        detail: String,
      },
    ],

    documents: [
      {
        type: String,
      },
    ],

    benefits: {
      type: String,
    },

    officialLink: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },

    applicants: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Scheme = mongoose.model("Scheme", schemeSchema);

module.exports = Scheme;