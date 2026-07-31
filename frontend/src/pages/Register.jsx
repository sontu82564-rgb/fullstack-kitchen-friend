import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9003/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      console.log("Register Response:", response.data);

      alert("Registration successful! Please verify your email.");

      navigate("/check-email");

    } catch (error) {

      console.error("Registration Error:", error);

      alert(
        error.response?.data?.message ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Create Your Account
      </h1>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={6}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Account Type</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
            }}
          >
            <option value="buyer">🛒 Buyer</option>
            <option value="seller">🏪 Seller</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff5a1f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </main>
  );
}

export default Register;