import React, { useState } from 'react';
import axios from 'axios';

export default function AddStudent() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', registrationNo: '',
    department: '', batch: '', gpa: '', subject: ''
  });

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        registrationNo: form.registrationNo,
        department: form.department,
        batch: form.batch,
        gpa: form.gpa,
        role: 'student',
        subjectname: form.subject.split(',').map(s => s.trim())  // Split subjects into array
      });
      alert('Student Registered');
      setForm({
        name: '', email: '', password: '', registrationNo: '',
        department: '', batch: '', gpa: '', subject: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to register student');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Add Student</h3>
      <form onSubmit={addStudent}>
        {["name", "email", "password", "registrationNo", "department", "batch", "gpa"].map(field => (
          <input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '5px' }}
          />
        ))}
        <input
          placeholder="Subjects (comma separated)"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '5px' }}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
