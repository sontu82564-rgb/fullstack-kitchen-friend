import { Link } from "react-router-dom";

function SellerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <style>{`
        .dashboard{
          max-width:1200px;
          margin:40px auto;
          padding:20px;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:40px;
        }

        .title{
          font-size:32px;
          font-weight:bold;
        }

        .welcome{
          color:#666;
          margin-top:8px;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
        }

        .card{
          background:#fff;
          border-radius:10px;
          padding:25px;
          box-shadow:0 5px 15px rgba(0,0,0,.08);
          text-align:center;
        }

        .card h2{
          margin-bottom:15px;
        }

        .btn{
          display:inline-block;
          margin-top:15px;
          padding:12px 20px;
          background:#ff5a1f;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        }

        body{
          background:#f5f5f5;
        }
      `}</style>

      <div className="dashboard">

        <div className="header">
          <div>
            <h1 className="title">
              Seller Dashboard
            </h1>

            <p className="welcome">
              Welcome, {user?.name}
            </p>
          </div>
        </div>

        <div className="grid">

          <div className="card">
            <h2>📦 My Products</h2>
            <p>View all your products.</p>

            <Link
              to="/seller/products"
              className="btn"
            >
              Open
            </Link>
          </div>

          <div className="card">
            <h2>➕ Add Product</h2>
            <p>Add a new grocery item.</p>

            <Link
              to="/seller/add-product"
              className="btn"
            >
              Add
            </Link>
          </div>

          <div className="card">
            <h2>📋 Orders</h2>
            <p>Manage customer orders.</p>

            <Link
              to="/seller/orders"
              className="btn"
            >
              View
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}

export default SellerDashboard;