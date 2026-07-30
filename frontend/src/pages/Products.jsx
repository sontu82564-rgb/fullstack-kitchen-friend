import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get(
          "http://localhost:9003/products",
          {
            withCredentials: true,
          }
        );

        console.log("Products Data:", response.data);

        setProducts(response.data.products || response.data);

      } catch (error) {

        console.error(
          "Products Error:",
          error.response?.data || error.message
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);



  if (loading) {
    return (
      <h2 style={{textAlign:"center"}}>
        Loading products...
      </h2>
    );
  }



  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Fresh Groceries 🛒
      </h1>


      {
        products.length === 0 ? (

          <h3 style={{textAlign:"center"}}>
            No products available
          </h3>

        ) : (

          <div style={styles.grid}>

            {
              Array.isArray(products) && products.map((product)=>(
                
                
                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))
            }

          </div>

        )
      }


    </div>

  );
}



const styles = {

  container:{
    padding:"40px"
  },

  title:{
    textAlign:"center",
    marginBottom:"30px"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:"25px"
  }

};


export default Products;