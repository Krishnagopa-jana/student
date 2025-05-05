const express = require("express");
const router = express.Router();
const { verifyToken, allowRoles } = require("../Middleware/authMiddleware");
const Student = require('../models/student');
const Marks = require('../models/Marks');

// Route to fetch logged-in student's data
router.get("/me", verifyToken, allowRoles("student"), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }); 
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get subjects directly from student's `subjectname` array
router.get('/my-subjects', verifyToken, allowRoles('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({ subjects: student.subjectname });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get marks for a specific subject
router.get('/my-marks/:subjectName', verifyToken, allowRoles('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const marks = await Marks.find({
      studentId: student._id,
      subjectName: req.params.subjectName
    });

    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
