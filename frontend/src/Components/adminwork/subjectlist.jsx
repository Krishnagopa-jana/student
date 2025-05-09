import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects/all-subjects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data.subjects);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, [token]);

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await axios.delete(`http://localhost:5000/api/subjects/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(subjects.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete subject.");
      }
    }
  };

  return (
    <div>
      <h2>SUBJECT LIST</h2>
      <div>
       <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Department</th>
              <th>Teacher Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.code}</td>
                <td>{s.department}</td>
                <td>{s.teacheremail}</td>
                <td>
                  <button onClick={() => handleRemove(s._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubjectList;
