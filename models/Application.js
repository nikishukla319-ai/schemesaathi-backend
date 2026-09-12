const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchemeSaathiUser",
      required: true,
    },

    applicantName: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    schemeId: {
      type: String,
      required: true,
    },

    schemeName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "Approved",
        "Rejected",
      ],
      default: "Submitted",
    },

    applicationId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "SchemeSaathiApplication",
  applicationSchema,
  "schemesaathi_applications"
);

module.exports = Application;