import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const handleBuyer = () => {
    navigate("/products");
  };

  const handleSeller = () => {
    navigate("/seller/dashboard");
  };

  return (
    <>
      <Navbar />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f5f5;
        }

        .home-hero {
          position: relative;
          width: 100%;
          height: calc(100vh - 70px);
          min-height: 600px;
          overflow: hidden;
          background: #fdfaf4;
        }

        .model-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .model-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.78),
              rgba(0,0,0,.45),
              rgba(0,0,0,.10)
            );

          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 5;

          height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: center;

          max-width: 800px;
          padding: 60px;

          color: white;
        }

        .hero-badge {
          width: fit-content;

          padding: 9px 18px;
          margin-bottom: 22px;

          border-radius: 50px;

          background: rgba(255,255,255,.15);

          border: 1px solid rgba(255,255,255,.35);

          backdrop-filter: blur(10px);

          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .hero-content h1 {
          font-size: clamp(45px, 6vw, 78px);
          line-height: 1;
          margin-bottom: 25px;

          text-shadow:
            0 8px 25px rgba(0,0,0,.4);
        }

        .hero-content h1 span {
          color: #ff9a5c;
        }

        .hero-content p {
          max-width: 600px;

          font-size: 20px;
          line-height: 1.6;

          margin-bottom: 35px;

          color: #f5f5f5;
        }

        .hero-buttons {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .hero-btn {
          min-width: 210px;

          padding: 17px 30px;

          border: none;
          border-radius: 50px;

          color: white;

          font-size: 17px;
          font-weight: bold;

          cursor: pointer;

          transition: .3s;

          box-shadow:
            0 10px 30px rgba(0,0,0,.35);
        }

        .buyer-btn {
          background:
            linear-gradient(
              135deg,
              #ff8a50,
              #ff5722
            );
        }

        .buyer-btn:hover {
          transform:
            translateY(-5px)
            scale(1.03);

          box-shadow:
            0 15px 35px
            rgba(255,87,34,.5);
        }

        .seller-btn {
          background:
            linear-gradient(
              135deg,
              #43a047,
              #1b5e20
            );
        }

        .seller-btn:hover {
          transform:
            translateY(-5px)
            scale(1.03);

          box-shadow:
            0 15px 35px
            rgba(46,125,50,.5);
        }

        .hero-btn:active {
          transform: scale(.96);
        }

        @media(max-width:700px) {

          .home-hero {
            min-height: 650px;
          }

          .hero-overlay {
            background:
              linear-gradient(
                180deg,
                rgba(0,0,0,.45),
                rgba(0,0,0,.75)
              );
          }

          .hero-content {
            padding: 30px 25px;
            align-items: center;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 45px;
          }

          .hero-content p {
            font-size: 17px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-btn {
            width: 230px;
          }
        }
      `}</style>

      <section className="home-hero">

        {/* 3D MODEL */}
        <div className="model-container">
          <iframe
            title="Lowpoly Fruits And Vegetables Props"
            src="https://sketchfab.com/models/f91d6d8a985e4bb2b2d461b577793e57/embed"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        </div>

        {/* OVERLAY */}
        <div className="hero-overlay"></div>

        {/* CONTENT */}
        <div className="hero-content">

          <div className="hero-badge">
            🥕 FRESH • QUALITY • TRUST
          </div>

          <h1>
            Your Kitchen's
            <br />
            <span>Best Friend</span>
          </h1>

          <p>
            Discover fresh groceries, quality food
            products and everything your kitchen needs
            — all in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-btn buyer-btn"
              onClick={handleBuyer}
            >
              🛒 Shop as Buyer
            </button>
 
            <button
              className="hero-btn seller-btn"
              onClick={handleSeller}
            >
              🏪 Sell as Seller
            </button>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;