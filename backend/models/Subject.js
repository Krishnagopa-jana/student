const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },           // Added: Which batch this subject belongs to
  teacheremail: { type: Schema.Types.String, ref: 'Teacher', required: true } // Added: Who teaches this subject
});

module.exports = mongoose.model('Subject', subjectSchema);
