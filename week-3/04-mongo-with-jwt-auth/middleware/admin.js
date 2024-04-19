const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
require("dotenv").config();

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
        return;
      }
      const fetcheadAdmin = await Admin.findOne({ username: decoded.username });
      if (fetcheadAdmin) {
        req.username = decoded.username;
        next();
      } else {
        res.status(404).json({ message: "authentiction failed" });
      }
    });
  } else {
    res.status(404).json({ message: "token not found" });
  }
}

module.exports = adminMiddleware;