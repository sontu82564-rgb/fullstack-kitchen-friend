import { useEffect, useState } from "react";
import axios from "axios";

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

  async function fetchMyProducts() {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:9003/user/my-products",
        {
          withCredentials: true,
        }
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Unable to fetch products."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchMyProducts();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function openEdit(product) {
    setEditProduct({
      _id: product._id,
      productName: product.productName,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });

    setShowEdit(true);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:9003/user/products/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      fetchMyProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:9003/user/products/${editProduct._id}`,
        editProduct,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      setShowEdit(false);

      fetchMyProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update failed."
      );
    }
  }

  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading products...
      </h2>
    );
  }

  return (
    <div className="container">
      <h1>My Products</h1>

      {products.length === 0 ? (
        <h2>No products found.</h2>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div
              className="card"
              key={product._id}
            >
              {product.image && (
                <img
                  src={`http://localhost:9003${product.image}`}
                  alt={product.productName}
                />
              )}

              <h2>{product.productName}</h2>

              <p>
                <strong>Category:</strong>{" "}
                {product.category}
              </p>

              <p>{product.description}</p>

              <h3>₹{product.price}</h3>

              <p>
                Stock: {product.stock}
              </p>

              <div className="buttons">
                <button
                  onClick={() =>
                    openEdit(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

     { /* Edit Modal starts here in Part 2 */}      {showEdit && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Product Name"
                value={editProduct.productName}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    productName: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Description"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                required
              />

              <input
                type="number"
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

              <input
                type="number"
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
                  Update
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
        .container{
          max-width:1200px;
          margin:40px auto;
          padding:20px;
        }

        h1{
          text-align:center;
          margin-bottom:30px;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:25px;
        }

        .card{
          background:#fff;
          border-radius:12px;
          padding:18px;
          box-shadow:0 5px 20px rgba(0,0,0,.1);
        }

        .card img{
          width:100%;
          height:220px;
          object-fit:cover;
          border-radius:10px;
        }

        .buttons{
          display:flex;
          gap:10px;
          margin-top:15px;
        }

        button{
          flex:1;
          padding:12px;
          border:none;
          border-radius:6px;
          cursor:pointer;
          font-weight:600;
          color:#fff;
          background:#ff5a1f;
        }

        .delete{
          background:#d32f2f;
        }

        .modal{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.5);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:1000;
        }

        .modal-content{
          width:450px;
          max-width:95%;
          background:#fff;
          border-radius:10px;
          padding:25px;
        }

        .modal-content form{
          display:flex;
          flex-direction:column;
          gap:15px;
        }

        .modal-content input,
        .modal-content textarea{
          padding:12px;
          border:1px solid #ddd;
          border-radius:6px;
          font-size:15px;
        }

        .modal-content textarea{
          min-height:120px;
          resize:vertical;
        }

        .modal-buttons{
          display:flex;
          gap:10px;
        }

        .cancel{
          background:#666;
        }
      `}</style>
    </div>
  );
}

export default MyProducts;