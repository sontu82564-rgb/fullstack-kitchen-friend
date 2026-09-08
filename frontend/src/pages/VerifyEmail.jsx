import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setSuccess(false);
        setMessage("Verification token is missing.");
        setLoading(false);
        return;
      }

      try {
        console.log("Verification token:", token);

        const response = await axios.get(
          `http://localhost:9003/user/verify-email/${token}`
        );

        console.log(
          "Verification response:",
          response.data
        );

        if (response.data.success) {
          setSuccess(true);
          setMessage(
            response.data.message ||
              "Email verified successfully."
          );
        } else {
          setSuccess(false);
          setMessage(
            response.data.message ||
              "Email verification failed."
          );
        }
      } catch (error) {
        console.error(
          "VERIFY EMAIL ERROR:",
          error.response?.data || error
        );

        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
            "Verification link is invalid or expired."
        );
      } finally {
        setLoading(false);
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div className="verify-page">

      <div className="verify-card">

        {loading && (
          <>
            <div className="icon loading-icon">
              ⏳
            </div>

            <h1>
              Verifying Your Email
            </h1>

            <p>
              Please wait while we verify
              your email address...
            </p>
          </>
        )}

        {!loading && success && (
          <>
            <div className="icon success-icon">
              ✓
            </div>

            <h1>
              Email Verified!
            </h1>

            <p>
              {message}
            </p>

            <p className="small-text">
              Your Kitchen Friend account is now
              active. You can login and continue
              shopping.
            </p>

            <button
              onClick={() => navigate("/login")}
            >
              Go To Login
            </button>
          </>
        )}

        {!loading && !success && (
          <>
            <div className="icon error-icon">
              ✕
            </div>

            <h1>
              Verification Failed
            </h1>

            <p>
              {message}
            </p>

            <p className="small-text">
              The verification link may have
              expired or already been used.
            </p>

            <button
              onClick={() => navigate("/register")}
            >
              Register Again
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/login")}
            >
              Go To Login
            </button>
          </>
        )}

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .verify-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5;
          padding: 20px;
        }

        .verify-card {
          width: 100%;
          max-width: 500px;
          background: white;
          padding: 45px 35px;
          text-align: center;
          border-radius: 14px;
          box-shadow:
            0 10px 30px
            rgba(0, 0, 0, 0.08);
        }

        .icon {
          width: 85px;
          height: 85px;
          margin: 0 auto 25px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 45px;
          font-weight: bold;
        }

        .loading-icon {
          background: #fff3e0;
        }

        .success-icon {
          background: #2e7d32;
          color: white;
        }

        .error-icon {
          background: #d32f2f;
          color: white;
        }

        .verify-card h1 {
          margin-bottom: 15px;
          color: #222;
        }

        .verify-card p {
          color: #666;
          line-height: 1.6;
        }

        .small-text {
          font-size: 14px;
          margin-top: 15px;
        }

        .verify-card button {
          width: 100%;
          margin-top: 25px;
          padding: 14px;
          border: none;
          border-radius: 7px;
          background: #ff5a1f;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .verify-card button:hover {
          background: #e64a19;
        }

        .verify-card .secondary-button {
          margin-top: 12px;
          background: #2e7d32;
        }

        .verify-card .secondary-button:hover {
          background: #256628;
        }

      `}</style>

    </div>
  );
}

export default VerifyEmail;