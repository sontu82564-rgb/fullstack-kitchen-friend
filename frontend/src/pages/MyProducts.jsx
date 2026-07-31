import { useEffect, useState } from "react";
import axios from "axios";

function MyProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] = useState(null);


  // Fetch seller products
  async function fetchMyProducts() {

    try {

      const response = await axios.get(
        "http://localhost:9003/user/my-products",
        {
          withCredentials: true,
        }
      );


      console.log(
        "My Products:",
        response.data
      );


      setProducts(
        response.data.products || []
      );


    } catch (error) {

      console.log(
        "Fetch Products Error:",
        error.response?.data || error
      );


    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    fetchMyProducts();

  }, []);




  // Delete Product
  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) return;


    try {

      const response = await axios.delete(
        `http://localhost:9003/user/products/${id}`,
        {
          withCredentials:true,
        }
      );


      alert(response.data.message);


      fetchMyProducts();


    } catch(error) {

      console.log(
        "Delete Error:",
        error.response?.data || error
      );


      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  }




  // Update Product
  async function handleUpdate(e) {

    e.preventDefault();


    try {

      const response = await axios.put(
        `http://localhost:9003/user/products/${editProduct._id}`,
        {
          productName: editProduct.productName,
          category: editProduct.category,
          description: editProduct.description,
          price: editProduct.price,
          stock: editProduct.stock,
        },
        {
          withCredentials:true,
        }
      );


      alert(response.data.message);


      setEditProduct(null);

      fetchMyProducts();


    } catch(error) {

      console.log(
        "Update Error:",
        error.response?.data || error
      );


      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }

  }




  if (loading) {

    return (
      <h2 style={{textAlign:"center"}}>
        Loading products...
      </h2>
    );

  }



  return (

    <div className="container">

      <h1>
        My Products
      </h1>



      {
        products.length === 0 ?

        (
          <h3>
            No products found
          </h3>
        )

        :

        (

        <div className="grid">


        {
          products.map((product)=>(


            <div
              className="card"
              key={product._id}
            >


              {
                product.image &&

                <img
                  src={
                    `http://localhost:9003${product.image}`
                  }
                  alt={product.productName}
                />

              }



              <h2>
                {product.productName}
              </h2>


              <p>
                Category: {product.category}
              </p>


              <p>
                {product.description}
              </p>


              <h3>
                ₹{product.price}
              </h3>


              <p>
                Stock: {product.stock}
              </p>



              <div className="buttons">

                <button
                  onClick={() =>
                    setEditProduct(product)
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


          ))
        }


        </div>

        )
      }




      {
        editProduct &&

        <div className="edit-box">


          <h2>
            Edit Product
          </h2>


          <form onSubmit={handleUpdate}>


            <input
              value={editProduct.productName}
              onChange={(e)=>
                setEditProduct({
                  ...editProduct,
                  productName:e.target.value
                })
              }
            />


            <input
              value={editProduct.category}
              onChange={(e)=>
                setEditProduct({
                  ...editProduct,
                  category:e.target.value
                })
              }
            />


            <textarea
              value={editProduct.description}
              onChange={(e)=>
                setEditProduct({
                  ...editProduct,
                  description:e.target.value
                })
              }
            />


            <input
              type="number"
              value={editProduct.price}
              onChange={(e)=>
                setEditProduct({
                  ...editProduct,
                  price:e.target.value
                })
              }
            />


            <input
              type="number"
              value={editProduct.stock}
              onChange={(e)=>
                setEditProduct({
                  ...editProduct,
                  stock:e.target.value
                })
              }
            />


            <button>
              Update Product
            </button>


            <button
              type="button"
              onClick={() =>
                setEditProduct(null)
              }
            >
              Cancel
            </button>


          </form>


        </div>

      }



<style>{`

.container{
 max-width:1200px;
 margin:40px auto;
 padding:20px;
}

h1{
 text-align:center;
}

.grid{
 display:grid;
 grid-template-columns:
 repeat(auto-fit,minmax(260px,1fr));
 gap:25px;
}

.card{
 background:white;
 padding:20px;
 border-radius:12px;
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
}

button{
 flex:1;
 padding:10px;
 background:#ff5a1f;
 color:white;
 border:none;
 cursor:pointer;
 border-radius:5px;
}

.delete{
 background:red;
}

.edit-box{
 margin-top:40px;
 padding:20px;
 background:#eee;
 border-radius:10px;
}

.edit-box form{
 display:flex;
 flex-direction:column;
 gap:15px;
}

input,textarea{
 padding:12px;
}

`}</style>


    </div>

  );

}


export default MyProducts;