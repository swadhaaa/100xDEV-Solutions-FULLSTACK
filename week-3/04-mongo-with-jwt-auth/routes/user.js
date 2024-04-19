const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({
    username: username,
    password: password,
  });
  const newUser = await user.save();
  res.status(201).json({
    message: "User created successfully",
    username: newUser.username,
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const fetchedUser = await User.findOne({ username: req.body.username });
  if (fetchedUser) {
    if (fetchedUser.password === req.body.password) {
      const token = jwt.sign(
        { username: fetchedUser.username },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).send('<h1>Authentication failed. Server says:</h1>');
    }
  } else {
    res.status(401).send('<h1>Authentication failed. Server says: </h1>');
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.status(200).json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const userDetails = await User.findOne({
    username: req.username
  });
  const updatedUser = await User.findOneAndUpdate(
    { username: req.username },
    {
      purchasedCourses: [...userDetails.purchasedCourses, req.params.courseId],
    },
    { returnDocument: "after" }
  );
  res.json({ purchasedCourses: updatedUser.purchasedCourses });
});

router.get("/purchasedCourses", userMiddleware,async (req, res) => {
  // Implement fetching purchased courses logic
  const userDetails = await User.findOne({
    username: req.username
  })
    .populate("purchasedCourses")
    .exec();

  res.json({purchasedCourses:userDetails.purchasedCourses})
});

module.exports = router;