// src/components/admin/ManageSubjects.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, [token]);

  return (
    <div>
      <h3>Manage Subjects</h3>
      {subjects.length > 0 ? (
        <ul>
          {subjects.map((subj) => (
            <li key={subj._id}>
              {subj.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects found.</p>
      )}
    </div>
  );
}

export default ManageSubjects;
