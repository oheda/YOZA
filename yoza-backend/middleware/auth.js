const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(400).json({ message: "Invalid token payload. User ID missing." });
    }

    req.user = decoded;     // full payload
    req.userId = decoded.id; // convenience

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
