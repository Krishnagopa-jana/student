import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div>
      <h3>Manage Students</h3>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s._id}>{s.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageStudents;
