import ProductHeader from "../components/product/ProductHeader";
import ProductForm from "../components/product/ProductForm";
import  "./Addproduct.css"


function AddProduct() {
  return (
    <main className="add-product-page">
      <div className="product-card"> 
        <ProductHeader />
        <ProductForm />
      </div>
    </main>
  );
}

export default AddProduct;