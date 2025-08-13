// routes/auth.js (or wherever your /me route is)
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

// Get logged-in user's info
router.get("/me", auth, async (req, res) => {
  try {
    // req.userId is set by middleware/auth.js
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching /me:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

