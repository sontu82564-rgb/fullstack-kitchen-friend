  import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const API_URL = "http://localhost:9003/user";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [cartCount, setCartCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const [error, setError] = useState("");

  /*
  ========================================
  LOAD PRODUCT
  ========================================
  */

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/products/${id}`,
          {
            withCredentials: true,
          }
        );

        if (!isMounted) return;

        setProduct(response.data?.product || null);
      } catch (error) {
        console.error(
          "GET PRODUCT DETAILS ERROR:",
          error
        );

        if (!isMounted) return;

        setError(
          error.response?.data?.message ||
            "Unable to load product."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  /*
  ========================================
  LOAD CART COUNT
  ========================================
  */

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
          "GET CART ERROR:",
          error
        );
      }
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
  ========================================
  QUANTITY
  ========================================
  */

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const increaseQuantity = () => {
    if (!product) return;

    setQuantity((previous) =>
      Math.min(
        product.stock,
        previous + 1
      )
    );
  };

  /*
  ========================================
  ADD TO CART
  ========================================
  */

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    if (quantity > product.stock) {
      alert(
        `Only ${product.stock} items are available.`
      );
      return;
    }

    try {
      setAddingToCart(true);

      const response = await axios.post(
        `${API_URL}/cart`,
        {
          productId: product._id,
          quantity,
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
        alert(
          "Only buyers can add products to cart."
        );
        return;
      }

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingToCart(false);
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
        "Logout error:",
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
      <main className="product-details-page">
        <nav className="product-details-navbar">
          <div
            className="details-navbar-logo"
            onClick={() =>
              navigate("/products")
            }
          >
            <span>🥬</span>
            Kitchen Friend
          </div>
        </nav>

        <div className="details-loading">
          <div className="details-spinner"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  /*
  ========================================
  ERROR
  ========================================
  */

  if (error || !product) {
    return (
      <main className="product-details-page">
        <nav className="product-details-navbar">
          <div
            className="details-navbar-logo"
            onClick={() =>
              navigate("/products")
            }
          >
            <span>🥬</span>
            Kitchen Friend
          </div>
        </nav>

        <div className="details-error">
          <div className="details-error-icon">
            ⚠️
          </div>

          <h1>Product Not Found</h1>

          <p>
            {error ||
              "The product you are looking for does not exist."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  /*
  ========================================
  IMAGE URL
  ========================================
  */

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:9003${product.image}`
    : "";

  /*
  ========================================
  PAGE
  ========================================
  */

  return (
    <main className="product-details-page">

      {/* ========================================
          NAVBAR
      ======================================== */}

      <nav className="product-details-navbar">

        <div
          className="details-navbar-logo"
          onClick={() =>
            navigate("/products")
          }
        >
          <span>🥬</span>
          Kitchen Friend
        </div>

        <div className="details-navbar-links">

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            🛍️ Products
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/orders")
            }
          >
            📦 Orders
          </button>

          <button
            type="button"
            className="details-cart-button"
            onClick={() =>
              navigate("/cart")
            }
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="details-cart-count">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/profile")
            }
          >
            👤 Profile
          </button>

          <button
            type="button"
            className="details-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="product-details-container">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="back-products-button"
          onClick={() =>
            navigate("/products")
          }
        >
          ← Back to Products
        </button>

        {/* ========================================
            PRODUCT
        ======================================== */}

        <section className="product-details-card">

          {/* IMAGE */}

          <div className="product-details-image-section">

            <div className="product-details-image-wrapper">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="product-details-image"
                />
              ) : (
                <div className="product-details-no-image">
                  🥬
                </div>
              )}

              {product.stock <= 0 && (
                <span className="details-out-of-stock">
                  Out of Stock
                </span>
              )}

            </div>

          </div>

          {/* INFORMATION */}

          <div className="product-details-info">

            <span className="details-category">
              {product.category}
            </span>

            <h1>
              {product.productName}
            </h1>

            <div className="details-price">
              ₹
              {Number(
                product.price || 0
              ).toFixed(2)}
            </div>

            <div
              className={
                product.stock > 0
                  ? "details-stock available"
                  : "details-stock unavailable"
              }
            >
              {product.stock > 0
                ? `✓ ${product.stock} items available`
                : "✕ Out of stock"}
            </div>

            <div className="details-divider"></div>

            <div className="details-description">

              <h2>Description</h2>

              <p>
                {product.description ||
                  "No description available for this product."}
              </p>

            </div>

            {/* ========================================
                QUANTITY
            ======================================== */}

            {product.stock > 0 && (
              <div className="details-quantity-section">

                <h3>Quantity</h3>

                <div className="details-quantity-controls">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      quantity <= 1
                    }
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      quantity >=
                      product.stock
                    }
                  >
                    +
                  </button>

                </div>

              </div>
            )}

            {/* ========================================
                TOTAL
            ======================================== */}

            {product.stock > 0 && (
              <div className="details-total">

                <span>Total</span>

                <strong>
                  ₹
                  {(
                    Number(
                      product.price || 0
                    ) * quantity
                  ).toFixed(2)}
                </strong>

              </div>
            )}

            {/* ========================================
                ACTIONS
            ======================================== */}

            <div className="details-actions">

              <button
                type="button"
                className="details-add-cart-button"
                disabled={
                  product.stock <= 0 ||
                  addingToCart
                }
                onClick={
                  handleAddToCart
                }
              >
                {addingToCart
                  ? "Adding..."
                  : product.stock <= 0
                  ? "Out of Stock"
                  : "🛒 Add to Cart"}
              </button>

              <button
                type="button"
                className="details-buy-button"
                disabled={
                  product.stock <= 0
                }
                onClick={async () => {
                  await handleAddToCart();

                  if (product.stock > 0) {
                    navigate("/cart");
                  }
                }}
              >
                Buy Now
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default ProductDetails;

