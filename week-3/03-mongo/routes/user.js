const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const savedUser = await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.status(200).json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const userDetails = await User.findOne({
    username: req.headers.username,
    password: req.headers.password,
  });
  const updatedUser = await User.findOneAndUpdate(
    { username: req.headers.username, password: req.headers.password },
    {
      purchasedCourses: [...userDetails.purchasedCourses, req.params.courseId],
    },
    { returnDocument: "after" }
  );
  res.json({ purchasedCourses: updatedUser.purchasedCourses });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const userDetails = await User.findOne({
    username: req.headers.username,
    password: req.headers.password,
  })
    .populate("purchasedCourses")
    .exec();

  res.json({purchasedCourses:userDetails.purchasedCourses})
});

module.exports = router;