
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const API_URL = "http://localhost:9003/user";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart`,
          {
            withCredentials: true,
          }
        );

        if (!isMounted) return;

        const items =
          response.data?.cart?.items || [];

        setCart(
          Array.isArray(items) ? items : []
        );
      } catch (err) {
        console.error("CHECKOUT CART ERROR:", err);

        if (!isMounted) return;

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load cart."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const getProduct = (item) => {
    return item?.product || item?.productId || item;
  };

  const getProductName = (item) => {
    const product = getProduct(item);

    return (
      product?.productName ||
      product?.name ||
      "Product"
    );
  };

  const getProductPrice = (item) => {
    const product = getProduct(item);

    return Number(product?.price || 0);
  };

  const getQuantity = (item) => {
    return Number(item?.quantity || 1);
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      getProductPrice(item) *
        getQuantity(item),
    0
  );

  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/orders`,
        {
          ...formData,
          paymentMethod: "COD",
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        alert("Order placed successfully!");

        navigate("/orders");
      }
    } catch (err) {
      console.error("PLACE ORDER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-loading">
          <div className="checkout-spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>

          <p>
            Add products before proceeding to
            checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <div className="checkout-layout">
          <section className="checkout-form-section">
            <h2>Delivery Details</h2>

            <form onSubmit={placeOrder}>
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  required
                />
              </div>

              <div className="checkout-row">
                <div className="form-group">
                  <label>City</label>

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
                  <label>State</label>

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
                <label>PIN Code</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit PIN code"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />
              </div>

              <div className="payment-section">
                <h3>Payment Method</h3>

                <div className="payment-option">
                  <input
                    type="radio"
                    checked
                    readOnly
                  />

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <p>
                      Pay when your order is
                      delivered.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-button"
                disabled={placingOrder}
              >
                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total.toFixed(
                      2
                    )}`}
              </button>
            </form>
          </section>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cart.map((item, index) => (
                <div
                  className="checkout-item"
                  key={
                    getProduct(item)?._id ||
                    index
                  }
                >
                  <div>
                    <h3>
                      {getProductName(item)}
                    </h3>

                    <p>
                      Qty: {getQuantity(item)}
                    </p>
                  </div>

                  <strong>
                    ₹
                    {(
                      getProductPrice(item) *
                      getQuantity(item)
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery</span>
              <span>
                ₹{deliveryCharge.toFixed(2)}
              </span>
            </div>

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;

