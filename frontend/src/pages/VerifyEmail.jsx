import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus("Invalid verification link.");
          return;
        }

        const response = await axios.get(
          `http://localhost:9003/user/verify/${token}`,
          {
            withCredentials: true,
          }
        );

        setSuccess(true);

        setStatus(
          response.data?.message ||
            "Email verified successfully!"
        );

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (error) {
        console.error(
          "EMAIL VERIFICATION ERROR:",
          error.response?.data || error.message
        );

        setSuccess(false);

        setStatus(
          error.response?.data?.message ||
            "Email verification failed."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-page">
      <div className="verify-card">

        <div className="verify-icon">
          {success ? "✅" : "✉️"}
        </div>

        <h1>
          {success
            ? "Email Verified!"
            : "Email Verification"}
        </h1>

        <p>{status}</p>

        {success && (
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        )}

      </div>

      <style>{`
        .verify-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #f5faf5;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .verify-card {
          width: 100%;
          max-width: 450px;
          padding: 45px 35px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e5ebe5;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        .verify-icon {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .verify-card h1 {
          margin: 0 0 12px;
          color: #263228;
          font-size: 28px;
        }

        .verify-card p {
          margin: 0 0 25px;
          color: #687169;
          line-height: 1.6;
        }

        .verify-card button {
          border: none;
          padding: 12px 22px;
          border-radius: 10px;
          background: #2e7d32;
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .verify-card button:hover {
          background: #256b29;
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;

