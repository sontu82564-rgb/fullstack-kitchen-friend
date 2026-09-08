
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:9003/user/login",
        {
          email: email.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      if (!response.data.success) {
        alert(response.data.message || "Login failed");
        return;
      }

      // Get user information from backend
      const user = response.data.user;

      console.log("LOGGED IN USER:", user);

      if (!user) {
        alert(
          "Login successful, but user information was not returned by the server."
        );
        return;
      }

      if (!user.role) {
        alert(
          "User role is missing. Please check your backend login controller."
        );
        return;
      }

      /*
        IMPORTANT:

        JWT is NOT stored in localStorage.

        JWT is stored by the backend
        inside an HTTP-only cookie.

        We only store non-sensitive user information
        needed by the frontend for role-based navigation.
      */
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      console.log(
        "USER SAVED:",
        JSON.parse(localStorage.getItem("user"))
      );

      alert("Login successful!");

      // Redirect according to role
      if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else if (user.role === "buyer") {
        navigate("/products");
      } else {
        alert("Unknown user role.");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">
          🛒
        </div>

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your Kitchen Friend account
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

        <Link
          to="/"
          className="home-link"
        >
          ← Back to Home
        </Link>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;

          background:
            linear-gradient(
              135deg,
              #e8f5e9,
              #fff3e0
            );
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          background: white;
          padding: 40px;
          border-radius: 20px;

          box-shadow:
            0 15px 45px
            rgba(0, 0, 0, 0.15);

          text-align: center;
        }

        .logo {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          background: #e8f5e9;

          font-size: 35px;
        }

        .login-card h1 {
          margin: 0;
          color: #2e7d32;
          font-size: 32px;
        }

        .subtitle {
          margin: 10px 0 30px;
          color: #777;
          font-size: 15px;
        }

        form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          color: #333;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 13px 15px;

          border: 1px solid #ddd;
          border-radius: 9px;

          outline: none;
          font-size: 15px;

          transition: 0.3s;
        }

        .form-group input:focus {
          border-color: #2e7d32;

          box-shadow:
            0 0 0 3px
            rgba(46, 125, 50, 0.12);
        }

        .login-btn {
          width: 100%;
          padding: 14px;

          border: none;
          border-radius: 9px;

          background: #2e7d32;
          color: white;

          font-size: 17px;
          font-weight: bold;

          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn:hover:not(:disabled) {
          background: #1b5e20;
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .register-text {
          margin-top: 25px;
          color: #666;
        }

        .register-text a {
          color: #2e7d32;
          font-weight: bold;
          text-decoration: none;
        }

        .register-text a:hover {
          text-decoration: underline;
        }

        .home-link {
          display: inline-block;
          margin-top: 15px;

          color: #777;
          text-decoration: none;
          font-size: 14px;
        }

        .home-link:hover {
          color: #2e7d32;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }

          .login-card h1 {
            font-size: 27px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;

