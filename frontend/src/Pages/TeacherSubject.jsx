import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import "../css/teacherdashboard.css"; // Uses your provided CSS

function TeacherSubjects() {
  const { token } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/teacher/my-subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    };

    fetchSubjects();
  }, [token]);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Go Back Button */}
      <button className="back-button-fixed" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {/* Subject Card Centered in Wrapper */}
      <div className="teacher-dashboard-wrapper" style={{ alignItems: "center" }}>
        <div className="subject-card">
          <h2 className="teacher-section-title" style={{ textAlign: "center" }}>My Subjects</h2>

          {subjects.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>No subjects found.</p>
          ) : (
            <ul className="subject-list">
              {subjects.map((subject) => (
                <li key={subject._id} className="subject-item">
                  <button
                    className="teacher-button"
                    onClick={() => navigate(`/enter-marks/${subject.name}`)}
                  >
                    {subject.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherSubjects;
