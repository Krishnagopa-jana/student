import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import axios from 'axios';

export default function StudentList() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const removeStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/students/${id}`);
      alert('Student Removed');
      fetchStudents();
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Failed to remove student');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* ✅ Go Back Button */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/manage-students')}
      >
        ← Go Back
      </button>

      <h2 className="admin-section-title">Existing Students</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Reg No</th><th>Dept</th>
            <th>Batch</th><th>GPA</th><th>Subjects</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.registrationNo}</td>
              <td>{s.department}</td>
              <td>{s.batch}</td>
              <td>{s.gpa}</td>
              <td>{s.subjectname?.join(', ')}</td>
              <td>
                <button onClick={() => removeStudent(s._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
