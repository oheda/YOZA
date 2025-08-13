const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from Authorization header (format: "Bearer <token>")
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(400).json({ message: "Invalid token." });
  }
};
