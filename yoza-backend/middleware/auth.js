// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from either Authorization header (Bearer <token>) or cookies
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should contain { id: <userId>, ... } if created correctly in login route
    if (!decoded.id) {
      return res.status(400).json({ message: "Invalid token payload. User ID missing." });
    }

    // Attach user info to request object
    req.user = decoded;     // store entire payload
    req.userId = decoded.id; // store only the ID for quick use

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
