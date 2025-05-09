import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageTeachers() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Teachers</h2>
      
      <button onClick={() => navigate('/add-teacher')} style={{ marginRight: '10px' }}>
        Add Teacher
      </button>
      <button onClick={() => navigate('/teacher-list')}>
        Teacher List
      </button>
    </div>
  );
}
