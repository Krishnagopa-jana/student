import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function EnterMarks() {
  const { token } = useContext(AuthContext);
  const { subjectName } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [assessmentType, setAssessmentType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleMarkChange = (studentId, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assessmentType || !totalMarks) {
      setMessage("Please fill out Assessment Type and Total Marks.");
      return;
    }

    try {
      for (const student of students) {
        const obtainedMarks = marks[student._id];
        if (obtainedMarks !== undefined) {
          await axios.post(
            "http://localhost:5000/api/teacher/add-marks",
            {
              studentId: student._id,
              subjectName,
              marksObtained: obtainedMarks,
              totalMarks,
              assessmentType,
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
    <div>
      <button className="back-button-fixed" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
      <div className="page-container">
      

      <div style={{ maxWidth: "1000px", margin: "auto", padding: "30px" }}>
        <Navbar />
        <h2 style={{ color: "var(--primary-color)" }}>
          Enter Marks for {subjectName}
        </h2>

        {students.length === 0 ? (
          <p>No students enrolled.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Assessment Type (e.g. Quiz 1)"
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                required
                style={{
                  padding: "8px",
                  marginRight: "10px",
                  width: "250px",
                  fontSize: "14px",
                }}
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                required
                style={{
                  padding: "8px",
                  width: "150px",
                  fontSize: "14px",
                }}
              />
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Registration Number</th>
                  <th style={thStyle}>Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td style={tdStyle}>{student.name}</td>
                    <td style={tdStyle}>{student.registrationNo}</td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={marks[student._id] || ""}
                        onChange={(e) =>
                          handleMarkChange(student._id, e.target.value)
                        }
                        required
                        style={{
                          padding: "6px",
                          width: "100px",
                          fontSize: "14px",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
  <button
    type="submit"
    style={{
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Submit Marks
  </button>
</div>

          </form>
        )}

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "bold", color: "var(--primary-color)" }}>
            {message}
          </p>
        )}
      </div>
    </div>
      </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default EnterMarks;
