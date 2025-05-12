const express = require('express');
const router = express.Router();
const Marks = require('../models/Marks');
const axios = require('axios');
const Student = require('../models/student'); // ← Add this line
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');

// Route: Get marks for a student
router.get('/my-marks', verifyToken, allowRoles('student'), async (req, res) => {
  try {
    // Step 1: Find student based on logged-in user's ID
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Step 2: Fetch marks for this student
    const marks = await Marks.find({ studentId: student._id });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get average marks per subject and assessment type (for teacher dashboard)
router.get('/assessment-summary', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;

    const summary = await Marks.aggregate([
      { $match: { teacherId } },
      {
        $group: {
          _id: {
            subjectName: "$subjectName",
            assessmentType: "$assessmentType"
          },
          totalObtained: { $sum: "$marksObtained" },
          totalMax: { $sum: "$totalMarks" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.subjectName",
          assessments: {
            $push: {
              type: "$_id.assessmentType",
              obtained: "$totalObtained",
              total: "$totalMax"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          subjectName: "$_id",
          assessments: 1
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error("Error fetching assessment summary:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});


// Route: Add new marks and push to Power BI streaming dataset
router.post('/add', verifyToken, allowRoles('teacher'), async (req, res) => {
  try {
    const { studentId, subjectName, assessmentType, marksObtained, totalMarks } = req.body;

    // Validate input
    if (!studentId || !subjectName || !assessmentType || marksObtained == null || totalMarks == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Calculate percentage
    const percentageScore = (marksObtained / totalMarks) * 100;

    // Save to MongoDB
    const newMark = new Marks({
      studentId: req.body.studentId,
      subjectName,
      assessmentType,
      marksObtained,
      totalMarks,
      teacherId: req.user.id
    });

    const savedMark = await newMark.save();

    // Prepare data for Power BI
    const powerBiPayload = [
      {
        studentId: String(studentId),
        subjectName,
        assessmentType,
        marksObtained: Number(marksObtained),
        totalMarks: Number(totalMarks),
        teacherId: String(req.user.id),
        percentageScore: Number(percentageScore.toFixed(2)) // Round to 2 decimals
      }
    ];

    // Push to Power BI streaming dataset
    const powerBiUrl = process.env.POWERBI_STREAM_URL;
    await axios.post(powerBiUrl, powerBiPayload);

    res.status(201).json(savedMark);
  } catch (error) {
    console.error('Error adding mark or pushing to Power BI:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
