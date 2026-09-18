import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* NAVIGATION LINKS */}
          <div className="desktop-nav">

            <Link
              to="/"
              className="nav-link"
            >
              Home
            </Link>

            {user?.role === "buyer" && (
              <>
                <Link
                  to="/products"
                  className="nav-link"
                >
                  Products
                </Link>

                <Link
                  to="/cart"
                  className="nav-link"
                >
                  🛒 Cart
                </Link>

                <Link
                  to="/orders"
                  className="nav-link"
                >
                  Orders
                </Link>

                <Link
                  to="/profile"
                  className="nav-link"
                >
                  Profile
                </Link>
              </>
            )}

            {user?.role === "seller" && (
              <>
                <Link
                  to="/seller/dashboard"
                  className="nav-link"
                >
                  Dashboard
                </Link>

                <Link
                  to="/seller/products"
                  className="nav-link"
                >
                  My Products
                </Link>

                <Link
                  to="/seller/orders"
                  className="nav-link"
                >
                  Orders
                </Link>

                <Link
                  to="/profile"
                  className="nav-link"
                >
                  Profile
                </Link>
              </>
            )}

          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="navbar-actions">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="login-button"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="signup-button"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <span className="welcome-text">
                Hi, {user.name || "User"} 👋
              </span>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">

            <Link
              to="/"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              🏠 Home
            </Link>

            {user?.role === "buyer" && (
              <>
                <Link
                  to="/products"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  🛍️ Products
                </Link>

                <Link
                  to="/cart"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  🛒 Cart
                </Link>

                <Link
                  to="/orders"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  📦 Orders
                </Link>

                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  👤 Profile
                </Link>
              </>
            )}

            {user?.role === "seller" && (
              <>
                <Link
                  to="/seller/dashboard"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/seller/products"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  🛍️ My Products
                </Link>

                <Link
                  to="/seller/orders"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  📦 Orders
                </Link>

                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  👤 Profile
                </Link>
              </>
            )}

            {!user && (
              <div className="mobile-auth-buttons">

                <Link
                  to="/login"
                  className="mobile-login-button"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="mobile-signup-button"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>

              </div>
            )}

            {user && (
              <div className="mobile-welcome">
                Hi, {user.name || "User"} 👋
              </div>
            )}

          </div>
        )}
      </nav>

      <style>{`
        .navbar,
        .navbar * {
          box-sizing: border-box;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;

          background: rgba(255, 255, 255, 0.97);

          border-bottom: 1px solid #e5ebe5;

          box-shadow:
            0 4px 18px rgba(0, 0, 0, 0.05);

          backdrop-filter: blur(12px);
        }

        .navbar-container {
          width: 100%;
          max-width: 1250px;
          min-height: 72px;

          margin: 0 auto;
          padding: 0 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        /* DESKTOP NAVIGATION */

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .nav-link {
          padding: 10px 14px;

          color: #465047;

          text-decoration: none;

          font-size: 14px;
          font-weight: 650;

          border-radius: 9px;

          transition:
            color 0.2s ease,
            background 0.2s ease;
        }

        .nav-link:hover {
          color: #2e7d32;
          background: #f1f8f1;
        }

        /* RIGHT SIDE */

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .login-button {
          padding: 10px 17px;

          color: #3f4841;

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          border: 1px solid #dce4dd;
          border-radius: 9px;

          background: #ffffff;

          transition: 0.2s ease;
        }

        .login-button:hover {
          color: #2e7d32;
          border-color: #43a047;
          background: #f5fbf5;
        }

        .signup-button {
          padding: 11px 19px;

          color: #ffffff;

          text-decoration: none;

          font-size: 14px;
          font-weight: 750;

          border-radius: 9px;

          background: linear-gradient(
            135deg,
            #43a047,
            #2e7d32
          );

          box-shadow:
            0 6px 15px rgba(46, 125, 50, 0.2);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .signup-button:hover {
          transform: translateY(-1px);

          box-shadow:
            0 9px 20px rgba(46, 125, 50, 0.27);
        }

        .welcome-text {
          padding: 10px 14px;

          color: #3f4a42;

          font-size: 14px;
          font-weight: 700;

          border-radius: 9px;

          background: #f1f8f1;
        }

        /* MOBILE BUTTON */

        .mobile-menu-button {
          display: none;

          width: 42px;
          height: 42px;

          align-items: center;
          justify-content: center;

          border: 1px solid #dfe7df;
          border-radius: 10px;

          background: #f8faf8;

          color: #344139;

          font-size: 22px;

          cursor: pointer;
        }

        /* MOBILE MENU */

        .mobile-menu {
          display: none;
        }

        /* TABLET */

        @media (max-width: 800px) {
          .navbar-container {
            padding: 0 17px;
          }

          .nav-link {
            padding: 9px 10px;
            font-size: 13px;
          }

          .login-button,
          .signup-button {
            padding-left: 12px;
            padding-right: 12px;
          }
        }

        /* MOBILE */

        @media (max-width: 650px) {
          .navbar-container {
            min-height: 66px;
            padding: 0 15px;
          }

          .desktop-nav,
          .navbar-actions {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
          }

          .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 6px;

            padding: 12px 15px 18px;

            border-top: 1px solid #edf1ed;

            background: #ffffff;

            box-shadow:
              0 10px 25px rgba(0, 0, 0, 0.06);
          }

          .mobile-nav-link {
            display: block;

            padding: 13px 14px;

            color: #414b43;

            text-decoration: none;

            font-size: 14px;
            font-weight: 650;

            border-radius: 10px;

            transition: 0.2s ease;
          }

          .mobile-nav-link:hover {
            color: #2e7d32;
            background: #f1f8f1;
          }

          .mobile-auth-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;

            gap: 9px;

            margin-top: 8px;
          }

          .mobile-login-button,
          .mobile-signup-button {
            padding: 12px;

            text-align: center;

            text-decoration: none;

            font-size: 14px;
            font-weight: 700;

            border-radius: 9px;
          }

          .mobile-login-button {
            color: #3f4841;

            border: 1px solid #dce4dd;
            background: #ffffff;
          }

          .mobile-signup-button {
            color: #ffffff;

            background: linear-gradient(
              135deg,
              #43a047,
              #2e7d32
            );
          }

          .mobile-welcome {
            padding: 12px 14px;

            color: #2e7d32;

            font-size: 14px;
            font-weight: 700;

            border-radius: 10px;

            background: #f1f8f1;
          }
        }

        @media (max-width: 380px) {
          .navbar-container {
            padding: 0 10px;
          }

          .mobile-menu {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
