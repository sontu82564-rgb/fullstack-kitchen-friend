import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <style>{`
        /* ==============================
           Footer
        ============================== */

        .footer {
          background-color: #1f1f1f;
          color: #ffffff;
          margin-top: 60px;
        }

        /* ==============================
           Footer Container
        ============================== */

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 50px 20px 30px;

          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 50px;
        }

        /* ==============================
           Brand Section
        ============================== */

        .footer-brand {
          max-width: 320px;
        }

        .footer-logo {
          display: inline-block;

          color: #ff5a1f;
          text-decoration: none;

          font-size: 24px;
          font-weight: 700;

          margin-bottom: 15px;
        }

        .footer-description {
          color: #bdbdbd;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        /* ==============================
           Footer Columns
        ============================== */

        .footer-column h3 {
          color: #ffffff;
          font-size: 16px;
          margin: 0 0 20px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          color: #bdbdbd;
          text-decoration: none;
          font-size: 14px;

          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #ff5a1f;
        }

        /* ==============================
           Contact
        ============================== */

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;

          color: #bdbdbd;
          font-size: 14px;
        }

        /* ==============================
           Social Media
        ============================== */

        .social-links {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .social-link {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;
          background-color: #333333;

          border-radius: 50%;
          text-decoration: none;

          font-size: 14px;

          transition: all 0.2s ease;
        }

        .social-link:hover {
          background-color: #ff5a1f;
          transform: translateY(-2px);
        }

        /* ==============================
           Footer Bottom
        ============================== */

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;

          padding: 20px;

          border-top: 1px solid #3a3a3a;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .copyright {
          color: #999999;
          font-size: 13px;
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .bottom-link {
          color: #999999;
          text-decoration: none;
          font-size: 13px;
        }

        .bottom-link:hover {
          color: #ff5a1f;
        }

        /* ==============================
           Tablet
        ============================== */

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        /* ==============================
           Mobile
        ============================== */

        @media (max-width: 600px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 40px 20px 25px;
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              🍴 Kitchen Friend
            </Link>

            <p className="footer-description">
              Your trusted food and grocery delivery partner. Order delicious
              food and fresh groceries from your favorite restaurants and
              stores.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <div className="footer-links">
              <Link to="/" className="footer-link">
                Home
              </Link>

              <Link to="/grocery" className="footer-link">
                Grocery
              </Link>

              <Link to="/orders" className="footer-link">
                My Orders
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <div className="footer-column">
            <h3>Support</h3>

            <div className="footer-links">
              <Link to="/help" className="footer-link">
                Help Center
              </Link>

              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>

              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>

              <Link to="/terms" className="footer-link">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>Contact Us</h3>

            <div className="footer-contact">
              <div className="contact-item">
                📍
                <span>Kolkata, West Bengal</span>
              </div>

              <div className="contact-item">
                📧
                <span>support@kitchenfriend.com</span>
              </div>

              <div className="contact-item">
                📞
                <span>+91 7003100383</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Kitchen Friend. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy" className="bottom-link">
              Privacy
            </Link>

            <Link to="/terms" className="bottom-link">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
