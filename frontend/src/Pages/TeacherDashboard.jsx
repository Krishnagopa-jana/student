import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

function TeacherDashboard() {
  const { token } = useContext(AuthContext);
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const teacherRes = await axios.get("http://localhost:5000/api/teacher/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacher(teacherRes.data);

      const subjectsRes = await axios.get("http://localhost:5000/api/teacher/my-subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(subjectsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [token]);


  // Fetch students when a subject is selected
  const fetchStudents = async (subjectName) => {
    try {
      setSelectedSubject(subjectName);
      const res = await axios.get(
        `http://localhost:5000/api/teacher/students-for-subject/${subjectName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
      setMarks({}); // Reset marks state
    } catch (err) {
      console.error(err);
    }
  };

  // Handle marks input change
  const handleMarkChange = (studentId, field, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  // Submit marks for all students in the selected subject
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
              subjectName: selectedSubject,
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
      <Navbar />
      <h2>Teacher Dashboard</h2>

      {teacher && (
        <div>
          <p>
            <strong>Name:</strong> {teacher.name}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Department:</strong> {teacher.department}
          </p>
        </div>
      )}

      <h3>My Subjects</h3>
      {subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <button onClick={() => fetchStudents(subject.name)} style={{ cursor: "pointer" }}>
                {subject.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedSubject && (
        <div>
          <h3>Students Enrolled in {selectedSubject}</h3>
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
                    style={{ marginRight: "5px" }}
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
              <button type="submit" style={{ marginTop: "10px" }}>
                Submit Marks
              </button>
            </form>
          )}
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default TeacherDashboard;
