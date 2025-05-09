import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import '../css/StudentDashboard.css';
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
// import StudentSubject from "./StudentSubject"; ❌ Not needed here anymore

function StudentInfo() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ ADD THIS

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/student/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };

    fetchData();
  }, [token]);

  return (
    <div className="dashboard-container">
      {data ? (
        <>
          <p className="dashboard-container">Name: {data.name}</p>
          <p className="student-info">Reg No: {data.registrationNo}</p>
          <p className="student-info">Department: {data.department}</p>
          <p className="student-info">Batch: {data.batch}</p>
          <p className="student-info">GPA: {data.gpa}</p>
        </>
      ) : (
        <p className="loading-text">Loading...</p>
      )}

      <hr />

      {/* ✅ Navigate on button click */}
      <button onClick={() => navigate('/studentsubject')} className="action-btn">Result</button>
      <button className="action-btn">Exams</button>
    </div>
  );
}

export default StudentInfo;
