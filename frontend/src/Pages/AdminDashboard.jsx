import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-wrapper">
      <h2 className="admin-header">NUST Admin Portal</h2>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-info-card">
            <h3>Admin Panel</h3>
            <p>Manage students, teachers, and subjects</p>
          </div>
          <div className="admin-sidebar-buttons">
            <button onClick={() => navigate("/")} className="admin-button logout-btn">Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <h3 className="admin-section-title">System Overview</h3>
          <div className="admin-overview">
            <ul>
              <li>🔹 Total Students: 120</li>
              <li>🔹 Total Teachers: 15</li>
              <li>🔹 Subjects Offered: 34</li>
            </ul>
          </div>

          <h3 className="admin-section-title">Administrative Actions</h3>
          <div className="manage-buttons">
            <button className="admin-button" onClick={() => navigate("/manage-students")}>
              Manage Students
            </button>
            <button className="admin-button" onClick={() => navigate("/manage-teachers")}>
              Manage Teachers
            </button>
            <button className="admin-button" onClick={() => navigate("/manage-subjects")}>
              Manage Subjects
            </button>
          </div>
        </main>
      </div>

      <footer className="dashboard-footer">
        &copy; 2025 NUST Admin Panel - All rights reserved.
      </footer>
    </div>
  );
}

export default AdminDashboard;
