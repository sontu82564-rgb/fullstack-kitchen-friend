import { Link, NavLink } from "react-router-dom";
import cartIcon from "../assets/cart.2.svg";

function Header() {
  return (
    <>
      <style>{`

        /* ==============================
           Header
        ============================== */

        .header {
          width: 100%;
          height: 70px;
          background-color: #ffffff;
          border-bottom: 1px solid #eeeeee;

          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-container {
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }


        /* ==============================
           Logo
        ============================== */

        .logo {
          display: flex;
          align-items: center;

          text-decoration: none;
        }

        .logo-image {
          width: 180px;
          height: 50px;

          object-fit: contain;
          display: block;
        }


        /* ==============================
           Navigation
        ============================== */

        .nav {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          position: relative;

          color: #555555;
          text-decoration: none;

          font-size: 15px;
          font-weight: 500;

          padding: 25px 0;

          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #ff5a1f;
        }

        .nav-link.active {
          color: #ff5a1f;
          font-weight: 600;
        }

        .nav-link.active::after {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          bottom: 17px;

          height: 2px;
          background-color: #ff5a1f;

          border-radius: 10px;
        }


        /* ==============================
           Header Actions
        ============================== */

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }


        /* ==============================
           Cart
        ============================== */

        .cart {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 42px;
          height: 42px;

          text-decoration: none;

          border-radius: 8px;

          transition: background-color 0.2s ease;
        }

        .cart:hover {
          background-color: #f5f5f5;
        }

        .cart-icon {
          width: 24px;
          height: 24px;

          object-fit: contain;
          display: block;
        }


        /* ==============================
           Cart Count
        ============================== */

        .cart-count {
          position: absolute;

          top: 2px;
          right: 2px;

          min-width: 18px;
          height: 18px;

          padding: 0 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;
          background-color: #ff5a1f;

          font-size: 11px;
          font-weight: 700;

          border-radius: 50%;

          box-sizing: border-box;
        }


        /* ==============================
           Login
        ============================== */

        .login-btn {
          color: #ff5a1f;
          background-color: transparent;

          text-decoration: none;

          font-size: 14px;
          font-weight: 600;

          padding: 9px 18px;

          border: 1px solid #ff5a1f;
          border-radius: 6px;

          transition: all 0.2s ease;
        }

        .login-btn:hover {
          color: #ffffff;
          background-color: #ff5a1f;
        }


        /* ==============================
           Sign Up
        ============================== */

        .signup-btn {
          color: #ffffff;
          background-color: #ff5a1f;

          text-decoration: none;

          font-size: 14px;
          font-weight: 600;

          padding: 10px 18px;

          border: 1px solid #ff5a1f;
          border-radius: 6px;

          transition: all 0.2s ease;
        }

        .signup-btn:hover {
          background-color: #e64d16;
          border-color: #e64d16;
        }


        /* ==============================
           Tablet
        ============================== */

        @media (max-width: 900px) {

          .nav {
            gap: 15px;
          }

          .nav-link {
            font-size: 14px;
          }

          .header-actions {
            gap: 6px;
          }

          .login-btn,
          .signup-btn {
            padding: 8px 12px;
          }

        }


        /* ==============================
           Mobile
        ============================== */

        @media (max-width: 700px) {

          .header {
            height: 60px;
          }

          .header-container {
            padding: 0 15px;
          }

          .nav {
            display: none;
          }

          .login-btn {
            display: none;
          }

          .logo-image {
            width: 150px;
            height: 45px;
          }

          .cart {
            width: 40px;
            height: 40px;
          }

          .cart-icon {
            width: 22px;
            height: 22px;
          }

          .signup-btn {
            padding: 8px 12px;
            font-size: 13px;
          }

        }


        /* ==============================
           Small Mobile
        ============================== */

        @media (max-width: 400px) {

          .logo-image {
            width: 125px;
            height: 40px;
          }

          .signup-btn {
            padding: 7px 10px;
          }

        }

      `}</style>

      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            🍴 Kitchen Friend
          </Link>


          <nav className="nav">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/grocery" className="nav-link">
              Grocery
            </NavLink>

            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </nav>


          <div className="header-actions">

            <Link to="/cart.2" className="cart.2">
              <img src={cartIcon} alt="Cart" className="cart-icon" />

              <span className="cart-count">3</span>
            </Link>


            <Link to="/login" className="login-btn">
              Login
            </Link>


            <Link to="/signUp" className="signup-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
