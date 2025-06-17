import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import "../css/teacherdashboard.css";

function TeacherDashboard() {
  const { token } = useContext(AuthContext);
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/teacher/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacher(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeacher();
  }, [token]);

  return (
    <div className="teacher-dashboard-wrapper">
      <header className="teacher-header">
        <h2>Teacher Dashboard</h2>
      </header>

      <div className="teacher-body">
        {/* Sidebar */}
        <aside className="teacher-sidebar">
          <div className="teacher-info-card">
            <h3>Welcome, {teacher ? teacher.name : "Loading..."}</h3>
            {teacher && (
              <div>
                <p>
                  <strong>Email:</strong> {teacher.email}
                </p>
              </div>
            )}
          </div>
          <div className="teacher-sidebar-buttons">
            <button className="teacher-button" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="teacher-main">
          <h3 className="teacher-section-title">Teaching Summary</h3>
          <div className="overview-card">
            <p>
              <strong>Total Subjects Assigned:</strong> 3
            </p>
            <p>
              <strong>Recent Activity:</strong> Marks uploaded for Data Structures
            </p>
            <p>
              <strong>Note:</strong> Please ensure all marks are updated before
              the 20th of this month.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="teacher-subjects center-actions">
            <button
              className="teacher-button"
              onClick={() => navigate("/teacher-subjects")}
            >
              Assigned Subjects
            </button>
            <button
              className="teacher-button"
              onClick={() => navigate("/teacher-subjects")}
            >
              Upload Marks
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2025 Teacher Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

export default TeacherDashboard;
