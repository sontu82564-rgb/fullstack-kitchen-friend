import { Routes, Route } from "react-router-dom";

// Customer
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";

// Seller
import SellerDashboard from "./pages/SellerDashboard";
import SellerOrders from "./pages/SellerOrders";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =====================
          PUBLIC
      ===================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/verify/:token"
        element={<VerifyEmail />}
      />

      <Route
        path="/verify-email/:token"
        element={<VerifyEmail />}
      />

      <Route
        path="/check-email"
        element={<CheckEmail />}
      />


      {/* =====================
          BUYER ONLY
      ===================== */}

      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout/:id"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* =====================
          SELLER ONLY
      ===================== */}

      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/add-product"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/products"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <MyProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <SellerOrders />
          </ProtectedRoute>
        }
      />


      {/* =====================
          404
      ===================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;

