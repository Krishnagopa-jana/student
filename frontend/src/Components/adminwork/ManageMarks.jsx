// src/components/admin/ManageMarks.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function ManageMarks() {
  const [marks, setMarks] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMarks(res.data);
      } catch (err) {
        console.error("Error fetching marks:", err);
      }
    };

    fetchMarks();
  }, [token]);

  return (
    <div>
      <h3>Manage Marks</h3>
      {marks.length > 0 ? (
        <ul>
          {marks.map((m) => (
            <li key={m._id}>
              Student: {m.student?.name || m.student} — Subject: {m.subject?.name || m.subject} — Score: {m.score}
            </li>
          ))}
        </ul>
      ) : (
        <p>No marks found.</p>
      )}
    </div>
  );
}

export default ManageMarks;
