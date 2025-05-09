// Pages/EnterMarks.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";


function EnterMarks() {
  const { token } = useContext(AuthContext);
  const { subjectName } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/teacher/students-for-subject/${subjectName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [token, subjectName]);

  const handleMarkChange = (studentId, field, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const student of students) {
        const studentMarks = marks[student._id];
        if (studentMarks) {
          await axios.post(
            "http://localhost:5000/api/teacher/add-marks",
            {
              studentId: student._id,
              subjectName,
              marksObtained: studentMarks.marksObtained,
              totalMarks: studentMarks.totalMarks,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      }
      setMessage("Marks submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting marks.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
    
      <h2>Enter Marks for {subjectName}</h2>
      {students.length === 0 ? (
        <p>No students enrolled.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {students.map((student) => (
            <div key={student._id} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{student.name}</strong> ({student.registrationNo})
              </p>
              <input
                type="number"
                placeholder="Marks Obtained"
                value={marks[student._id]?.marksObtained || ""}
                onChange={(e) =>
                  handleMarkChange(student._id, "marksObtained", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={marks[student._id]?.totalMarks || ""}
                onChange={(e) =>
                  handleMarkChange(student._id, "totalMarks", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="submit">Submit Marks</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default EnterMarks;
