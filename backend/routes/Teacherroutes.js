const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');
const Subject = require('../models/Subject');
const Student = require('../models/student');
const Marks = require('../models/Marks');

// ✅ Get teacher info (protected)
router.get('/me', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({userId: req.user._id});
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all subjects taught by logged-in teacher (by teacheremail)
router.get('/my-subjects', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({userId: req.user._id});
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const subjects = await Subject.find({ teacheremail: teacher.email });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get students for a specific subject (match student's department with subject's department)
router.get('/students-for-subject/:subjectName', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const subjectName = req.params.subjectName;

    // Find the subject first
    const subject = await Subject.findOne({ name: subjectName });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    // Find students in same department as subject
    const students = await Student.find({ department: subject.department });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add marks for a student
router.post('/add-marks', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const { studentId, subjectName, marksObtained, totalMarks } = req.body;

    const newMarks = new Marks({
      studentId,
      subjectName,
      marksObtained,
      totalMarks,
      teacherId: req.user.id
    });

    await newMarks.save();
    res.status(201).json({ message: 'Marks added successfully', marks: newMarks });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
