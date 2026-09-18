import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-container">
          {/* LEFT CONTENT */}
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌿</span>
              Fresh groceries, happy kitchens
            </div>

            <h1>
              Everything Your
              <span> Kitchen Needs.</span>
            </h1>

            <p className="hero-description">
              Shop fresh fruits, vegetables, dairy, bakery items,
              snacks and everyday groceries — all in one friendly
              place.
            </p>

            <div className="hero-buttons">
              <Link
                to="/products"
                className="primary-button"
              >
                <span>🛍️</span>
                Shop Now
                <span className="arrow">→</span>
              </Link>

              <Link
                to="/register"
                className="secondary-button"
              >
                Create Account
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span>✓</span>
                Quality Products
              </div>

              <div className="trust-item">
                <span>✓</span>
                Easy Shopping
              </div>

              <div className="trust-item">
                <span>✓</span>
                Secure Checkout
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="grocery-card">
              <div className="grocery-top">
                <span>Fresh Picks</span>
                <span className="grocery-dot">●</span>
              </div>

              <div className="grocery-basket">
                <div className="food-item apple">🍎</div>
                <div className="food-item broccoli">🥦</div>
                <div className="food-item milk">🥛</div>
                <div className="food-item bread">🍞</div>
                <div className="food-item drink">🥤</div>
              </div>

              <div className="basket-bottom">
                <div>
                  <strong>Kitchen Friend</strong>
                  <p>Fresh & everyday essentials</p>
                </div>

                <div className="basket-check">
                  ✓
                </div>
              </div>
            </div>

            <div className="floating-card delivery-card">
              <div className="floating-icon">🚚</div>
              <div>
                <strong>Easy Delivery</strong>
                <span>To your doorstep</span>
              </div>
            </div>

            <div className="floating-card fresh-card">
              <div className="floating-icon">🥬</div>
              <div>
                <strong>Fresh Products</strong>
                <span>Quality you can trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">
        <div className="section-heading">
          <div>
            <p className="section-label">SHOP BY CATEGORY</p>
            <h2>Everything in one place</h2>
          </div>

          <Link
            to="/products"
            className="view-all"
          >
            View all →
          </Link>
        </div>

        <div className="category-grid">
          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon fruits">
              🍎
            </div>
            <h3>Fruits</h3>
            <p>Fresh & juicy</p>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon vegetables">
              🥦
            </div>
            <h3>Vegetables</h3>
            <p>Fresh & healthy</p>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon dairy">
              🥛
            </div>
            <h3>Dairy</h3>
            <p>Daily essentials</p>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon bakery">
              🍞
            </div>
            <h3>Bakery</h3>
            <p>Freshly baked</p>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon snacks">
              🍿
            </div>
            <h3>Snacks</h3>
            <p>Tasty treats</p>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <div className="category-icon drinks">
              🥤
            </div>
            <h3>Drinks</h3>
            <p>Refresh yourself</p>
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="features-heading">
          <p className="section-label">WHY KITCHEN FRIEND?</p>
          <h2>A simpler way to shop</h2>
          <p>
            Everything is designed to make your grocery
            shopping easy and convenient.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              🥬
            </div>

            <h3>Fresh Products</h3>

            <p>
              Find fresh groceries and everyday essentials
              for your kitchen.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              🛒
            </div>

            <h3>Easy Shopping</h3>

            <p>
              Browse products, add them to your cart and
              order with just a few clicks.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              🚚
            </div>

            <h3>Convenient Delivery</h3>

            <p>
              Get your groceries delivered directly to
              your doorstep.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              🔒
            </div>

            <h3>Secure Checkout</h3>

            <p>
              Enjoy a secure shopping experience from
              cart to order.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-icon">
            🛒
          </div>

          <div>
            <p className="cta-small">
              READY TO SHOP?
            </p>

            <h2>
              Fill your kitchen with good things.
            </h2>

            <p>
              Discover fresh groceries and everyday
              essentials today.
            </p>
          </div>

          <Link
            to="/products"
            className="cta-button"
          >
            Start Shopping →
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <Link
              to="/"
              className="footer-logo"
            >
              🛒 Kitchen Friend
            </Link>

            <p>
              Your friendly online grocery store.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register </Link>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Kitchen Friend.
          All rights reserved.
        </div>
      </footer>

      {/* ================= CSS ================= */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .home-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;

          background: #fbfdfb;

          color: #202820;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;
        }

        a {
          -webkit-tap-highlight-color: transparent;
        }

        /* =========================================
           HERO
        ========================================= */

        .hero-section {
          position: relative;
          min-height: 650px;
          overflow: hidden;

          display: flex;
          align-items: center;

          background:
            linear-gradient(
              135deg,
              #f7fcf7 0%,
              #ffffff 52%,
              #f5faf5 100%
            );
        }

        .hero-background-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .circle-one {
          width: 500px;
          height: 500px;

          top: -260px;
          left: -180px;

          background: rgba(76, 175, 80, 0.07);
        }

        .circle-two {
          width: 550px;
          height: 550px;

          right: -250px;
          bottom: -300px;

          background: rgba(139, 195, 74, 0.08);
        }

        .hero-container {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: 1200px;

          margin: 0 auto;
          padding: 80px 30px;

          display: grid;
          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(400px, 0.95fr);

          align-items: center;
          gap: 55px;
        }

        .hero-content {
          max-width: 620px;
        }

        .hero-badge {
          width: fit-content;

          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 22px;
          padding: 8px 13px;

          border: 1px solid #dcebdc;
          border-radius: 999px;

          background: #f0f8f0;
          color: #347838;

          font-size: 12px;
          font-weight: 700;
        }

        .hero-badge span {
          font-size: 14px;
        }

        .hero h1 {
          margin: 0;

          color: #1d281e;

          font-size: clamp(45px, 5.5vw, 72px);
          line-height: 1.04;

          letter-spacing: -2.8px;
          font-weight: 850;
        }

        .hero h1 span {
          display: block;
          color: #43a047;
        }

        .hero-description {
          max-width: 580px;

          margin: 25px 0 0;

          color: #687268;

          font-size: 17px;
          line-height: 1.75;
        }

        /* HERO BUTTONS */

        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 13px;

          margin-top: 31px;
        }

        .primary-button,
        .secondary-button {
          min-height: 52px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          text-decoration: none;

          font-size: 14px;
          font-weight: 750;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .primary-button {
          gap: 9px;

          padding: 0 20px;

          background: #43a047;
          color: #ffffff;

          box-shadow:
            0 10px 25px rgba(46, 125, 50, 0.19);
        }

        .primary-button:hover {
          background: #2e7d32;
          transform: translateY(-2px);

          box-shadow:
            0 13px 30px rgba(46, 125, 50, 0.25);
        }

        .primary-button .arrow {
          font-size: 18px;
          transition: transform 0.2s ease;
        }

        .primary-button:hover .arrow {
          transform: translateX(3px);
        }

        .secondary-button {
          padding: 0 20px;

          border: 1px solid #d6dfd6;

          background: #ffffff;
          color: #344036;
        }

        .secondary-button:hover {
          border-color: #9bc69d;
          background: #f5faf5;
          color: #2e7d32;

          transform: translateY(-2px);
        }

        /* TRUST */

        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 17px;

          margin-top: 28px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;

          color: #727b73;

          font-size: 11px;
          font-weight: 600;
        }

        .trust-item span {
          width: 17px;
          height: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e8f5e9;
          color: #2e7d32;

          font-size: 10px;
          font-weight: 800;
        }

        /* =========================================
           HERO VISUAL
        ========================================= */

        .hero-visual {
          position: relative;

          min-height: 440px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-glow {
          position: absolute;

          width: 380px;
          height: 380px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(76, 175, 80, 0.17),
              rgba(76, 175, 80, 0)
            );
        }

        .grocery-card {
          position: relative;
          z-index: 2;

          width: min(390px, 85%);

          padding: 25px;

          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 27px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f5faf5
            );

          box-shadow:
            0 30px 70px rgba(36, 80, 40, 0.13),
            0 5px 18px rgba(0, 0, 0, 0.04);

          transform: rotate(1.5deg);
        }

        .grocery-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding-bottom: 17px;

          border-bottom: 1px solid #e9eee9;

          color: #334034;

          font-size: 13px;
          font-weight: 800;
        }

        .grocery-dot {
          color: #66bb6a;
          font-size: 10px;
        }

        .grocery-basket {
          min-height: 245px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          padding: 25px 5px;
        }

        .food-item {
          width: 66px;
          height: 66px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background: #ffffff;

          font-size: 37px;

          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.07);

          animation: floatingFood 4s ease-in-out infinite;
        }

        .food-item:nth-child(2) {
          transform: translateY(-17px);
          animation-delay: 0.5s;
        }

        .food-item:nth-child(3) {
          transform: translateY(12px);
          animation-delay: 1s;
        }

        .food-item:nth-child(4) {
          transform: translateY(-12px);
          animation-delay: 1.5s;
        }

        .food-item:nth-child(5) {
          transform: translateY(15px);
          animation-delay: 2s;
        }

        @keyframes floatingFood {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -6px;
          }
        }

        .basket-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding-top: 17px;

          border-top: 1px solid #e9eee9;
        }

        .basket-bottom strong {
          display: block;

          color: #273127;

          font-size: 14px;
        }

        .basket-bottom p {
          margin: 4px 0 0;

          color: #8a938b;

          font-size: 10px;
        }

        .basket-check {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #e8f5e9;
          color: #2e7d32;

          font-weight: 800;
        }

        /* FLOATING CARDS */

        .floating-card {
          position: absolute;
          z-index: 4;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 11px 14px;

          border: 1px solid #edf2ed;
          border-radius: 14px;

          background: rgba(255, 255, 255, 0.94);

          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.08);

          backdrop-filter: blur(10px);

          animation: floatingCard 4s ease-in-out infinite;
        }

        .floating-icon {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #f1f8f1;

          font-size: 18px;
        }

        .floating-card strong {
          display: block;

          color: #303830;

          font-size: 11px;
        }

        .floating-card span {
          display: block;

          margin-top: 3px;

          color: #929a93;

          font-size: 9px;
        }

        .delivery-card {
          top: 55px;
          right: -10px;
        }

        .fresh-card {
          left: -5px;
          bottom: 58px;

          animation-delay: 1.2s;
        }

        @keyframes floatingCard {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        /* =========================================
           COMMON SECTIONS
        ========================================= */

        .categories-section,
        .features-section {
          width: 100%;
          max-width: 1200px;

          margin: 0 auto;

          padding: 85px 30px;
        }

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 20px;

          margin-bottom: 32px;
        }

        .section-label {
          margin: 0 0 8px;

          color: #43a047;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .section-heading h2,
        .features-heading h2 {
          margin: 0;

          color: #253025;

          font-size: 32px;
          letter-spacing: -1px;
        }

        .view-all {
          color: #2e7d32;

          text-decoration: none;

          font-size: 13px;
          font-weight: 750;

          transition: 0.2s ease;
        }

        .view-all:hover {
          transform: translateX(3px);
        }

        /* =========================================
           CATEGORIES
        ========================================= */

        .category-grid {
          display: grid;

          grid-template-columns:
            repeat(6, minmax(0, 1fr));

          gap: 14px;
        }

        .category-card {
          min-height: 175px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 18px;

          border: 1px solid #e9eee9;
          border-radius: 18px;

          background: #ffffff;

          text-decoration: none;

          box-shadow:
            0 5px 20px rgba(0, 0, 0, 0.025);

          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .category-card:hover {
          transform: translateY(-6px);

          border-color: #c7dfc8;

          box-shadow:
            0 15px 35px rgba(46, 125, 50, 0.09);
        }

        .category-icon {
          width: 68px;
          height: 68px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 13px;

          border-radius: 20px;

          font-size: 34px;

          transition: transform 0.2s ease;
        }

        .category-card:hover .category-icon {
          transform: scale(1.08);
        }

        .fruits {
          background: #fff3f1;
        }

        .vegetables {
          background: #eef8ef;
        }

        .dairy {
          background: #f1f7fc;
        }

        .bakery {
          background: #fff8e9;
        }

        .snacks {
          background: #fff4eb;
        }

        .drinks {
          background: #eef8fa;
        }

        .category-card h3 {
          margin: 0;

          color: #303930;

          font-size: 14px;
        }

        .category-card p {
          margin: 4px 0 0;

          color: #969e97;

          font-size: 10px;
        }

        /* =========================================
           FEATURES
        ========================================= */

        .features-section {
          max-width: none;

          background: #f5f9f5;
        }

        .features-heading {
          max-width: 600px;

          margin: 0 auto 40px;

          text-align: center;
        }

        .features-heading > p:last-child {
          margin: 13px auto 0;

          color: #7d867e;

          font-size: 14px;
          line-height: 1.6;
        }

        .features-grid {
          width: 100%;
          max-width: 1100px;

          margin: 0 auto;

          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 18px;
        }

        .feature-card {
          padding: 30px 22px;

          border: 1px solid #e4ebe4;
          border-radius: 18px;

          background: #ffffff;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);

          box-shadow:
            0 14px 30px rgba(0, 0, 0, 0.05);
        }

        .feature-icon {
          width: 57px;
          height: 57px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: 0 auto 17px;

          border-radius: 16px;

          background: #eef7ef;

          font-size: 27px;
        }

        .feature-card h3 {
          margin: 0 0 8px;

          color: #303830;

          font-size: 15px;
        }

        .feature-card p {
          margin: 0;

          color: #818a82;

          font-size: 12px;
          line-height: 1.65;
        }

        /* =========================================
           CTA
        ========================================= */

        .cta-section {
          padding: 70px 25px;
        }

        .cta-content {
          width: 100%;
          max-width: 1100px;

          margin: 0 auto;

          padding: 35px 40px;

          display: flex;
          align-items: center;
          gap: 22px;

          border-radius: 22px;

          background:
            linear-gradient(
              120deg,
              #2e7d32,
              #43a047
            );

          color: #ffffff;

          box-shadow:
            0 18px 40px rgba(224, 194, 25, 0.17);
        }

        .cta-icon {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 17px;

          background: rgba(255, 255, 255, 0.15);

          font-size: 28px;
        }

        .cta-small {
          margin: 0 0 5px;

          opacity: 0.75;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .cta-content h2 {
          margin: 0;

          font-size: 24px;
          letter-spacing: -0.5px;
        }

        .cta-content > div:nth-child(2) > p:last-child {
          margin: 6px 0 0;

          opacity: 0.82;

          font-size: 12px;
        }

        .cta-button {
          margin-left: auto;

          flex-shrink: 0;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-height: 46px;

          padding: 0 19px;

          border-radius: 10px;

          background: #ffffff;
          color: #2e7d32;

          text-decoration: none;

          font-size: 12px;
          font-weight: 800;

          transition: 0.2s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 7px 18px rgba(0, 0, 0, 0.13);
        }

        /* =========================================
           FOOTER
        ========================================= */

        .footer {
          border-top: 1px solid #e7ece7;

          background: #ffffff;
        }

        .footer-container {
          width: 100%;
          max-width: 1200px;

          margin: 0 auto;

          padding: 38px 30px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 25px;
        }

        .footer-logo {
          color: #2e7d32;

          text-decoration: none;

          font-size: 17px;
          font-weight: 800;
        }

        .footer-container p {
          margin: 7px 0 0;

          color: #929a93;

          font-size: 11px;
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          color: #687168;

          text-decoration: none;

          font-size: 11px;
          font-weight: 600;

          transition: 0.2s ease;
        }

        .footer-links a:hover {
          color: #2e7d32;
        }

        .footer-bottom {
          padding: 16px 20px;

          border-top: 1px solid #edf0ed;

          color: #a0a7a0;

          text-align: center;

          font-size: 10px;
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1000px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 25px;

            padding-top: 65px;
          }

          .hero-content {
            max-width: 700px;
            margin: 0 auto;

            text-align: center;
          }

          .hero-badge {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-trust {
            justify-content: center;
          }

          .hero-visual {
            min-height: 390px;
          }

          .category-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .features-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .hero-section {
            min-height: auto;
          }

          .hero-container {
            padding: 48px 18px 55px;

            gap: 10px;
          }

          .hero h1 {
            font-size: 43px;
            line-height: 1.07;

            letter-spacing: -1.7px;
          }

          .hero-description {
            margin-top: 18px;

            font-size: 14px;
            line-height: 1.65;
          }

          .hero-buttons {
            flex-direction: column;

            width: 100%;

            margin-top: 25px;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .hero-trust {
            gap: 9px 14px;

            margin-top: 22px;
          }

          .trust-item {
            font-size: 9px;
          }

          .hero-visual {
            min-height: 340px;
          }

          .grocery-card {
            width: 88%;
            padding: 18px;

            border-radius: 22px;
          }

          .grocery-basket {
            min-height: 195px;
            gap: 5px;
          }

          .food-item {
            width: 52px;
            height: 52px;

            border-radius: 15px;

            font-size: 28px;
          }

          .floating-card {
            padding: 8px 10px;
          }

          .floating-icon {
            width: 29px;
            height: 29px;

            font-size: 14px;
          }

          .floating-card strong {
            font-size: 9px;
          }

          .floating-card span {
            font-size: 7px;
          }

          .delivery-card {
            top: 22px;
            right: 0;
          }

          .fresh-card {
            left: 0;
            bottom: 25px;
          }

          .categories-section,
          .features-section {
            padding: 55px 17px;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;

            margin-bottom: 23px;
          }

          .section-heading h2,
          .features-heading h2 {
            font-size: 27px;
          }

          .category-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 10px;
          }

          .category-card {
            min-height: 150px;
          }

          .category-icon {
            width: 58px;
            height: 58px;

            font-size: 29px;
          }

          .features-grid {
            grid-template-columns: 1fr;

            gap: 11px;
          }

          .feature-card {
            padding: 25px 20px;
          }

          .cta-section {
            padding: 45px 17px;
          }

          .cta-content {
            flex-direction: column;
            align-items: flex-start;

            padding: 28px 23px;

            border-radius: 19px;
          }

          .cta-content h2 {
            font-size: 21px;
          }

          .cta-button {
            width: 100%;
            margin-left: 0;
          }

          .footer-container {
            flex-direction: column;
            align-items: flex-start;

            padding: 30px 20px;
          }

          .footer-links {
            flex-wrap: wrap;
            gap: 12px 18px;
          }
        }

        @media (max-width: 380px) {
          .hero h1 {
            font-size: 37px;
          }

          .hero-visual {
            min-height: 310px;
          }

          .food-item {
            width: 45px;
            height: 45px;

            font-size: 24px;
          }

          .grocery-basket {
            min-height: 175px;
          }
        }

        /* =========================================
           ACCESSIBILITY
        ========================================= */

        .primary-button:focus-visible,
        .secondary-button:focus-visible,
        .category-card:focus-visible,
        .view-all:focus-visible,
        .cta-button:focus-visible,
        .footer-links a:focus-visible {
          outline: 3px solid rgba(67, 160, 71, 0.35);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

