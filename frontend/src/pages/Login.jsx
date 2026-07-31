import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9003/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      const { user, token, message } = response.data;

      // Save user
      localStorage.setItem("user", JSON.stringify(user));

      // Save token (if your backend returns it)
      if (token) {
        localStorage.setItem("token", token);
      }

      alert(message);

      // Redirect according to role
      if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/products");
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .login-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#f4f4f4;
          padding:20px;
        }

        .login-card{
          width:100%;
          max-width:420px;
          background:#fff;
          padding:35px;
          border-radius:10px;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
        }

        .login-title{
          text-align:center;
          margin-bottom:30px;
          color:#333;
        }

        .input-group{
          margin-bottom:20px;
        }

        .input-group label{
          display:block;
          margin-bottom:8px;
          font-weight:600;
        }

        .input-group input{
          width:100%;
          padding:12px;
          border:1px solid #ccc;
          border-radius:6px;
          font-size:15px;
        }

        .login-submit{
          width:100%;
          padding:14px;
          border:none;
          background:#ff5a1f;
          color:white;
          font-size:16px;
          font-weight:bold;
          border-radius:6px;
          cursor:pointer;
          transition:.3s;
        }

        .login-submit:hover{
          background:#e14b13;
        }

        .login-submit:disabled{
          background:#999;
          cursor:not-allowed;
        }

        .signup-text{
          margin-top:20px;
          text-align:center;
        }

        .signup-link{
          color:#ff5a1f;
          text-decoration:none;
          font-weight:bold;
        }

        .signup-link:hover{
          text-decoration:underline;
        }
      `}</style>

      <main className="login-page">
        <div className="login-card">

          <h2 className="login-title">
            Login
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="signup-link"
            >
              Register
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default Login;