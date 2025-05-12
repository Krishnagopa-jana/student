import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import axios from 'axios';

export default function AddTeacher() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...form,
        role: 'teacher',
      });
      alert('Teacher Registered');
      setForm({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('Failed to register teacher');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* ✅ Go Back Button */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/manage-teachers')}
      >
        ← Go Back
      </button>

      <div className="admin-main">
        <h2 className="admin-section-title">Add Teacher</h2>
        <form onSubmit={addTeacher} className="student-form">
          {['name', 'email', 'password'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <button type="submit" className="admin-button">Register Teacher</button>
        </form>
      </div>
    </div>
  );
}
