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


// GET average marks for a subject and assessment type
router.get("/subject-average/:subjectName/:assessmentType", async (req, res) => {
  try {
    const { subjectName, assessmentType } = req.params;

    const result = await Marks.aggregate([
      {
        $match: {
          subjectName,
          assessmentType
        }
      },
      {
        $group: {
          _id: null,
          averageMarks: { $avg: "$marksObtained" },
          totalStudents: { $sum: 1 } // counts how many marks records exist (i.e. how many students)
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No marks found for this subject and assessment type." });
    }

    res.json(result[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating average" });
  }
});




module.exports = router;
