import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeachers();
  }, [token]);

  return (
    <div>
      <h3>Manage Teachers</h3>
      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul>
          {teachers.map((t) => (
            <li key={t._id}>{t.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageTeachers;
