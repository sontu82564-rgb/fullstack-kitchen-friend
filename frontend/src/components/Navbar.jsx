import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

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


      if (response.data.success) {

        alert("Logout successful");

        navigate("/login");

      }

    } catch (error) {

      console.error(
        "LOGOUT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Logout failed"
      );

    }
  };


  return (

    <nav className="navbar">

      <div className="logo">
        🛒 Kitchen Friend
      </div>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/profile">
          Profile
        </Link>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      <style>{`

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 18px 50px;

          background: #2e7d32;
          color: white;
        }


        .logo {
          font-size: 26px;
          font-weight: bold;
        }


        .nav-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }


        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }


        .nav-links a:hover {
          opacity: 0.8;
        }


        .logout-btn {
          border: none;

          padding: 10px 20px;

          border-radius: 25px;

          background: #ff5a1f;
          color: white;

          font-weight: bold;

          cursor: pointer;

          transition: 0.3s;
        }


        .logout-btn:hover {
          background: #e64a19;
          transform: translateY(-2px);
        }


        @media (max-width: 700px) {

          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }

        }

      `}</style>

    </nav>

  );
}

export default Navbar;