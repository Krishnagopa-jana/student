const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');
const Teacher = require('../models/Teacher');


const registerSubjectForTeacher = async (req, res) => {
  try {
    const { teacheremail, name, code, department } = req.body;

    // Step 1: Find the existing teacher by email
    const teacher = await Teacher.findOne({ email: teacheremail });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Step 2: Check if subject with the same code already exists for this teacher
    const existingSubject = await Subject.findOne({ code: code, teacheremail: teacher.email });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject with this code already exists for this teacher" });
    }

    // Step 3: Create a new subject linked to the teacher
    const newSubject = new Subject({
      name: name,
      code: code,
      department: department,
      teacheremail: teacher.email
    });

    await newSubject.save();

    // Step 4: Return the success response with the new subject details
    return res.status(201).json({
      message: "Subject registered successfully",
      subject: newSubject
    });

  } catch (err) {
    console.error(err);
    // Handle duplicate subject code error at the MongoDB level
    if (err.code === 11000) {
      return res.status(400).json({ message: "Subject code already exists in the system" });
    }
    // General server error
    res.status(500).json({ message: "Server error" });
  }
};


router.post('/register', registerSubjectForTeacher);
router.get('/all-subjects', async (req, res) => {
  try {
    const subjects = await Subject.find(); // fetch all subjects in db
    res.status(200).json({ subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching all subjects" });
  }
});


// Protected route — Add new subject by teacher

module.exports = router;
