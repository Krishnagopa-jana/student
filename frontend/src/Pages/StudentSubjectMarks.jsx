import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import '../css/StudentDashboard.css';

function SubjectMarks() {
  const { subjectName } = useParams();
  const { token } = useContext(AuthContext);
  const [marks, setMarks] = useState([]);
  const [averages, setAverages] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch student's marks for this subject
  const fetchMarks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student/my-marks/${subjectName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMarks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch marks:", err);
      setLoading(false);
    }
  };

  // Fetch average for each assessment type
  const fetchAverages = async (types) => {
    try {
      const averagesObj = {};
      await Promise.all(
        types.map(async (type) => {
          const res = await axios.get(
            `http://localhost:5000/api/student/subject-average/${subjectName}/${type}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          averagesObj[type] = res.data.averageMarks;
        })
      );
      setAverages(averagesObj);
    } catch (err) {
      console.error("Failed to fetch averages:", err);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [subjectName, token]);

  useEffect(() => {
    if (marks.length > 0) {
      const types = [...new Set(marks.map((mark) => mark.assessmentType))];
      fetchAverages(types);
    }
  }, [marks, subjectName, token]);

  return (
    <div className="dashboard-container">
      <h2>Marks for {subjectName}</h2>

      {loading ? (
        <p>Loading marks...</p>
      ) : marks.length === 0 ? (
        <p>No marks found for this subject.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Assessment Type</th>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
              <th>Average (All Students)</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m._id}>
                <td>{m.assessmentType}</td>
                <td>{m.marksObtained}</td>
                <td>{m.totalMarks}</td>
                <td>
                  {averages[m.assessmentType] !== undefined
                    ? averages[m.assessmentType].toFixed(2)
                    : "Loading..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubjectMarks;
