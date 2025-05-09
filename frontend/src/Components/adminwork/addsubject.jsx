import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function AddSubject() {
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    department: "",
    teacheremail: "",
  });
  const { token } = useContext(AuthContext);

  // Get teacher's email from token
  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const teacherEmail = decodedToken.email;
      setNewSubject((prev) => ({ ...prev, teacheremail: teacherEmail }));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/subjects/register", newSubject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      setNewSubject({ name: "", code: "", department: "", teacheremail: newSubject.teacheremail });
    } catch (err) {
      alert(err.response?.data?.message || "Error registering subject");
    }
  };

  return (
    <div>
      <h3>Add Subject</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={newSubject.name} onChange={handleChange} placeholder="Subject Name" required />
        <input name="code" value={newSubject.code} onChange={handleChange} placeholder="Subject Code" required />
        <input name="department" value={newSubject.department} onChange={handleChange} placeholder="Department" required />
        <input name="teacheremail" value={newSubject.teacheremail} readOnly />
        <button type="submit">Register Subject</button>
      </form>
    </div>
  );
}

export default AddSubject;
