const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Partner = require("./models/Partner");

const partners = [
  {
    name: "State Bank of India",
    type: "Bank",
    category: "Business",
    state: "All India",
    interestRate: 7.5,
    maxLoanAmount: 1000000,
    processingTime: "7-15 days",
    description: "Business and MSME financing support",
    contact: "1800-11-2211",
  },
  {
    name: "Punjab National Bank",
    type: "Bank",
    category: "Business",
    state: "All India",
    interestRate: 8,
    maxLoanAmount: 1000000,
    processingTime: "7-15 days",
    description: "Loans for eligible small businesses and entrepreneurs",
    contact: "1800-180-2222",
  },
  {
    name: "Bank of Baroda",
    type: "Bank",
    category: "Agriculture",
    state: "All India",
    interestRate: 7,
    maxLoanAmount: 1500000,
    processingTime: "10-20 days",
    description: "Agriculture and allied activity financing",
    contact: "1800-258-4455",
  },
  {
    name: "Canara Bank",
    type: "Bank",
    category: "Education",
    state: "All India",
    interestRate: 8.5,
    maxLoanAmount: 2000000,
    processingTime: "7-15 days",
    description: "Education loan assistance",
    contact: "1800-103-0018",
  },
  {
    name: "Union Bank of India",
    type: "Bank",
    category: "Housing",
    state: "All India",
    interestRate: 8,
    maxLoanAmount: 2500000,
    processingTime: "10-20 days",
    description: "Housing finance support",
    contact: "1800-208-2244",
  },
];

const seedPartners = async () => {
  try {
    await connectDB();

    await Partner.deleteMany({});

    await Partner.insertMany(partners);

    console.log(`${partners.length} partners inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Partner seed error:", error);
    process.exit(1);
  }
};

seedPartners();