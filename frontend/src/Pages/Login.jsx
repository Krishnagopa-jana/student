import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import '../css/Login.css'; // Assuming you added the CSS in a separate file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("JWT Token:", res.data.token);

      const { token, role } = res.data;
      login(token, role);

      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input-field"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input-field"
        />
        <button onClick={handleLogin} className="login-btn">Login</button>
      </div>
    </div>
  );
}

export default Login;
