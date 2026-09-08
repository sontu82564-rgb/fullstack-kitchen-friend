import { useState } from "react";
import axios from "axios";
import ProductImageUpload from "./ProductImageUpload";
import ProductImagePreview from "./ProductImagePreview";

function ProductForm() {
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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Drinks",
    "Snacks",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (file) => {
    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setPreview("");
    setError("");
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      return "Product name is required.";
    }

    if (!formData.category) {
      return "Please select a category.";
    }

    if (!formData.description.trim()) {
      return "Product description is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      return "Price must be greater than 0.";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      return "Stock cannot be negative.";
    }

    if (!formData.image) {
      return "Please select a product image.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("productName", formData.productName.trim());
      data.append("category", formData.category);
      data.append("description", formData.description.trim());
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:9003/user/products",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("PRODUCT CREATED:", response.data);

      setSuccess("Product added successfully!");

      setFormData({
        productName: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      });

      setPreview("");
    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err);

      if (err.response?.status === 401) {
        setError("Please login first.");
      } else if (err.response?.status === 403) {
        setError(
          "Seller account required. Please login with a seller account."
        );
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && (
        <div className="form-message error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="form-message success-message">
          {success}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="productName">
          Product Name
        </label>

        <input
          id="productName"
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">
            Select category
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="5"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">
            Price
          </label>

          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">
            Stock
          </label>

          <input
            id="stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            min="0"
            step="1"
          />
        </div>
      </div>

      <ProductImageUpload
        onImageChange={handleImageChange}
      />

      <ProductImagePreview
        preview={preview}
        onRemove={removeImage}
      />

      <button
        type="submit"
        className="add-product-button"
        disabled={loading}
      >
        {loading
          ? "Adding Product..."
          : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;