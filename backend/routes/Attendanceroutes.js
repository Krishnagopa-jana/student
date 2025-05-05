const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');

router.post('/add', verifyToken, allowRoles('teacher'), async (req, res) => {
  const { studentId, subject, date, status } = req.body;

  try {
    const newAttendance = new Attendance({ student: studentId, subject, date, status });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
