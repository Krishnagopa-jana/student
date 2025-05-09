// Pages/TeacherSubjects.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function TeacherSubjects() {
  const { token } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teacher/my-subjects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubjects();
  }, [token]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      
      <h2>My Subjects</h2>
      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <button onClick={() => navigate(`/enter-marks/${subject.name}`)}>
                {subject.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherSubjects;
