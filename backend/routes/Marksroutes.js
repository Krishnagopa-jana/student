const express = require('express');
const router = express.Router();
const Marks = require('../models/Marks');
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');


router.get('/my-marks', verifyToken, allowRoles('student'), async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.user.id });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
