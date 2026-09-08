function ProductImageUpload({ onImageChange }) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    onImageChange(file);
  };

  return (
    <div className="form-group image-upload-group">
      <label htmlFor="productImage">
        Product Image
      </label>

      <input
        id="productImage"
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
      />

      <small>
        Allowed formats: JPG, PNG, WEBP.
      </small>
    </div>
  );
}

export default ProductImageUpload;