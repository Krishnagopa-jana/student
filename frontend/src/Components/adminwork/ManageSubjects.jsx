import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageSubjects() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      {/* Go Back Button outside admin-main */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/admin')}
      >
        ← Go Back
      </button>

    <div className="admin-main">
      <h2 className="admin-section-title">Manage Subjects</h2>
      <div className="manage-buttons">
        <button className="admin-button" onClick={() => navigate('/add-subject')}>
          Add Subject
        </button>
        <button className="admin-button" onClick={() => navigate('/subject-list')}>
          Subject List
        </button>
      </div>
    </div>
  </div>
  
  );
}
