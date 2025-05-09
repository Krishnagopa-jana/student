import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageSubjects() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Subjects</h2>
      
      <button onClick={() => navigate('/add-subject')} style={{ marginRight: '10px' }}>
        Add Subject
      </button>
      <button onClick={() => navigate('/subject-list')}>
        Subject List
      </button>
    </div>
  );
}
