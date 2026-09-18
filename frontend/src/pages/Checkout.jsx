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

        console.log("CHECKOUT CART RESPONSE:", response.data);

        const items =
          response.data?.cart?.items ||
          response.data?.items ||
          [];

        setCart(
          Array.isArray(items) ? items : []
        );
      } catch (err) {
        console.error(
          "CHECKOUT CART ERROR:",
          err.response?.data || err.message
        );

        if (!isMounted) return;

        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
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
    return (
      item?.product ||
      item?.productId ||
      item
    );
  };

  const getProductId = (item) => {
    const product = getProduct(item);

    return (
      product?._id ||
      product?.id ||
      item?.productId ||
      ""
    );
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

  const getProductImage = (item) => {
    const product = getProduct(item);

    return product?.image || "";
  };

  const getQuantity = (item) => {
    const quantity = Number(item?.quantity || 1);

    return Number.isInteger(quantity) && quantity > 0
      ? quantity
      : 1;
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

    setError("");
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (placingOrder) return;

    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Convert cart items into the format required
    // by the Order schema.
    const orderItems = cart
      .map((item) => {
        const product = getProduct(item);

        const productId = getProductId(item);
        const productName = getProductName(item);
        const price = getProductPrice(item);
        const quantity = getQuantity(item);
        const image = getProductImage(item);

        return {
          product: productId,
          productName,
          price,
          quantity,
          image,
        };
      })
      .filter(
        (item) =>
          item.product &&
          item.productName &&
          item.price >= 0 &&
          item.quantity > 0
      );

    console.log("ORDER ITEMS:", orderItems);

    if (orderItems.length === 0) {
      setError(
        "Your cart does not contain valid products. Please return to the products page and add the product again."
      );
      return;
    }

    const orderData = {
      items: orderItems,

      shippingAddress: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },

      subtotal,
      deliveryCharge,
      totalAmount: total,

      paymentMethod: "COD",
    };

    console.log("FINAL ORDER DATA:", orderData);

    try {
      setPlacingOrder(true);

      const response = await axios.post(
        `${API_URL}/orders`,
        orderData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "ORDER RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        alert("Order placed successfully!");

        navigate("/orders", {
          replace: true,
        });

        return;
      }

      setError(
        response.data?.message ||
          "Unable to place order."
      );
    } catch (err) {
      console.error(
        "PLACE ORDER ERROR:",
        err.response?.data || err.message
      );

      if (err.response?.status === 401) {
        navigate("/login", {
          replace: true,
        });
        return;
      }

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to place order. Please try again."
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
          <div
            className="checkout-error"
            role="alert"
          >
            ⚠️ {error}
          </div>
        )}

        <div className="checkout-layout">
          <section className="checkout-form-section">
            <h2>Delivery Details</h2>

            <form onSubmit={placeOrder}>
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={placingOrder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                  disabled={placingOrder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  required
                  disabled={placingOrder}
                />
              </div>

              <div className="checkout-row">
                <div className="form-group">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    disabled={placingOrder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">
                    State
                  </label>

                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    disabled={placingOrder}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pincode">
                  PIN Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit PIN code"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                  disabled={placingOrder}
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
                    getProductId(item) ||
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

