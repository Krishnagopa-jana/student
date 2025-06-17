import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import
import { AuthContext } from "../../Context/AuthContext";
import BASE_URL from "../../Config";

export default function AddSubject() {
  const navigate = useNavigate(); // ✅ Initialize
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    department: "",
    teacheremail: "",
  });

  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/subjects/register`,
        newSubject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      setNewSubject({
        name: "",
        code: "",
        department: "",
        teacheremail: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error registering subject");
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* ✅ Go Back Button */}
      <button
        className="back-button-fixed"
        onClick={() => navigate('/manage-subjects')}
      >
        ← Go Back
      </button>

      <div className="admin-main">
        <h2 className="admin-section-title">Add Subject</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label>Subject Name</label>
            <input
              name="name"
              value={newSubject.name}
              onChange={handleChange}
              placeholder="Enter Subject Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Subject Code</label>
            <input
              name="code"
              value={newSubject.code}
              onChange={handleChange}
              placeholder="Enter Subject Code"
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              name="department"
              value={newSubject.department}
              onChange={handleChange}
              placeholder="Enter Department"
              required
            />
          </div>
          <div className="form-group">
            <label>Teacher Email</label>
            <input
              name="teacheremail"
              value={newSubject.teacheremail}
              onChange={handleChange}
              placeholder="Enter Teacher's Email"
              required
            />
          </div>
          <button type="submit" className="admin-button">
            Register Subject
          </button>
        </form>
      </div>
    </div>
  );
}
