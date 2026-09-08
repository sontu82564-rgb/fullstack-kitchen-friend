import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:9003/user/products"
        );

        console.log("Products response:", response.data);

        if (isMounted) {
          setProducts(
            response.data.products || []
          );
        }
      } catch (error) {
        console.error(
          "GET PRODUCTS ERROR:",
          error.response?.data || error
        );

        if (isMounted) {
          alert(
            error.response?.data?.message ||
              "Unable to load products."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // ADD TO CART
  // =========================

  async function addToCart(productId) {
    try {
      const token =
        localStorage.getItem("token");

      // User must login first
      if (!token) {
        alert(
          "Please login before adding products to cart."
        );

        navigate("/login");
        return;
      }

      console.log(
        "Adding product to cart:",
        productId
      );

      const response = await axios.post(
        "http://localhost:9003/user/cart",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(
        "Add to cart response:",
        response.data
      );

      if (response.data.success) {
        alert(
          response.data.message ||
            "Product added to cart."
        );
      } else {
        alert(
          response.data.message ||
            "Unable to add product to cart."
        );
      }
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Your login session has expired. Please login again."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    }
  }

  // =========================
  // BUY NOW
  // =========================

  function buyNow(product) {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login before buying a product."
      );

      navigate("/login");
      return;
    }

    // Save selected product
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
        productId: product._id,
        productName: product.productName,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    );

    navigate("/checkout");
  }

  // =========================
  // CATEGORIES
  // =========================

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products.map(
          (product) =>
            product.category ||
            "Uncategorized"
        )
      ),
    ];
  }, [products]);

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name =
        product.productName || "";

      const searchMatch =
        name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const categoryMatch =
        category === "All" ||
        (product.category ||
          "Uncategorized") === category;

      return (
        searchMatch &&
        categoryMatch
      );
    });
  }, [
    products,
    search,
    category,
  ]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
        }}
      >
        <h2>
          Loading Products...
        </h2>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="products-container">

      <h1>
        Fresh Grocery Products
      </h1>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

      </div>

      {filteredProducts.length === 0 ? (

        <div className="empty">
          <h2>
            No products found.
          </h2>
        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map(
            (product) => (

              <div
                className="product-card"
                key={product._id}
              >

                <img
                  src={
                    product.image
                      ? `http://localhost:9003${product.image}`
                      : "https://via.placeholder.com/300x220?text=No+Image"
                  }
                  alt={
                    product.productName ||
                    "Product image"
                  }
                  onError={(e) => {
                    e.target.onerror = null;

                    e.target.src =
                      "https://via.placeholder.com/300x220?text=No+Image";
                  }}
                />

                <div className="product-body">

                  <h2>
                    {product.productName ||
                      "Unnamed Product"}
                  </h2>

                  <p className="category">
                    {product.category ||
                      "Uncategorized"}
                  </p>

                  <p className="description">
                    {product.description ||
                      "No description available."}
                  </p>

                  <h3>
                    ₹{product.price ?? "N/A"}
                  </h3>

                  <p>
                    Stock:{" "}
                    <strong>
                      {product.stock ?? 0}
                    </strong>
                  </p>

                  <div className="buttons">

                    <button
                      className="cart-btn"
                      onClick={() =>
                        addToCart(
                          product._id
                        )
                      }
                      disabled={
                        !product.stock
                      }
                    >
                      Add To Cart
                    </button>

                    <button
                      className="buy-btn"
                      onClick={() =>
                        buyNow(product)
                      }
                      disabled={
                        !product.stock
                      }
                    >
                      Buy Now
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .products-container {
          max-width: 1300px;
          margin: 40px auto;
          padding: 20px;
        }

        .products-container h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #222;
        }

        .top-bar {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .top-bar input {
          flex: 1;
          min-width: 250px;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .top-bar select {
          width: 220px;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .products-grid {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(280px, 1fr)
            );
          gap: 25px;
        }

        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 8px 20px
            rgba(0, 0, 0, 0.08);
          transition: 0.3s;
        }

        .product-card:hover {
          transform: translateY(-6px);
        }

        .product-card img {
          width: 100%;
          height: 230px;
          object-fit: cover;
        }

        .product-body {
          padding: 18px;
        }

        .product-body h2 {
          margin: 0 0 10px;
          font-size: 22px;
        }

        .category {
          color: #ff5a1f;
          font-weight: bold;
        }

        .description {
          color: #666;
          margin: 12px 0;
          min-height: 55px;
        }

        .product-body h3 {
          color: #0b8f36;
          margin-bottom: 10px;
        }

        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .buttons button {
          flex: 1;
          border: none;
          cursor: pointer;
          padding: 12px;
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
        }

        .buttons button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .cart-btn {
          background: #ff5a1f;
        }

        .buy-btn {
          background: #0b8f36;
        }

        .cart-btn:hover {
          background: #e64a19;
        }

        .buy-btn:hover {
          background: #08752d;
        }

        .empty {
          text-align: center;
          margin-top: 80px;
          color: #666;
        }

        @media (max-width: 768px) {

          .top-bar {
            flex-direction: column;
          }

          .top-bar select {
            width: 100%;
          }

          .buttons {
            flex-direction: column;
          }

        }

      `}</style>

    </div>
  );
}

export default Products;