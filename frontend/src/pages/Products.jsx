
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const API_URL = "http://localhost:9003/user";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addingProduct, setAddingProduct] = useState("");

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data:", error);
  }

  /*
  ========================================
  GET PRODUCTS
  ========================================
  */

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products`
        );

        if (!isMounted) return;

        setProducts(response.data?.products || []);
        setError("");
      } catch (error) {
        console.error(
          "GET PRODUCTS ERROR:",
          error
        );

        if (!isMounted) return;

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
  ========================================
  GET CART COUNT
  ========================================
  */

  useEffect(() => {
    let isMounted = true;

    const loadCartCount = async () => {
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

        if (Array.isArray(items)) {
          const count = items.reduce(
            (total, item) =>
              total + Number(item.quantity || 0),
            0
          );

          setCartCount(count);
        }
      } catch (error) {
        console.error(
          "GET CART COUNT ERROR:",
          error
        );
      }
    };

    if (user?.role === "buyer") {
      loadCartCount();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.role]);

  /*
  ========================================
  ADD TO CART
  ========================================
  */

  const addToCart = async (productId) => {
    try {
      setAddingProduct(productId);

      const response = await axios.post(
        `${API_URL}/cart`,
        {
          productId,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const items =
          response.data?.cart?.items || [];

        const count = items.reduce(
          (total, item) =>
            total + Number(item.quantity || 0),
          0
        );

        setCartCount(count);

        alert("Product added to cart!");
      }
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error
      );

      if (error.response?.status === 401) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      if (error.response?.status === 403) {
        alert("Only buyers can add products to cart.");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingProduct("");
    }
  };

  /*
  ========================================
  LOGOUT
  ========================================
  */

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(
        "Logout API error:",
        error.message
      );
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {
    return (
      <main className="products-page">
        <nav className="products-navbar">
          <div
            className="navbar-logo"
            onClick={() => navigate("/")}
          >
            Kitchen Friend
          </div>
        </nav>

        <div className="products-loading">
          <div className="products-spinner"></div>
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  /*
  ========================================
  PAGE
  ========================================
  */

  return (
    <main className="products-page">

      {/* ================= NAVBAR ================= */}

      <nav className="products-navbar">

        <div
          className="navbar-logo"
          onClick={() => navigate("/products")}
        >
          <span>🥬</span>
          Kitchen Friend
        </div>

        <div className="navbar-links">

          <button
            type="button"
            className="navbar-link active"
            onClick={() =>
              navigate("/products")
            }
          >
            🛍️ Products
          </button>

          <button
            type="button"
            className="navbar-link"
            onClick={() =>
              navigate("/orders")
            }
          >
            📦 Orders
          </button>

          {/* CART */}

          <button
            type="button"
            className="navbar-cart-button"
            onClick={() =>
              navigate("/cart")
            }
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="navbar-link"
            onClick={() =>
              navigate("/profile")
            }
          >
            👤 Profile
          </button>

          <button
            type="button"
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ================= CONTENT ================= */}

      <div className="products-container">

        <div className="products-header">
          <div>
            <h1>Fresh Products</h1>

            <p>
              Fresh groceries delivered to
              your doorstep.
            </p>
          </div>
        </div>

        {error && (
          <div className="products-error">
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
        )}

        {!error &&
          products.length === 0 && (
            <div className="products-empty">
              <div className="empty-icon">
                🛒
              </div>

              <h2>No Products Available</h2>

              <p>
                There are currently no products
                available.
              </p>
            </div>
          )}

        {!error &&
          products.length > 0 && (
            <div className="products-grid">

              {products.map((product) => (
                <article
                  className="product-card"
                  key={product._id}
                >

                  {/* IMAGE */}

                  <div
                    className="product-image-container"
                    onClick={() =>
                      navigate(
                        `/products/${product._id}`
                      )
                    }
                  >
                    {product.image ? (
                      <img
                        src={
                          product.image.startsWith(
                            "http"
                          )
                            ? product.image
                            : `http://localhost:9003${product.image}`
                        }
                        alt={
                          product.productName
                        }
                        className="product-image"
                      />
                    ) : (
                      <div className="no-product-image">
                        🥬
                      </div>
                    )}

                    {product.stock <= 0 && (
                      <span className="out-of-stock">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="product-details">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h2>
                      {product.productName}
                    </h2>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-bottom">

                      <div className="product-price">
                        ₹
                        {Number(
                          product.price || 0
                        ).toFixed(2)}
                      </div>

                      <span className="stock-text">
                        {product.stock > 0
                          ? `${product.stock} available`
                          : "Out of stock"}
                      </span>

                    </div>

                    <div className="product-actions">

                      <button
                        type="button"
                        className="view-product-button"
                        onClick={() =>
                          navigate(
                            `/products/${product._id}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="add-cart-button"
                        disabled={
                          product.stock <= 0 ||
                          addingProduct ===
                            product._id
                        }
                        onClick={() =>
                          addToCart(
                            product._id
                          )
                        }
                      >
                        {addingProduct ===
                        product._id
                          ? "Adding..."
                          : product.stock <= 0
                          ? "Out of Stock"
                          : "🛒 Add to Cart"}
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

      </div>

    </main>
  );
}

export default Products;