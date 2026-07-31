import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("productName", formData.productName);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:9003/user/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert(response.data.message);

      setFormData({
        productName: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      });

      setPreview("");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add product."
      );
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label>Product Image</label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>

      <style>{`
        .container{
          max-width:700px;
          margin:40px auto;
          padding:20px;
        }

        form{
          display:flex;
          flex-direction:column;
          gap:15px;
        }

        input,textarea{
          padding:12px;
          font-size:16px;
        }

        textarea{
          min-height:120px;
        }

        button{
          background:#ff5a1f;
          color:white;
          border:none;
          padding:14px;
          cursor:pointer;
          font-size:16px;
        }

        img{
          margin-top:10px;
        }
      `}</style>
    </div>
  );
}

export default AddProduct;