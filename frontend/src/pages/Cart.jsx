import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const API_URL = "http://localhost:9003/user";
const SERVER_URL = "http://localhost:9003";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // IMAGE URL
  // =========================
  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    // Already a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Local backend image
    if (image.startsWith("/")) {
      return `${SERVER_URL}${image}`;
    }

    return `${SERVER_URL}/${image}`;
  };

  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          withCredentials: true,
        });

        if (!isMounted) {
          return;
        }

        const cartItems = response.data?.cart?.items || [];

        setCart(
          Array.isArray(cartItems)
            ? cartItems
            : []
        );

        setError("");
      } catch (err) {
        console.error("GET CART ERROR:", err);

        if (!isMounted) {
          return;
        }

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError("Only buyers can access the cart.");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your cart."
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

  // =========================
  // PRODUCT HELPERS
  // =========================

  const getProduct = (item) => {
    return item?.product || item?.productId || item;
  };

  const getProductId = (item) => {
    const product = getProduct(item);

    return (
      product?._id ||
      product?.id ||
      item?.productId?._id ||
      item?.productId
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

  const getProductImage = (item) => {
    const product = getProduct(item);

    return (
      product?.image ||
      product?.imageUrl ||
      ""
    );
  };

  const getProductPrice = (item) => {
    const product = getProduct(item);

    return Number(product?.price || 0);
  };

  const getQuantity = (item) => {
    return Number(item?.quantity || 1);
  };

  const getItemTotal = (item) => {
    return (
      getProductPrice(item) *
      getQuantity(item)
    );
  };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    if (!productId || quantity < 1) {
      return;
    }

    try {
      await axios.put(
        `${API_URL}/cart/${productId}`,
        {
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      setCart((previousCart) =>
        previousCart.map((item) => {
          const itemProductId =
            getProductId(item);

          if (
            String(itemProductId) !==
            String(productId)
          ) {
            return item;
          }

          return {
            ...item,
            quantity,
          };
        })
      );

      setError("");
    } catch (err) {
      console.error(
        "UPDATE CART ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update quantity."
      );
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (productId) => {
    if (!productId) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/cart/${productId}`,
        {
          withCredentials: true,
        }
      );

      setCart((previousCart) =>
        previousCart.filter(
          (item) =>
            String(getProductId(item)) !==
            String(productId)
        )
      );

      setError("");
    } catch (err) {
      console.error(
        "REMOVE CART ITEM ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to remove item."
      );
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/cart`, {
        withCredentials: true,
      });

      setCart([]);
      setError("");
    } catch (err) {
      console.error(
        "CLEAR CART ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to clear cart."
      );
    }
  };

  // =========================
  // TOTALS
  // =========================

  const subtotal = cart.reduce(
    (total, item) =>
      total + getItemTotal(item),
    0
  );

  const deliveryCharge =
    subtotal > 0 ? 40 : 0;

  const total =
    subtotal + deliveryCharge;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="cart-loading">
            <div className="cart-loading-spinner"></div>

            <p>
              Loading your cart...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (
    error &&
    cart.length === 0
  ) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="cart-error">
            <h2>
              Unable to load cart
            </h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="shop-now-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products to your
              cart and they will appear
              here.
            </p>

            <button
              type="button"
              className="shop-now-button"
              onClick={() =>
                navigate("/products")
              }
            >
              Start Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // CART
  // =========================

  return (
    <main className="cart-page">
      <div className="cart-container">

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <h1>My Cart</h1>

            <p>
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="cart-error">
            <p>{error}</p>
          </div>
        )}

        {/* CONTENT */}
        <div className="cart-content">

          {/* CART ITEMS */}
          <section className="cart-items">
            {cart.map((item, index) => {
              const productId =
                getProductId(item);

              const productImage =
                getProductImage(item);

              const productName =
                getProductName(item);

              const price =
                getProductPrice(item);

              const quantity =
                getQuantity(item);

              const imageUrl =
                getImageUrl(productImage);

              return (
                <div
                  className="cart-item"
                  key={
                    productId || index
                  }
                >

                  {/* IMAGE */}
                  <div className="cart-item-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={productName}
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";

                          const placeholder =
                            event.currentTarget
                              .parentElement
                              .querySelector(
                                ".cart-image-placeholder"
                              );

                          if (placeholder) {
                            placeholder.style.display =
                              "flex";
                          }
                        }}
                      />
                    ) : null}

                    <div
                      className="cart-image-placeholder"
                      style={{
                        display: imageUrl
                          ? "none"
                          : "flex",
                      }}
                    >
                      <span>
                        🛒
                      </span>

                      <small>
                        No Image
                      </small>
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="cart-item-details">
                    <h3>
                      {productName}
                    </h3>

                    <p className="cart-item-price">
                      ₹
                      {price.toFixed(2)}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() =>
                        updateQuantity(
                          productId,
                          quantity - 1
                        )
                      }
                      disabled={
                        quantity <= 1
                      }
                    >
                      −
                    </button>

                    <span className="quantity">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() =>
                        updateQuantity(
                          productId,
                          quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="cart-item-actions">
                    <strong>
                      ₹
                      {getItemTotal(
                        item
                      ).toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      className="remove-item-button"
                      onClick={() =>
                        removeItem(
                          productId
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          {/* SUMMARY */}
          <aside className="cart-summary">
            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Delivery
              </span>

              <span>
                ₹
                {deliveryCharge.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="continue-shopping"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart

