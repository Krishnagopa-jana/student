// Pages/TeacherProfile.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherProfile() {
  const { token } = useContext(AuthContext);
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teacher/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacher(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeacher();
  }, [token]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      
      <h2>Teacher Profile</h2>
      {teacher && (
        <div>
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          
        </div>
      )}
      <button onClick={() => navigate("/teacher-subjects")} style={{ marginTop: "20px" }}>
        View Subjects
      </button>
    </div>
  );
}

export default TeacherProfile;
