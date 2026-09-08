import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =========================
  // Product Check
  // =========================

  if (!product) {
    return (
      <div style={styles.message}>
        <h2>Product information not found.</h2>

        <button
          style={styles.button}
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // =========================
  // Handle Input
  // =========================

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // =========================
  // Place Order
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // User must login
    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await axios.post(
        "http://localhost:9003/user/orders",
        {
          items: [
            {
              product: product._id,
              quantity: 1,
            },
          ],

          shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },

          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          withCredentials: true,
        }
      );

      console.log("ORDER RESPONSE:", response.data);

      alert(
        response.data.message ||
          "Order placed successfully!"
      );

      navigate("/orders");

    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Please login again.");
        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.message ||
          "Unable to place order."
      );

    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        .checkout-page {
          min-height: 100vh;
          background: #f5f5f5;
          padding: 40px 20px;
        }

        .checkout-container {
          max-width: 1100px;
          margin: auto;

          display: grid;
          grid-template-columns: 1fr 400px;

          gap: 30px;
        }

        .checkout-card {
          background: white;

          padding: 30px;

          border-radius: 12px;

          box-shadow:
            0 6px 20px rgba(0,0,0,.08);
        }

        .checkout-title {
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;

          margin-bottom: 7px;

          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {

          width: 100%;

          padding: 12px;

          border: 1px solid #ddd;

          border-radius: 7px;

          font-size: 15px;

          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {

          border-color: #ff5a1f;
        }

        .form-group textarea {

          min-height: 100px;

          resize: vertical;
        }

        .two-columns {

          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 15px;
        }

        .payment-box {

          margin-top: 10px;

          padding: 15px;

          border: 2px solid #0b8f36;

          background: #f1fff5;

          border-radius: 8px;
        }

        .payment-box strong {

          display: block;

          margin-bottom: 5px;
        }

        .place-order-btn {

          width: 100%;

          padding: 15px;

          margin-top: 20px;

          border: none;

          border-radius: 8px;

          background: #ff5a1f;

          color: white;

          font-size: 16px;

          font-weight: bold;

          cursor: pointer;
        }

        .place-order-btn:hover {

          background: #e64a19;
        }

        .place-order-btn:disabled {

          background: #aaa;

          cursor: not-allowed;
        }

        .product-image {

          width: 100%;

          height: 250px;

          object-fit: cover;

          border-radius: 8px;

          margin-bottom: 20px;
        }

        .product-name {

          font-size: 24px;

          margin-bottom: 10px;
        }

        .category {

          color: #ff5a1f;

          font-weight: bold;

          margin-bottom: 15px;
        }

        .price-row {

          display: flex;

          justify-content:
            space-between;

          padding: 15px 0;

          border-bottom:
            1px solid #eee;
        }

        .total-row {

          display: flex;

          justify-content:
            space-between;

          margin-top: 20px;

          font-size: 22px;

          font-weight: bold;

          color: #0b8f36;
        }

        .message {

          text-align: center;

          padding: 100px 20px;
        }

        .message button {

          margin-top: 20px;

          padding: 12px 25px;

          background: #ff5a1f;

          color: white;

          border: none;

          border-radius: 7px;

          cursor: pointer;
        }

        @media(max-width:800px) {

          .checkout-container {

            grid-template-columns: 1fr;
          }

        }

        @media(max-width:500px) {

          .two-columns {

            grid-template-columns: 1fr;
          }

          .checkout-card {

            padding: 20px;
          }
        }

      `}</style>

      <main className="checkout-page">

        <div className="checkout-container">

          {/* =========================
              SHIPPING INFORMATION
          ========================= */}

          <div className="checkout-card">

            <h1 className="checkout-title">
              Checkout
            </h1>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  required
                />

              </div>

              <div className="two-columns">

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit pincode"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />

              </div>

              <h3>
                Payment Method
              </h3>

              <div className="payment-box">

                <strong>
                  💵 Cash on Delivery
                </strong>

                <span>
                  Pay when your order arrives.
                </span>

              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={placingOrder}
              >
                {placingOrder
                  ? "Placing Order..."
                  : `Place Order - ₹${product.price}`}
              </button>

            </form>

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="checkout-card">

            <h2>
              Order Summary
            </h2>

            <br />

            <img
              className="product-image"
              src={
                product.image
                  ? `http://localhost:9003${product.image}`
                  : "https://via.placeholder.com/400x250?text=No+Image"
              }
              alt={product.productName}
            />

            <h2 className="product-name">
              {product.productName}
            </h2>

            <p className="category">
              {product.category ||
                "Grocery"}
            </p>

            <div className="price-row">

              <span>
                Product Price
              </span>

              <strong>
                ₹{product.price}
              </strong>

            </div>

            <div className="price-row">

              <span>
                Quantity
              </span>

              <strong>
                1
              </strong>

            </div>

            <div className="price-row">

              <span>
                Delivery
              </span>

              <strong>
                FREE
              </strong>

            </div>

            <div className="total-row">

              <span>
                Total
              </span>

              <span>
                ₹{product.price}
              </span>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}

const styles = {
  message: {
    textAlign: "center",
    padding: "100px 20px",
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    border: "none",
    background: "#ff5a1f",
    color: "white",
    borderRadius: "7px",
    cursor: "pointer",
  },
};

export default Checkout;