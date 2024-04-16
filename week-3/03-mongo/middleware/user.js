const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const query = User.where({ username: req.headers.username });
  const fetchedUser = await query.findOne();
  if (fetchedUser) {
    if (fetchedUser.password === req.headers.password) {
      // next()
      next();
    } else {
      res.status(401).send("authentication failed");
    }
  } else {
    res.status(401).send("authentication failed");
  }
}

module.exports = userMiddleware;