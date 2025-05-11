import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function StudentInfo() {
  const [data, setData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ fixed template literal
        });
        setData(res.data);
        setSubjects(res.data.subjectname);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      {data ? (
        <>
          <p>Name: {data.name}</p>
          <p>Reg No: {data.registrationNo}</p>
          <p>Department: {data.department}</p>
          <p>Batch: {data.batch}</p>
          <p>GPA: {data.gpa}</p>
        </>
      ) : (
        <p>Loading student info...</p>
      )}

      <hr />

      <h3>Your Subjects</h3>
      {subjects.length > 0 ? (
        subjects.map((subj, index) => (
          <button
            key={index}
            onClick={() => navigate(`/studentsubjectmarks/${subj}`)} // ✅ fixed template literal
            className="subject-btn"
          >
            {subj}
          </button>
        ))
      ) : (
        <p>Loading subjects...</p>
      )}
    </div>
  );
}

export default StudentInfo;



