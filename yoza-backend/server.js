const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// ===== CORS CONFIGURATION =====
// Change this to your actual frontend URL when deployed
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: "https://oheda.github.io",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);

// ===== MONGODB CONNECTION =====
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("✅ MongoDB connected");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop app if DB fails
  });

// ===== HEALTH CHECK ROUTE =====
app.get("/", (req, res) => {
  res.send("YOZA Backend is running 🚀");
});
