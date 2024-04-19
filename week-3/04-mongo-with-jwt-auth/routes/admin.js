const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const admin = new Admin({
    username: username,
    password: password,
  });
  const newAdmin = await admin.save();
  res
    .status(201)
    .json({
      message: "Admin created successfully",
      username: newAdmin.username,
    });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const fetchedAdmin = await Admin.findOne({ username: req.body.username });
  if (fetchedAdmin) {
    if (fetchedAdmin.password === req.body.password) {
      const token = jwt.sign(
        { username: fetchedAdmin.username },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).send(`<h1>Authentication failed. Server says:</h1>`);
    }
  } else {
    res.status(401).send(`<h1>Authentication failed. Server says:</h1>`);
  }
});

router.post("/courses", adminMiddleware,async (req, res) => {
  // Implement course creation logic
  const course = new Course(req.body)
  const newCourse = await course.save()
  res.status(201).json({ message: 'Course created successfully', courseId: newCourse.id })
  
});

router.get("/courses", adminMiddleware,async (req, res) => {
  // Implement fetching all courses logic
  const courses =await Course.find()
  res.status(200).json({courses:courses})
});

module.exports = router;