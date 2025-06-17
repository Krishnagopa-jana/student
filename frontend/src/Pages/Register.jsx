import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import '../css/Login.css'

const Register = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    registrationNo: "",
    department: "",
    batch: "",
    subjectname: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("subjectname")) {
      const index = parseInt(name.split("-")[1]);
      const updatedSubjects = [...formData.subjectname];
      updatedSubjects[index] = value;
      setFormData({ ...formData, subjectname: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSubjectField = () => {
    setFormData({
      ...formData,
      subjectname: [...formData.subjectname, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.role !== "student") {
        delete payload.registrationNo;
        delete payload.department;
        delete payload.batch;
        delete payload.subjectname;
      }
      await axios.post(`${BASE_URL}/api/auth/register`, payload);
      alert("Registration successful!");
      Navigate("/");
    } catch (err) {
      alert(
        "Registration failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="login-background">
      <div className="overlay">
        <div className="login-container">
          <div className="login-box">
            <h2>Register Page</h2>
            <form onSubmit={handleSubmit}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />

              <input
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />

              <input
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />

              {formData.role === "student" && (
                <>
                  <input
                    name="registrationNo"
                    placeholder="Registration No"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                  <input
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                  <input
                    name="batch"
                    placeholder="Batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                  {formData.subjectname.map((subject, index) => (
                    <input
                      key={index}
                      name={`subjectname-${index}`}
                      placeholder={`Subject ${index + 1}`}
                      value={subject}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addSubjectField}
                    className="login-btn"
                    style={{ marginTop: "10px", background: "#4f46e5" }}
                  >
                    + Add Subject
                  </button>
                </>
              )}

              <button type="submit" className="login-btn">
                Register
              </button>

              <p style={{ marginTop: "15px", color: "#fff" }}>
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{ color: "#64b5f6", textDecoration: "underline" }}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
