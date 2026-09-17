
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

const API_URL = "http://localhost:9003/user";
const SERVER_URL = "http://localhost:9003";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert stored image path into a complete backend URL
  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${SERVER_URL}${image}`;
    }

    return `${SERVER_URL}/${image}`;
  };

  // Get image from order item first,
  // then fall back to populated product image.
  const getOrderItemImage = (item) => {
    return (
      item?.image ||
      item?.product?.image ||
      item?.product?.imageUrl ||
      ""
    );
  };

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/orders`,
          {
            withCredentials: true,
          }
        );

        if (!isMounted) return;

        console.log(
          "MY ORDERS RESPONSE:",
          response.data
        );

        setOrders(response.data?.orders || []);
      } catch (err) {
        console.error(
          "GET ORDERS ERROR:",
          err.response?.data || err
        );

        if (!isMounted) return;

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError(
            "Only buyers can access orders."
          );
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your orders."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (status) => {
    return `order-status status-${String(
      status || "Pending"
    )
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-loading">
          <div className="orders-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-error">
            <h2>Unable to load orders</h2>
            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-empty">
            <div className="empty-icon">📦</div>

            <h1>No Orders Yet</h1>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              type="button"
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

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <h1>My Orders</h1>
            <p>
              View and track all your orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <article
              className="order-card"
              key={order._id}
            >
              <div className="order-card-header">
                <div>
                  <h2>
                    Order #
                    {order._id
                      ?.slice(-8)
                      .toUpperCase()}
                  </h2>

                  <p>
                    Placed on{" "}
                    {formatDate(
                      order.createdAt
                    )}
                  </p>
                </div>

                <span
                  className={getStatusClass(
                    order.orderStatus
                  )}
                >
                  {order.orderStatus ||
                    "Pending"}
                </span>
              </div>

              <div className="order-products">
                {order.items?.map(
                  (item, index) => {
                    const image =
                      getOrderItemImage(item);

                    const imageUrl =
                      getImageUrl(image);

                    return (
                      <div
                        className="order-product"
                        key={
                          item.product?._id ||
                          `${order._id}-${index}`
                        }
                      >
                        <div className="order-product-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={
                                item.productName ||
                                "Product"
                              }
                              onError={(event) => {
                                console.error(
                                  "ORDER IMAGE FAILED:",
                                  imageUrl
                                );

                                event.currentTarget.style.display =
                                  "none";

                                const parent =
                                  event.currentTarget
                                    .parentElement;

                                if (
                                  parent &&
                                  !parent.querySelector(
                                    ".image-fallback"
                                  )
                                ) {
                                  const fallback =
                                    document.createElement(
                                      "span"
                                    );

                                  fallback.className =
                                    "image-fallback";

                                  fallback.textContent =
                                    "📦";

                                  parent.appendChild(
                                    fallback
                                  );
                                }
                              }}
                            />
                          ) : (
                            <span className="image-fallback">
                              📦
                            </span>
                          )}
                        </div>

                        <div className="order-product-info">
                          <h3>
                            {item.productName ||
                              item.product
                                ?.productName ||
                              "Product"}
                          </h3>

                          <p>
                            ₹
                            {Number(
                              item.price || 0
                            ).toFixed(2)}{" "}
                            × {item.quantity}
                          </p>
                        </div>

                        <strong>
                          ₹
                          {(
                            Number(
                              item.price || 0
                            ) *
                            Number(
                              item.quantity || 0
                            )
                          ).toFixed(2)}
                        </strong>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="order-details">
                <div className="order-address">
                  <h3>Delivery Address</h3>

                  <p>
                    <strong>
                      {
                        order.shippingAddress
                          ?.fullName
                      }
                    </strong>
                  </p>

                  <p>
                    {
                      order.shippingAddress
                        ?.address
                    }
                  </p>

                  <p>
                    {
                      order.shippingAddress
                        ?.city
                    }
                    ,{" "}
                    {
                      order.shippingAddress
                        ?.state
                    }{" "}
                    -{" "}
                    {
                      order.shippingAddress
                        ?.pincode
                    }
                  </p>

                  <p>
                    Phone:{" "}
                    {
                      order.shippingAddress
                        ?.phone
                    }
                  </p>
                </div>

                <div className="order-payment">
                  <h3>Payment</h3>

                  <p>
                    Method:{" "}
                    <strong>
                      {order.paymentMethod ===
                      "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </strong>
                  </p>

                  <p>
                    Payment Status:{" "}
                    <strong>
                      {order.paymentStatus ||
                        "Pending"}
                    </strong>
                  </p>
                </div>

                <div className="order-total">
                  <div>
                    <span>Subtotal</span>

                    <span>
                      ₹
                      {Number(
                        order.subtotal || 0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span>Delivery</span>

                    <span>
                      ₹
                      {Number(
                        order.deliveryCharge || 0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="total-row">
                    <strong>Total</strong>

                    <strong>
                      ₹
                      {Number(
                        order.totalAmount || 0
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Orders;

