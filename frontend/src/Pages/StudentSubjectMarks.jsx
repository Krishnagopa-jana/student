import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import '../css/StudentDashboard.css';

function SubjectMarks() {
  const { subjectName } = useParams(); // get subject from URL
  const { token } = useContext(AuthContext);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/student/my-marks/${subjectName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMarks(res.data);
      } catch (err) {
        console.error("Failed to fetch marks:", err);
      }
    };

    fetchMarks();
  }, [subjectName, token]);

  return (
    <div className="dashboard-container">
      <h2>Marks for {subjectName}</h2>
      {marks.length === 0 ? (
        <p>No marks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m._id}>
                <td>{m.marksObtained}</td>
                <td>{m.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubjectMarks;
