import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("Token:", token);

        if (!token) {
          setSuccess(false);
          setMessage("Verification token is missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:9003/user/verify/${token}`
        );

        console.log("Backend response:", response.data);

        setSuccess(true);

        setMessage(
          response.data.message ||
            "Email verified successfully."
        );

      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error
        );

        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
            "Verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  if (loading) {
    return (
      <div>
        <h1>Verifying Email...</h1>
        <p>Please wait while we verify your email.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div>
        <h1>Email Verified Successfully</h1>

        <p>{message}</p>

        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Verification Failed</h1>

      <p>{message}</p>

      <button onClick={() => navigate("/register")}>
        Register Again
      </button>
    </div>
  );
}

export default Verify;