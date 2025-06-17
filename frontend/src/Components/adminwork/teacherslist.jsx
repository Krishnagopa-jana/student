import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import axios from 'axios';
import BASE_URL from '../../Config';

export default function TeacherList() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/teachers`);
        setTeachers(res.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const removeTeacher = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/auth/teachers/${id}`);
      alert('Teacher Removed');
      setTeachers(teachers.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error removing teacher:', error);
      alert('Failed to remove teacher');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* ✅ Go Back Button */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/manage-teachers')}
      >
        ← Go Back
      </button>

      <h2>Teacher List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Action</th></tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t._id}>
              <td>{t.name}</td><td>{t.email}</td>
              <td><button onClick={() => removeTeacher(t._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
