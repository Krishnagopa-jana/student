import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminDashboard.css'; // Replace with your actual CSS file if needed

export default function ManageStudents() {
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
        <h2 className="admin-section-title">Manage Students</h2>

        <div className="admin-overview">
          <ul>
            <li>📚 Add or remove student records</li>
            <li>📋 View and manage student data</li>
            <li>🔍 Search or filter student info</li>
          </ul>
        </div>

        <div className="manage-buttons">
          <button onClick={() => navigate('/add-student')} className="admin-button">
            ➕ Add New Student
          </button>
          <button onClick={() => navigate('/student-list')} className="admin-button">
            📄 View Student List
          </button>
        </div>
      </div>
    </div>
  );
}
