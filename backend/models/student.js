const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  registrationNo: String,
  department: String,
  batch: String,
  email: String,
  gpa: Number,
  subjectname: [{ type: String }]
});

module.exports = mongoose.model("Student", studentSchema);
