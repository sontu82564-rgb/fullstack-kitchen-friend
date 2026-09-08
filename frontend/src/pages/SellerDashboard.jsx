
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();

  // =========================
  // Get logged-in user
  // =========================

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("USER DATA ERROR:", error);

    localStorage.removeItem("user");
  }

  // =========================
  // Check seller access
  // =========================

  if (!user) {
    navigate("/login", {
      replace: true,
    });

    return null;
  }

  if (user.role !== "seller") {
    navigate("/products", {
      replace: true,
    });

    return null;
  }

  // =========================
  // Logout
  // =========================

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:9003/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");

      alert("Logout successful!");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error.response?.data || error
      );

      // Clear frontend login state
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });
    }
  };

  // =========================
  // Dashboard
  // =========================

  return (
    <div className="seller-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="seller-navbar">

        <div className="seller-logo">
          🛒 Kitchen Friend
        </div>

        <div className="seller-actions">

          <div className="seller-name">
            👤{" "}
            {user?.name ||
              user?.email ||
              "Seller"}
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>

      {/* =========================
          MAIN
      ========================= */}

      <main className="seller-content">

        <section className="welcome">

          <h1>
            Welcome,{" "}
            {user?.name || "Seller"} 
          </h1>

          <p>
            Manage your Kitchen Friend store
            from your seller dashboard.
          </p>

        </section>

        {/* =========================
            DASHBOARD CARDS
        ========================= */}

        <section className="seller-grid">

          <Link
            to="/seller/add-product"
            className="seller-card"
          >
            <div className="card-icon">
              ➕
            </div>

            <h2>
              Add Product
            </h2>

            <p>
              Add new groceries and products
              to your store.
            </p>
          </Link>

          <Link
            to="/seller/products"
            className="seller-card"
          >
            <div className="card-icon">
              📦
            </div>

            <h2>
              My Products
            </h2>

            <p>
              View, edit and delete your
              products.
            </p>
          </Link>

          <Link
            to="/seller/orders"
            className="seller-card"
          >
            <div className="card-icon">
              🛍️
            </div>

            <h2>
              Orders
            </h2>

            <p>
              View and manage customer
              orders.
            </p>
          </Link>

        </section>

      </main>

      {/* =========================
          CSS
      ========================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .seller-page {
          min-height: 100vh;

          background:
            linear-gradient(
              135deg,
              #f1f8f2,
              #fff8f1
            );
        }

        .seller-navbar {
          min-height: 75px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 15px 50px;

          background: #2e7d32;
          color: white;

          box-shadow:
            0 4px 15px
            rgba(0, 0, 0, 0.15);
        }

        .seller-logo {
          font-size: 26px;
          font-weight: 800;
        }

        .seller-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .seller-name {
          padding: 10px 18px;

          border-radius: 30px;

          background:
            rgba(255, 255, 255, 0.15);

          font-weight: 600;
        }

        .logout-button {
          padding: 10px 20px;

          border: none;
          border-radius: 30px;

          background: #e53935;
          color: white;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          transition: 0.3s ease;
        }

        .logout-button:hover {
          background: #b71c1c;

          transform: translateY(-2px);

          box-shadow:
            0 5px 15px
            rgba(0, 0, 0, 0.2);
        }

        .seller-content {
          max-width: 1200px;

          margin: auto;

          padding: 55px 25px;
        }

        .welcome {
          margin-bottom: 40px;
        }

        .welcome h1 {
          margin: 0 0 10px;

          font-size: 38px;
          color: #2e7d32;
        }

        .welcome p {
          margin: 0;

          color: #666;
          font-size: 17px;
        }

        .seller-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(250px, 1fr)
            );

          gap: 25px;
        }

        .seller-card {
          padding: 35px;

          background: white;

          border-radius: 20px;

          text-decoration: none;
          color: #222;

          box-shadow:
            0 8px 25px
            rgba(0, 0, 0, 0.08);

          transition: all 0.3s ease;

          border:
            1px solid
            rgba(46, 125, 50, 0.08);
        }

        .seller-card:hover {
          transform: translateY(-8px);

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          font-size: 45px;
          margin-bottom: 15px;
        }

        .seller-card h2 {
          margin: 0 0 10px;

          color: #2e7d32;
          font-size: 24px;
        }

        .seller-card p {
          margin: 0;

          color: #777;
          line-height: 1.6;
        }

        @media (max-width: 650px) {
          .seller-navbar {
            flex-direction: column;

            gap: 15px;

            padding: 18px 20px;
          }

          .seller-actions {
            width: 100%;

            justify-content: center;
          }

          .seller-content {
            padding: 35px 18px;
          }

          .welcome h1 {
            font-size: 30px;
          }

          .seller-name {
            font-size: 14px;
          }
        }
      `}</style>

    </div>
  );
}

export default SellerDashboard;

