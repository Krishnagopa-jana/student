import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/teachers');
        setTeachers(res.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const removeTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/teachers/${id}`);
      alert('Teacher Removed');
      setTeachers(teachers.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error removing teacher:', error);
      alert('Failed to remove teacher');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
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
