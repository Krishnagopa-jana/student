import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageStudents() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Students</h2>
      <button onClick={() => navigate('/add-student')} style={{ marginRight: '10px' }}>
        Add Student
      </button>
      <button onClick={() => navigate('/student-list')}>
        Student List
      </button>
    </div>
  );
}
