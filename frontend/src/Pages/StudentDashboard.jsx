import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function StudentDashboard() {
  const [data, setData] = useState(null);
  const [showSubjects, setShowSubjects] = useState(false);
  const [marks, setMarks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/student/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };

    fetchData();
  }, [token]);

  const handleResultClick = () => {
    setShowSubjects(true);
    setMarks([]);
    setSelectedSubject(null);
  };

  const fetchMarks = async (subjectName) => {
    setSelectedSubject(subjectName);
    const res = await axios.get(`http://localhost:5000/api/student/my-marks/${subjectName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMarks(res.data);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      {/* Show student info */}
      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Reg No: {data.registrationNo}</p>
          <p>Department: {data.department}</p>
          <p>Batch: {data.batch}</p>
          <p>GPA: {data.gpa}</p>
        </div>
      ) : (
        "Loading..."
      )}

      <hr />

      {/* Result and Exams buttons */}
      <button onClick={handleResultClick}>Result</button>
      <button>Exams</button>

      {/* Subjects list */}
      {showSubjects && data && data.subjectname && (
        <div>
          <h3>Your Subjects</h3>
          {data.subjectname.map((subj, index) => (
            <button key={index} onClick={() => fetchMarks(subj)} style={{ margin: "5px" }}>
              {subj}
            </button>
          ))}
        </div>
      )}

      {/* Marks Table */}
      {selectedSubject && (
        <div>
          <h3>Marks for {selectedSubject}</h3>
          {marks.length === 0 ? (
            <p>No marks found.</p>
          ) : (
            <table border="1">
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
      )}
    </div>
  );
}

export default StudentDashboard;
