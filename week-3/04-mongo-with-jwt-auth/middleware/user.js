const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
        return;
      }
      const fetcheadUser = await User.findOne({ username: decoded.username });
      if (fetcheadUser) {
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

module.exports = userMiddleware;