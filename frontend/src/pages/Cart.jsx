import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // GET CART
  // =========================

  async function fetchCart() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to view your cart.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:9003/user/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Cart response:", response.data);

      setCart(
        response.data.cart || {
          items: [],
        }
      );
    } catch (error) {
      console.error(
        "GET CART ERROR:",
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
          "Unable to load cart."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================

  async function updateQuantity(
    productId,
    quantity
  ) {
    try {
      const token =
        localStorage.getItem("token");

      if (quantity < 1) {
        return;
      }

      const response = await axios.put(
        `http://localhost:9003/user/cart/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCart(response.data.cart);
    } catch (error) {
      console.error(
        "UPDATE CART ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update quantity."
      );
    }
  }

  // =========================
  // REMOVE PRODUCT
  // =========================

  async function removeProduct(productId) {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:9003/user/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCart(response.data.cart);
    } catch (error) {
      console.error(
        "REMOVE CART ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Unable to remove product."
      );
    }
  }

  // =========================
  // CLEAR CART
  // =========================

  async function clearCart() {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.delete(
        "http://localhost:9003/user/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCart({
        items: [],
      });

      alert(
        response.data.message ||
          "Cart cleared."
      );
    } catch (error) {
      console.error(
        "CLEAR CART ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Unable to clear cart."
      );
    }
  }

  // =========================
  // TOTAL
  // =========================

  const total = (cart.items || []).reduce(
    (sum, item) => {
      const product = item.product;

      if (!product) {
        return sum;
      }

      return (
        sum +
        Number(product.price || 0) *
          Number(item.quantity || 0)
      );
    },
    0
  );

  // =========================
  // CHECKOUT
  // =========================

  function proceedToCheckout() {
    if (!cart.items?.length) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Cart...</h2>

        <style>{`
          .loading {
            min-height: 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!cart.items?.length) {
    return (
      <div className="empty-cart">
        <div className="empty-box">
          <div className="cart-icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products
            yet.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>
        </div>

        <style>{`
          .empty-cart {
            min-height: 80vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            padding: 30px;
          }

          .empty-box {
            background: white;
            padding: 50px;
            border-radius: 15px;
            text-align: center;
            box-shadow:
              0 8px 25px
              rgba(0, 0, 0, 0.08);
          }

          .cart-icon {
            font-size: 70px;
          }

          .empty-box h1 {
            margin: 15px 0;
          }

          .empty-box p {
            color: #666;
            margin-bottom: 25px;
          }

          .empty-box button {
            border: none;
            background: #2e7d32;
            color: white;
            padding: 13px 25px;
            border-radius: 7px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }

  // =========================
  // CART PAGE
  // =========================

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.items.map((item) => {
            const product = item.product;

            if (!product) {
              return null;
            }

            return (
              <div
                className="cart-item"
                key={item._id}
              >

                <img
                  src={
                    product.image
                      ? `http://localhost:9003${product.image}`
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={
                    product.productName
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                />

                <div className="item-info">

                  <h2>
                    {product.productName}
                  </h2>

                  <p className="category">
                    {product.category}
                  </p>

                  <p className="price">
                    ₹{product.price}
                  </p>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        updateQuantity(
                          product._id,
                          item.quantity - 1
                        )
                      }
                      disabled={
                        item.quantity <= 1
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      removeProduct(
                        product._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="item-total">
                  ₹
                  {(
                    Number(product.price || 0) *
                    Number(item.quantity || 0)
                  ).toFixed(2)}
                </div>

              </div>
            );
          })}

        </div>

        <div className="summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              FREE
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>

          <button
            className="checkout"
            onClick={
              proceedToCheckout
            }
          >
            Proceed to Checkout
          </button>

          <button
            className="clear"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .cart-page {
          max-width: 1250px;
          margin: 40px auto;
          padding: 20px;
        }

        .cart-page > h1 {
          text-align: center;
          margin-bottom: 35px;
        }

        .cart-layout {
          display: grid;
          grid-template-columns:
            1fr 350px;
          gap: 30px;
          align-items: start;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          gap: 20px;
          align-items: center;
          box-shadow:
            0 5px 18px
            rgba(0, 0, 0, 0.08);
        }

        .cart-item img {
          width: 150px;
          height: 130px;
          object-fit: cover;
          border-radius: 10px;
        }

        .item-info {
          flex: 1;
        }

        .item-info h2 {
          margin: 0 0 8px;
        }

        .category {
          color: #ff5a1f;
          font-weight: bold;
        }

        .price {
          color: #0b8f36;
          font-size: 18px;
          font-weight: bold;
        }

        .quantity {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 15px 0;
        }

        .quantity button {
          width: 32px;
          height: 32px;
          border: none;
          background: #2e7d32;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-size: 20px;
        }

        .quantity button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .quantity span {
          font-weight: bold;
          min-width: 20px;
          text-align: center;
        }

        .remove {
          border: none;
          background: transparent;
          color: #d32f2f;
          cursor: pointer;
          font-weight: bold;
        }

        .item-total {
          font-size: 20px;
          font-weight: bold;
          color: #222;
        }

        .summary {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow:
            0 5px 18px
            rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 20px;
        }

        .summary h2 {
          margin-top: 0;
          margin-bottom: 25px;
        }

        .summary-row,
        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .summary-total {
          font-size: 21px;
        }

        .summary hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 20px 0;
        }

        .checkout {
          width: 100%;
          border: none;
          background: #ff5a1f;
          color: white;
          padding: 14px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          margin-top: 15px;
        }

        .checkout:hover {
          background: #e64a19;
        }

        .clear {
          width: 100%;
          border: 1px solid #d32f2f;
          background: white;
          color: #d32f2f;
          padding: 12px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 12px;
        }

        .clear:hover {
          background: #fff0f0;
        }

        @media (max-width: 900px) {

          .cart-layout {
            grid-template-columns: 1fr;
          }

          .summary {
            position: static;
          }

        }

        @media (max-width: 600px) {

          .cart-item {
            flex-direction: column;
            align-items: stretch;
          }

          .cart-item img {
            width: 100%;
            height: 220px;
          }

          .item-total {
            text-align: right;
          }

        }

      `}</style>

    </div>
  );
}

export default Cart;