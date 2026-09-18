import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:9003/user";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/profile`,
          {
            withCredentials: true,
          }
        );

        const profile =
          response.data?.user ||
          response.data?.profile ||
          response.data;

        if (!profile) {
          throw new Error("Profile data not found");
        }

        setUser(profile);

        setFormData({
          name: profile.name || "",
          phone: profile.phone || "",
        });
      } catch (error) {
        console.error(
          "GET PROFILE ERROR:",
          error.response?.data || error.message
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (saving) return;

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const phone = formData.phone.trim();

    if (!name) {
      setError("Name is required.");
      return;
    }

    try {
      setSaving(true);

      console.log("SAVING PROFILE:", {
        name,
        phone,
      });

      const response = await axios.put(
        `${API_URL}/profile`,
        {
          name,
          phone,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "PROFILE UPDATE RESPONSE:",
        response.data
      );

      const updatedUser =
        response.data?.user ||
        response.data?.profile ||
        response.data;

      setUser((prev) => ({
        ...prev,
        ...(updatedUser || {}),
        name,
        phone,
      }));

      setFormData({
        name: updatedUser?.name || name,
        phone: updatedUser?.phone || phone,
      });

      // Update only safe user information in localStorage.
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const localUser = JSON.parse(storedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...localUser,
              name,
              phone,
            })
          );
        }
      } catch (storageError) {
        console.error(
          "LOCAL STORAGE UPDATE ERROR:",
          storageError
        );
      }

      setSuccess(
        response.data?.message ||
          "Profile updated successfully!"
      );
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-card loading-card">
          <div className="spinner" />
          <p>Loading profile...</p>
        </div>

        <style>{`
          .profile-page {
            min-height: 100vh;
            padding: 50px 20px;
            background: #f7faf7;
            font-family:
              Inter,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              Arial,
              sans-serif;
          }

          .loading-card {
            min-height: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }

          .spinner {
            width: 35px;
            height: 35px;
            border: 4px solid #dcecdc;
            border-top-color: #43a047;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {(user?.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Manage your Kitchen Friend account.</p>
          </div>
        </div>

        {error && (
          <div className="message error-message" role="alert">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div
            className="message success-message"
            role="status"
          >
            <span>✅</span>
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
            />

            <small>
              Email address cannot be changed here.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              disabled={saving}
            />
          </div>

          <div className="account-info">
            <div>
              <span>Account Type</span>
              <strong>
                {user?.role === "seller"
                  ? "Seller"
                  : "Buyer"}
              </strong>
            </div>

            <div>
              <span>Email Status</span>
              <strong
                className={
                  user?.isVerified
                    ? "verified"
                    : "not-verified"
                }
              >
                {user?.isVerified
                  ? "✓ Verified"
                  : "Not Verified"}
              </strong>
            </div>
          </div>

          <button
            type="submit"
            className="save-button"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="button-spinner" />
                Saving Changes...
              </>
            ) : (
              <>
                <span>💾</span>
                Save Changes
              </>
            )}
          </button>
        </form>

        <div className="quick-links">
          <h3>Quick Links</h3>

          <div className="link-grid">
            {user?.role === "seller" ? (
              <>
                <Link to="/seller/dashboard">
                  📊 Dashboard
                </Link>

                <Link to="/seller/products">
                  🛍️ My Products
                </Link>

                <Link to="/seller/orders">
                  📦 Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/products">
                  🛍️ Products
                </Link>

                <Link to="/cart">
                  🛒 Cart
                </Link>

                <Link to="/orders">
                  📦 Orders
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .profile-page,
        .profile-page * {
          box-sizing: border-box;
        }

        .profile-page {
          min-height: 100vh;
          width: 100%;
          padding: 50px 20px;
          background:
            radial-gradient(
              circle at top left,
              rgba(76, 175, 80, 0.12),
              transparent 35%
            ),
            #f7faf7;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;
        }

        .profile-card {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          padding: 38px;
          background: #fff;
          border: 1px solid #edf0ed;
          border-radius: 24px;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid #eee;
        }

        .profile-avatar {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #43a047,
            #2e7d32
          );
          color: white;
          font-size: 28px;
          font-weight: 800;
        }

        .profile-header h1 {
          margin: 0 0 5px;
          color: #1f2937;
          font-size: 29px;
        }

        .profile-header p {
          margin: 0;
          color: #7a827c;
          font-size: 14px;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 22px;
          padding: 13px 15px;
          border-radius: 12px;
          font-size: 14px;
        }

        .message p {
          margin: 0;
          line-height: 1.5;
        }

        .error-message {
          border: 1px solid #ffcdd2;
          background: #fff5f5;
          color: #c62828;
        }

        .success-message {
          border: 1px solid #c8e6c9;
          background: #f1f8f2;
          color: #2e7d32;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          color: #303630;
          font-size: 14px;
          font-weight: 700;
        }

        input {
          width: 100%;
          height: 50px;
          padding: 0 15px;
          border: 1px solid #dfe4df;
          border-radius: 11px;
          background: #fafcfa;
          color: #252925;
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        input:focus {
          border-color: #43a047;
          background: white;
          box-shadow:
            0 0 0 3px rgba(67, 160, 71, 0.11);
        }

        input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-group small {
          color: #929992;
          font-size: 11px;
        }

        .account-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          padding: 18px;
          border: 1px solid #e7ece7;
          border-radius: 14px;
          background: #f8fbf8;
        }

        .account-info div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .account-info span {
          color: #8a928a;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .account-info strong {
          color: #303630;
          font-size: 14px;
        }

        .verified {
          color: #2e7d32 !important;
        }

        .not-verified {
          color: #d97706 !important;
        }

        .save-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 52px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #43a047,
            #2e7d32
          );
          color: white;
          font-family: inherit;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          box-shadow:
            0 8px 20px rgba(46, 125, 50, 0.18);
          transition: 0.2s;
        }

        .save-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 12px 26px rgba(46, 125, 50, 0.25);
        }

        .save-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .button-spinner {
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        .quick-links {
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid #eee;
        }

        .quick-links h3 {
          margin: 0 0 13px;
          color: #303630;
          font-size: 15px;
        }

        .link-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .link-grid a {
          padding: 12px 8px;
          border: 1px solid #e1e7e1;
          border-radius: 10px;
          background: #fafcfa;
          color: #394139;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: 0.2s;
        }

        .link-grid a:hover {
          border-color: #43a047;
          color: #2e7d32;
          background: #f5fbf5;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 600px) {
          .profile-page {
            padding: 20px 10px;
          }

          .profile-card {
            padding: 24px 18px;
            border-radius: 18px;
          }

          .profile-header h1 {
            font-size: 24px;
          }

          .account-info {
            grid-template-columns: 1fr;
          }

          .link-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

export default Profile;

