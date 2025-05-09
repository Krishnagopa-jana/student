import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import '../css/StudentDashboard.css';
import { useNavigate } from "react-router-dom";

function StudentSubjectDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { token } = useContext(AuthContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data.subjectname); // ✅ set subjects from fetched data
      } catch (err) {
        console.error("Failed to load student data:", err);
      }
    };

    fetchStudentData();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h3>Your Subjects</h3>
      {subjects.length > 0 ? (
        subjects.map((subj, index) => (
          <button key={index} onClick={() => navigate(`/studentsubjectmarks/${subj}`)} className="subject-btn">
            {subj}
          </button>
        ))
      ) : (
        <p>Loading subjects...</p>
      )}
    </div>
  );
}

export default StudentSubjectDashboard;
