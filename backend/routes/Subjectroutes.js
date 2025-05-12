const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { verifyToken, allowRoles } = require('../Middleware/authMiddleware');
const Teacher = require('../models/Teacher');


const registerSubjectForTeacher = async (req, res) => {
  try {
    // Step 1: Check if the request body is an array or a single object
    const subjects = Array.isArray(req.body) ? req.body : [req.body];

    // Step 2: Loop through all subjects (single or multiple)
    const createdSubjects = [];

    for (const subjectData of subjects) {
      const { teacheremail, name, code, department } = subjectData;

      // Step 3: Find the existing teacher by email
      const teacher = await Teacher.findOne({ email: teacheremail });
      if (!teacher) {
        return res.status(404).json({ message: `Teacher with email ${teacheremail} not found` });
      }

      // Step 4: Check if subject with the same code already exists for this teacher
      const existingSubject = await Subject.findOne({ code: code, teacheremail: teacher.email });
      if (existingSubject) {
        return res.status(400).json({ message: `Subject with code ${code} already exists for this teacher` });
      }

      // Step 5: Create a new subject linked to the teacher
      const newSubject = new Subject({
        name: name,
        code: code,
        department: department,
        teacheremail: teacher.email
      });

      await newSubject.save();
      createdSubjects.push(newSubject); // Add the created subject to the array
    }

    // Step 6: Return the success response with the created subjects
    return res.status(201).json({
      message: "Subject(s) registered successfully",
      subjects: createdSubjects
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

router.get('/my-subjects', verifyToken, async (req, res) => {
  try {
    const teacheremail = req.user.email;
    const subjects = await Subject.find({ teacheremail });
    res.status(200).json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching teacher's subjects" });
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error while deleting subject' });
  }
});


// Protected route — Add new subject by teacher

module.exports = router;
