import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ background: "#eee", padding: "10px" }}>
      <span>Role: {role} | </span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
