
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./SellerOrders.css";

const API_URL = "http://localhost:9003/user";
const SERVER_URL = "http://localhost:9003";

function SellerOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");

  // ==========================================
  // GET IMAGE URL
  // ==========================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

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

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/seller/orders`,
        {
          withCredentials: true,
        }
      );

      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("SELLER ORDERS ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDERS
  // IMPORTANT:
  // fetchOrders is called inside a nested function
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/seller/orders`,
          {
            withCredentials: true,
          }
        );

        if (mounted) {
          setOrders(response.data.orders || []);
        }
      } catch (err) {
        console.error(
          "SELLER ORDERS ERROR:",
          err
        );

        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load orders"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingOrder(orderId);
      setError("");

      const response = await axios.put(
        `${API_URL}/seller/orders/${orderId}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      const updatedOrder =
        response.data.order;

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === updatedOrder._id
            ? updatedOrder
            : order
        )
      );
    } catch (err) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Unable to update order status"
      );
    } finally {
      setUpdatingOrder("");
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    return (
      status?.toLowerCase() ||
      "pending"
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="seller-orders-page">
        <div className="seller-orders-loading">
          <div className="seller-orders-spinner">
            ⏳
          </div>

          <p>
            Loading customer orders...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="seller-orders-page">

      {/* ================= NAVBAR ================= */}

      <header className="seller-orders-navbar">

        <div
          className="seller-orders-logo"
          onClick={() =>
            navigate("/seller/dashboard")
          }
        >
          🥬 Kitchen Friend
        </div>

        <nav className="seller-orders-navigation">

          <button
            type="button"
            onClick={() =>
              navigate("/seller/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/seller/add-product")
            }
          >
            Add Product
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/seller/products")
            }
          >
            My Products
          </button>

          <button
            type="button"
            className="seller-orders-active"
          >
            Orders
          </button>

          <button
            type="button"
            className="seller-orders-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>
      </header>

      {/* ================= MAIN ================= */}

      <main className="seller-orders-container">

        {/* PAGE HEADER */}

        <div className="seller-orders-title">

          <div>
            <h1>
              Customer Orders
            </h1>

            <p>
              View and manage customer orders.
            </p>
          </div>

          <button
            type="button"
            className="seller-orders-refresh"
            onClick={fetchOrders}
          >
            🔄 Refresh
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="seller-orders-error">
            {error}
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {orders.length === 0 ? (
          <div className="seller-orders-empty">

            <div className="seller-orders-empty-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              Customer orders will appear here
              after a customer places an order.
            </p>

          </div>
        ) : (

          /* ================= ORDER LIST ================= */

          <div className="seller-orders-list">

            {orders.map((order) => {

              const status =
                order.orderStatus ||
                "Pending";

              const statusClass =
                getStatusClass(status);

              return (
                <div
                  className="seller-order-card"
                  key={order._id}
                >

                  {/* ORDER HEADER */}

                  <div className="seller-order-header">

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
                      className={`seller-order-status ${statusClass}`}
                    >
                      {status}
                    </span>

                  </div>

                  {/* CUSTOMER INFORMATION */}

                  <div className="seller-order-section">

                    <h3>
                      Customer Information
                    </h3>

                    <div className="seller-customer-info">

                      <div>
                        <span>
                          Name
                        </span>

                        <strong>
                          {order.user?.name ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Email
                        </span>

                        <strong>
                          {order.user?.email ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Phone
                        </span>

                        <strong>
                          {order.shippingAddress
                            ?.phone ||
                            "N/A"}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* DELIVERY ADDRESS */}

                  <div className="seller-order-section">

                    <h3>
                      Delivery Address
                    </h3>

                    <div className="seller-address">

                      <strong>
                        {order.shippingAddress
                          ?.fullName ||
                          "N/A"}
                      </strong>

                      <p>
                        {order.shippingAddress
                          ?.address ||
                          "N/A"}

                        <br />

                        {order.shippingAddress
                          ?.city ||
                          ""}

                        {order.shippingAddress
                          ?.city &&
                        order.shippingAddress
                          ?.state
                          ? ", "
                          : ""}

                        {order.shippingAddress
                          ?.state ||
                          ""}

                        <br />

                        PIN:{" "}
                        {order.shippingAddress
                          ?.pincode ||
                          "N/A"}
                      </p>

                    </div>

                  </div>

                  {/* PRODUCTS */}

                  <div className="seller-order-section">

                    <h3>
                      Ordered Products
                    </h3>

                    <div className="seller-products-list">

                      {order.items?.map(
                        (item, index) => {

                          const image =
                            item.image ||
                            item.product?.image ||
                            "";

                          const imageUrl =
                            getImageUrl(image);

                          const price =
                            Number(
                              item.price || 0
                            );

                          const quantity =
                            Number(
                              item.quantity || 0
                            );

                          const itemTotal =
                            price * quantity;

                          return (
                            <div
                              className="seller-product-row"
                              key={
                                item.product?._id ||
                                index
                              }
                            >

                              {/* PRODUCT IMAGE */}

                              <div className="seller-product-image">

                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt={
                                      item.productName ||
                                      "Product"
                                    }
                                    onError={(
                                      event
                                    ) => {
                                      event.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                ) : (
                                  <span>
                                    🛒
                                  </span>
                                )}

                              </div>

                              {/* PRODUCT DETAILS */}

                              <div className="seller-product-info">

                                <h4>
                                  {item.productName ||
                                    "Product"}
                                </h4>

                                <p>
                                  ₹
                                  {price.toFixed(
                                    2
                                  )}
                                  {" "}×{" "}
                                  {quantity}
                                </p>

                              </div>

                              {/* ITEM TOTAL */}

                              <strong className="seller-product-total">
                                ₹
                                {itemTotal.toFixed(
                                  2
                                )}
                              </strong>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>

                  {/* PAYMENT */}

                  <div className="seller-order-section">

                    <h3>
                      Payment
                    </h3>

                    <div className="seller-payment">

                      <p>
                        Method:
                        <strong>
                          {" "}
                          {order.paymentMethod ||
                            "COD"}
                        </strong>
                      </p>

                      <p>
                        Status:
                        <strong>
                          {" "}
                          {order.paymentStatus ||
                            "Pending"}
                        </strong>
                      </p>

                    </div>

                  </div>

                  {/* ORDER TOTAL */}

                  <div className="seller-order-total">

                    <div>
                      <span>
                        Subtotal
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.subtotal || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Delivery
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.deliveryCharge ||
                            0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div className="seller-grand-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.totalAmount ||
                            0
                        ).toFixed(2)}
                      </strong>

                    </div>

                  </div>

                  {/* STATUS UPDATE */}

                  <div className="seller-update-status">

                    <label htmlFor={`status-${order._id}`}>
                      Update Order Status
                    </label>

                    <select
                      id={`status-${order._id}`}
                      value={status}
                      disabled={
                        updatingOrder ===
                          order._id ||
                        status === "Delivered" ||
                        status === "Cancelled"
                      }
                      onChange={(event) =>
                        updateOrderStatus(
                          order._id,
                          event.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                    {updatingOrder ===
                      order._id && (
                      <span>
                        Updating...
                      </span>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
}

export default SellerOrders;