import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import axios from 'axios';
import BASE_URL from '../../Config';

export default function AddStudent() {
  const navigate = useNavigate(); // ✅ Initialize it

  const [form, setForm] = useState({
    name: '', email: '', password: '', registrationNo: '',
    department: '', batch: '', gpa: '', subject: ''
  });

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        registrationNo: form.registrationNo,
        department: form.department,
        batch: form.batch,
        gpa: form.gpa,
        role: 'student',
        subjectname: form.subject.split(',').map(s => s.trim())
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
    <div style={{ position: 'relative' }}>
      {/* ✅ Fixed: Go Back Button works now */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/manage-students')}
      >
        ← Go Back
      </button>

      <div className="admin-main">
        <h2 className="admin-section-title">Add New Student</h2>
        <form onSubmit={addStudent} className="student-form">
          {[
            { label: 'Full Name', field: 'name' },
            { label: 'Email', field: 'email' },
            { label: 'Password', field: 'password', type: 'password' },
            { label: 'Registration No', field: 'registrationNo' },
            { label: 'Department', field: 'department' },
            { label: 'Batch', field: 'batch' },
            { label: 'GPA', field: 'gpa' },
          ].map(({ label, field, type = 'text' }) => (
            <div className="form-group" key={field}>
              <label>{label}</label>
              <input
                type={type}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="form-group">
            <label>Subjects (comma separated)</label>
            <input
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="admin-button">Register Student</button>
        </form>
      </div>
    </div>
  );
}
