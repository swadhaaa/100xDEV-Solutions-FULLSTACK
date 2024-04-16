const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const query = Admin.where({ username: req.headers.username });
  const adminUser = await query.findOne();
  if (adminUser) {
    if (adminUser.password === req.headers.password) {
      // next()
      next()
    } else {
      res.status(401).send("authentication failed");
    }
  } else {
    res.status(401).send("authentication failed");
  }
}

module.exports = adminMiddleware;