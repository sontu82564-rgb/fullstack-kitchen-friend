
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:9003/user";
const SERVER_URL = "http://localhost:9003";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] = useState({
    _id: "",
    productName: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const [showEdit, setShowEdit] = useState(false);

  // --------------------------------------------------
  // IMAGE URL
  // --------------------------------------------------

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

  // --------------------------------------------------
  // FETCH PRODUCTS
  // --------------------------------------------------

  const fetchMyProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/my-products`,
        {
          withCredentials: true,
        }
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("FETCH MY PRODUCTS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to fetch products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/my-products`,
          {
            withCredentials: true,
          }
        );

        if (mounted) {
          setProducts(
            response.data.products || []
          );
        }
      } catch (error) {
        console.error(
          "FETCH MY PRODUCTS ERROR:",
          error
        );

        if (mounted) {
          alert(
            error.response?.data?.message ||
              "Unable to fetch products."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // --------------------------------------------------
  // EDIT
  // --------------------------------------------------

  const openEdit = (product) => {
    setEditProduct({
      _id: product._id,
      productName: product.productName || "",
      category: product.category || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
    });

    setShowEdit(true);
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/products/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(
        response.data?.message ||
          "Product deleted successfully."
      );

      await fetchMyProducts();
    } catch (error) {
      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  // --------------------------------------------------
  // UPDATE
  // --------------------------------------------------

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/products/${editProduct._id}`,
        editProduct,
        {
          withCredentials: true,
        }
      );

      alert(
        response.data?.message ||
          "Product updated successfully."
      );

      setShowEdit(false);

      await fetchMyProducts();
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Update failed."
      );
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="my-products-loading">
        <div className="loading-spinner" />
        <h2>Loading products...</h2>

        <style>{`
          .my-products-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            font-family:
              Inter,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              Arial,
              sans-serif;
          }

          .my-products-loading h2 {
            color: #555;
            font-size: 18px;
          }

          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e5e7eb;
            border-top-color: #43a047;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="my-products-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Products</h1>
            <p>
              Manage the products you have added.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchMyProducts}
          >
            🔄 Refresh
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              📦
            </div>

            <h2>No products found</h2>

            <p>
              You haven't added any products yet.
            </p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => {
              const imageUrl = getImageUrl(
                product.image
              );

              return (
                <div
                  className="card"
                  key={product._id}
                >
                  <div className="product-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          product.productName ||
                          "Product"
                        }
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";

                          const placeholder =
                            event.currentTarget.parentElement.querySelector(
                              ".image-placeholder"
                            );

                          if (placeholder) {
                            placeholder.style.display =
                              "flex";
                          }
                        }}
                      />
                    ) : null}

                    <div
                      className="image-placeholder"
                      style={{
                        display: imageUrl
                          ? "none"
                          : "flex",
                      }}
                    >
                      <span>🛒</span>
                      <small>
                        No Image
                      </small>
                    </div>
                  </div>

                  <div className="product-content">
                    <h2>
                      {product.productName}
                    </h2>

                    <p className="category">
                      {product.category}
                    </p>

                    <p className="description">
                      {product.description}
                    </p>

                    <h3>
                      ₹
                      {Number(
                        product.price || 0
                      ).toFixed(2)}
                    </h3>

                    <p className="stock">
                      Stock:{" "}
                      <strong>
                        {product.stock}
                      </strong>
                    </p>

                    <div className="buttons">
                      <button
                        type="button"
                        onClick={() =>
                          openEdit(product)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="delete"
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}

      {showEdit && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h2>Edit Product</h2>
                <p>
                  Update your product information.
                </p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setShowEdit(false)
                }
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <label>
                Product Name
              </label>

              <input
                type="text"
                placeholder="Product Name"
                value={
                  editProduct.productName
                }
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    productName:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                Category
              </label>

              <input
                type="text"
                placeholder="Category"
                value={
                  editProduct.category
                }
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                Description
              </label>

              <textarea
                placeholder="Description"
                value={
                  editProduct.description
                }
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: e.target.value,
                  })
                }
                required
              />

              <label>
                Stock
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Stock"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    stock: e.target.value,
                  })
                }
                required
              />

              <div className="modal-buttons">
                <button type="submit">
                  Update Product
                </button>

                <button
                  type="button"
                  className="cancel"
                  onClick={() =>
                    setShowEdit(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .my-products-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: #f7faf7;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0 0 7px;
          color: #1f2937;
          font-size: 32px;
          font-weight: 800;
        }

        .page-header p {
          margin: 0;
          color: #737b73;
        }

        .refresh-button {
          padding: 11px 17px;
          border: 1px solid #d7ded7;
          border-radius: 9px;
          background: #fff;
          color: #333;
          font-weight: 700;
          cursor: pointer;
        }

        .refresh-button:hover {
          background: #f3f7f3;
        }

        .grid {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(260px, 1fr)
            );
          gap: 25px;
        }

        .card {
          overflow: hidden;
          background: #fff;
          border: 1px solid #e7ebe7;
          border-radius: 14px;
          box-shadow:
            0 5px 20px rgba(0, 0, 0, 0.07);
        }

        .product-image {
          width: 100%;
          height: 220px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f1f3f1;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .image-placeholder {
          position: absolute;
          inset: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 7px;
          background: #f3f4f6;
          color: #9ca3af;
        }

        .image-placeholder span {
          font-size: 34px;
        }

        .image-placeholder small {
          font-size: 12px;
        }

        .product-content {
          padding: 18px;
        }

        .product-content h2 {
          margin: 0 0 7px;
          color: #222;
          font-size: 20px;
        }

        .category {
          display: inline-block;
          margin: 0 0 12px;
          padding: 5px 9px;
          border-radius: 20px;
          background: #e8f5e9;
          color: #2e7d32;
          font-size: 12px;
          font-weight: 700;
        }

        .description {
          min-height: 45px;
          color: #666;
          line-height: 1.5;
        }

        .product-content h3 {
          margin: 15px 0 7px;
          color: #2e7d32;
          font-size: 22px;
        }

        .stock {
          color: #555;
        }

        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .buttons button {
          flex: 1;
          padding: 11px;
          border: none;
          border-radius: 7px;
          background: #43a047;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .buttons button:hover {
          opacity: 0.9;
        }

        .buttons .delete {
          background: #d32f2f;
        }

        .empty-state {
          padding: 70px 20px;
          border-radius: 16px;
          background: #fff;
          text-align: center;
        }

        .empty-icon {
          margin-bottom: 10px;
          font-size: 55px;
        }

        .empty-state h2 {
          margin: 0 0 8px;
        }

        .empty-state p {
          margin: 0;
          color: #777;
        }

        .modal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          width: 450px;
          max-width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 25px;
          border-radius: 14px;
          background: #fff;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0 0 5px;
        }

        .modal-header p {
          margin: 0;
          color: #777;
          font-size: 13px;
        }

        .close-button {
          width: 35px;
          height: 35px;
          border: none;
          border-radius: 50%;
          background: #f3f4f6;
          cursor: pointer;
        }

        .modal-content form {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .modal-content label {
          color: #333;
          font-size: 13px;
          font-weight: 700;
        }

        .modal-content input,
        .modal-content textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 7px;
          font-family: inherit;
          font-size: 15px;
          outline: none;
        }

        .modal-content input:focus,
        .modal-content textarea:focus {
          border-color: #43a047;
        }

        .modal-content textarea {
          min-height: 120px;
          resize: vertical;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .modal-buttons button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 7px;
          background: #43a047;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .modal-buttons .cancel {
          background: #666;
        }

        @media (max-width: 600px) {
          .my-products-page {
            padding: 25px 12px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .refresh-button {
            width: 100%;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default MyProducts;

