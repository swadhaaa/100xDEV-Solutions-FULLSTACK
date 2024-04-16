const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const admin = new Admin({
        username:username,
        password:password,
    })
    const newAdmin = await admin.save()
    res.status(201).json({message:"Admin created successfully"})
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const newCourse = new Course(req.body)
    const savedNewCourse = await newCourse.save()
    res.status(201).json({ message: 'Course created successfully', courseId: savedNewCourse.id })

});

router.get('/courses', adminMiddleware,async (req, res) => {
    const allCourses = await Course.find()
    res.json({courses:allCourses})
    // Implement fetching all courses logic

});

module.exports = router;