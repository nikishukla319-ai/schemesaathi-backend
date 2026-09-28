const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const financialRoutes = require("./routes/financialRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());

// ==================== ROUTES ====================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/financial", financialRoutes);
app.use("/api/partners", partnerRoutes);

// ==================== AUTH TEST ====================
app.get("/api/auth/test", (req, res) => {
  res.json({
    message: "Auth route is working!",
  });
});

// ==================== ROOT ====================
app.get("/", (req, res) => {
  res.json({
    message: "SchemeSaathi Backend is running!",
  });
});

// ==================== SERVER ====================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer()