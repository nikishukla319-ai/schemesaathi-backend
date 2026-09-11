const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const Scheme = require("./models/Scheme");

const deleteSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Scheme.deleteMany({});

    console.log("All schemes deleted successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Delete failed:", error.message);
  }
};

deleteSchemes();