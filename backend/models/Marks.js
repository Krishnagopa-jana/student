const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  subjectName: { type: String, required: true },
  marksObtained: Number,
  totalMarks: Number,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

module.exports = mongoose.model("Marks", marksSchema);
