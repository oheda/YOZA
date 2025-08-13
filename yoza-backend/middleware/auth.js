const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from Authorization header or cookie
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;       // full payload from token
    req.userId = decoded.id;  // convenience: directly store user ID

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
