import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9003/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );

      alert("Logout failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </button>
  );
}

export default LogoutButton;