function ProductImagePreview({ preview, onRemove }) {
  if (!preview) {
    return null;
  }

  return (
    <div className="image-preview-container">
      <div className="image-preview-header">
        <h3>Image Preview</h3>

        <button
          type="button"
          className="remove-image-button"
          onClick={onRemove}
        >
          Remove Image
        </button>
      </div>

      <div className="image-preview">
        <img
          src={preview}
          alt="Product preview"
        />
      </div>
    </div>
  );
}

export default ProductImagePreview;