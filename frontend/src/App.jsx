import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:token" element={<Verify />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<h1>404 - SOlve th Erros Idiot</h1>} />
    </Routes>
  );
}

export default App;
