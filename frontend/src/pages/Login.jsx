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

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      // Redirect to Products page
      navigate("/products");

    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Login failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page{
          min-height:calc(100vh - 70px);
          display:flex;
          justify-content:center;
          align-items:center;
          background:#f8f8f8;
          padding:40px 20px;
        }

        .login-card{
          width:100%;
          max-width:420px;
          background:white;
          padding:40px;
          border-radius:10px;
          box-shadow:0 10px 30px rgba(0,0,0,.08);
        }

        .login-title{
          text-align:center;
          margin-bottom:30px;
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
          border:1px solid #ddd;
          border-radius:6px;
          box-sizing:border-box;
        }

        .login-submit{
          width:100%;
          padding:14px;
          background:#ff5a1f;
          color:white;
          border:none;
          border-radius:6px;
          cursor:pointer;
          font-size:16px;
          font-weight:600;
        }

        .login-submit:disabled{
          background:#999;
          cursor:not-allowed;
        }

        .signup-text{
          text-align:center;
          margin-top:20px;
        }

        .signup-link{
          color:#ff5a1f;
          text-decoration:none;
          font-weight:bold;
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
                required
              />
            </div>


            <button
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