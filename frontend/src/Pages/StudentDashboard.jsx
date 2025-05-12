import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#3742fa", "#FF8042"];

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch student profile
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(res.data);
        setSubjects(res.data.subjectname || []);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      }
    };
    fetchStudent();
  }, [token]);

  // Fetch student's marks
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marks/my-marks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Convert to percentage for visualization
        const processed = res.data.map(mark => ({
          subject: mark.subjectName,
          assessment: mark.assessmentType.trim(),
          percentage: ((mark.marksObtained / mark.totalMarks) * 100).toFixed(2),
        }));
        setMarksData(processed);
      } catch (err) {
        console.error("Failed to fetch marks:", err);
      }
    };
    fetchMarks();
  }, [token]);

  const cgpaData = [
    { name: "Achieved", value: studentData ? parseFloat(studentData.gpa) : 0 },
    { name: "Remaining", value: studentData ? 4.0 - parseFloat(studentData.gpa) : 4.0 }
  ];

  return (
    <div className="student-dashboard-wrapper">
      <h2>NUST Student Portal</h2>

      <div className="main-dashboard-body">
        {/* Sidebar */}
        <aside className="sidebar">
          {studentData ? (
            <div className="info-card">
              <h3>{studentData.name}</h3>
              <p><strong>Reg No:</strong> {studentData.registrationNo}</p>
              <p><strong>Dept:</strong> {studentData.department}</p>
              <p><strong>Batch:</strong> {studentData.batch}</p>
              <p><strong>GPA:</strong> {studentData.gpa}</p>
            </div>
          ) : (
            <p className="loading">Loading...</p>
          )}
          <div className="sidebar-buttons">
            <button onClick={() => navigate("/studentdashboard/visualization")}>Dashboard</button>
            <button onClick={() => navigate("/")}>Logout</button>
          </div>
        </aside>

        {/* Main */}
        <main className="dashboard-main">
          <h3>Your Subjects</h3>
          <div className="subject-buttons">
            {subjects.length > 0 ? (
              subjects.map((subj, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/studentsubjectmarks/${subj}`)}
                  className="subject-btn"
                >
                  {subj}
                </button>
              ))
            ) : (
              <p className="loading">Loading subjects...</p>
            )}
          </div>

          <div className="performance-graph">
            <h4>CGPA Overview</h4>
            <div className="graph-placeholder">
              {studentData ? (
                <PieChart width={250} height={250}>
                  <Pie
                    data={cgpaData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
                  >
                    {cgpaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <p>Loading CGPA...</p>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="right-panel">
          <h4>Today's Timetable</h4>
          <ul className="timetable">
            <li>9:00 AM - 10:50 AM (Physics)</li>
            <li>11:00 AM - 12:50 PM (Algorithms)</li>
            <li>1:00 PM - 2:00 PM (Break)</li>
            <li>2:00 PM - 2:50 PM (Artificial Intelligence)</li>
          </ul>
        </aside>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        &copy; 2025 NUST - All rights reserved.
      </footer>
    </div>
  );
}

export default StudentDashboard;
