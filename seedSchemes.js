const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const Scheme = require("./models/Scheme");

const schemes = [
  {
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    category: "Business",
    ministry: "Ministry of MSME",
    summary:
      "Credit-linked support for eligible new micro-enterprises in manufacturing and services.",
    minAmount: 50000,
    maxAmount: 2500000,
    interestRate: 11,
    maxTenureMonths: 84,

    eligibility: [
      {
        label: "Age 18+",
        met: true,
        detail: "Applicant must satisfy the applicable age requirement.",
      },
      {
        label: "New enterprise",
        met: true,
        detail: "Scheme supports eligible new micro-enterprises.",
      },
      {
        label: "Eligible project",
        met: true,
        detail: "Project must satisfy PMEGP conditions.",
      },
    ],

    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Project Report",
      "Bank Passbook",
    ],

    benefits:
      "Credit-linked financial support for eligible new micro-enterprise projects.",

    officialLink:
      "https://www.kviconline.gov.in/pmegpeportal/",

    active: true,
    applicants: 2846,
  },

  {
    name: "Pradhan Mantri MUDRA Yojana",
    shortName: "MUDRA",
    category: "Business",
    ministry: "Department of Financial Services",
    summary:
      "Business credit support for eligible micro and small non-corporate, non-farm enterprises.",
    minAmount: 50000,
    maxAmount: 1000000,
    interestRate: 10.5,
    maxTenureMonths: 60,

    eligibility: [
      {
        label: "Eligible business activity",
        met: true,
        detail: "Business activity must fall within applicable MUDRA conditions.",
      },
      {
        label: "Micro enterprise",
        met: true,
        detail: "Scheme focuses on eligible micro enterprises.",
      },
      {
        label: "Valid documents",
        met: true,
        detail: "Required documents must be submitted to the lender.",
      },
    ],

    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Business Proof",
      "Bank Statement",
    ],

    benefits:
      "Credit support for eligible income-generating micro and small business activities.",

    officialLink: "https://www.mudra.org.in/",

    active: true,
    applicants: 1982,
  },

  {
    name: "Stand-Up India Scheme",
    shortName: "Stand-Up India",
    category: "Business",
    ministry: "Department of Financial Services",
    summary:
      "Bank credit support for eligible SC/ST and women entrepreneurs establishing greenfield enterprises.",
    minAmount: 1000000,
    maxAmount: 10000000,
    interestRate: 9.5,
    maxTenureMonths: 84,

    eligibility: [
      {
        label: "SC/ST or Woman entrepreneur",
        met: true,
        detail: "Applicant must satisfy the applicable category requirement.",
      },
      {
        label: "Greenfield enterprise",
        met: true,
        detail: "The enterprise should qualify as a new greenfield project.",
      },
      {
        label: "Loan requirement",
        met: false,
        detail: "Loan amount must satisfy the applicable scheme range.",
      },
    ],

    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Category Certificate",
      "Project Report",
    ],

    benefits:
      "Composite bank credit support with term-loan and working-capital components for eligible enterprises.",

    officialLink: "https://www.standupmitra.in/",

    active: true,
    applicants: 1426,
  },

  {
    name: "CGTMSE Credit Guarantee Scheme",
    shortName: "CGTMSE",
    category: "Business",
    ministry: "Ministry of MSME",
    summary:
      "Credit guarantee support that helps eligible micro and small enterprises access institutional credit.",
    minAmount: 50000,
    maxAmount: 10000000,
    interestRate: 0,
    maxTenureMonths: 84,

    eligibility: [
      {
        label: "Eligible MSE",
        met: true,
        detail: "Enterprise must meet applicable micro or small enterprise requirements.",
      },
      {
        label: "Eligible lender",
        met: true,
        detail: "Credit must be obtained through an eligible lending institution.",
      },
      {
        label: "Scheme conditions",
        met: true,
        detail: "Loan must satisfy applicable guarantee conditions.",
      },
    ],

    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Business Registration",
      "Bank Documents",
    ],

    benefits:
      "Credit guarantee mechanism designed to improve access to institutional credit for eligible enterprises.",

    officialLink: "https://www.cgtmse.in/",

    active: true,
    applicants: 1120,
  },

  {
    name: "PM Vishwakarma",
    shortName: "PM Vishwakarma",
    category: "Business",
    ministry: "Ministry of MSME",
    summary:
      "Support for eligible traditional artisans and craftspeople through training, toolkit and credit-related assistance.",
    minAmount: 10000,
    maxAmount: 300000,
    interestRate: 5,
    maxTenureMonths: 36,

    eligibility: [
      {
        label: "Eligible artisan",
        met: true,
        detail: "Applicant must belong to an eligible traditional trade.",
      },
      {
        label: "Age requirement",
        met: true,
        detail: "Applicant must satisfy the applicable age requirement.",
      },
      {
        label: "Trade verification",
        met: true,
        detail: "Applicant's eligible trade must be verified.",
      },
    ],

    documents: [
      "Aadhaar Card",
      "Mobile Number",
      "Bank Account Details",
      "Trade-related Documents",
    ],

    benefits:
      "Training, toolkit support and credit-related assistance for eligible traditional artisans and craftspeople.",

    officialLink: "https://pmvishwakarma.gov.in/",

    active: true,
    applicants: 1650,
  },
];

const seedSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Scheme.deleteMany({});

    await Scheme.insertMany(schemes);

    console.log("5 structured schemes added successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding failed:", error.message);
  }
};

seedSchemes();