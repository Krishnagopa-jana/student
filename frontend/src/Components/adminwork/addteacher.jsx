import React, { useState } from 'react';
import axios from 'axios';

export default function AddTeacher() {
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
    <div style={{ padding: '20px' }}>
      <h2>Add Teacher</h2>
      <form onSubmit={addTeacher}>
        {["name", "email", "password"].map(field => (
          <input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '5px' }}
          />
        ))}
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
}
