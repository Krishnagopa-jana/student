const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/student');
const Admin = require('../models/admin');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject'); // <-- Import Subject model
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post("/register", async (req, res) => {
  try {
    const users = Array.isArray(req.body) ? req.body : [req.body]; // always treat as an array

    for (const userData of users) {
      const { name, email, password, role, registrationNo, department, batch, gpa, subjectname } = userData;

      const newUser = new User({ name, email, password, role });
      await newUser.save();

      if (role === "student") {
        const finalSubjects = Array.isArray(subjectname) ? subjectname : [];

        const newStudent = new Student({
          userId: newUser._id,
          name,
          registrationNo,
          department,
          batch,
          email,
          gpa,
          subjectname: finalSubjects
        });
        await newStudent.save();
      }

      if (role === "teacher") {
        const newTeacher = new Teacher({
          userId: newUser._id,
          name,
          email
        });
        await newTeacher.save();
      }

      if (role === "admin") {
        const newAdmin = new Admin({
          userId: newUser._id,
          name,
          email
        });
        await newAdmin.save();
      }
    }

    res.status(201).json({ message: "User(s) registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Student
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Delete user too
    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: 'Student removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Teacher
router.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    await User.findByIdAndDelete(teacher.userId);
    await Teacher.findByIdAndDelete(req.params.id);

    res.json({ message: 'Teacher removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
