import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function StudentInfo() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/student/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
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
        <p>Loading...</p>
      )}

      <hr />

      <button onClick={() => navigate('/studentsubject')}>Result</button>
      <button>Exams</button>
    </div>
  );
}

export default StudentInfo;
