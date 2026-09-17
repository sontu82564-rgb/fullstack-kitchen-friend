import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import registerRoutes from "./src/routes/register.routes.js";
import loginRoutes from "./src/routes/login.routes.js";
import verifyRoutes from "./src/routes/verify.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

const app = express();

/*
==================================================
PATH SETUP
==================================================
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
==================================================
CORS
==================================================
*/

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/*
==================================================
MIDDLEWARE
==================================================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
==================================================
STATIC UPLOADS
==================================================
*/

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/*
==================================================
MONGODB
==================================================
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log(
      "Database:",
      mongoose.connection.name
    );
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error.message
    );
  });

/*
==================================================
API ROUTES
==================================================
*/

// AUTH
app.use("/user", registerRoutes);
app.use("/user", loginRoutes);
app.use("/user", verifyRoutes);

// PROFILE
app.use("/user", profileRoutes);

// PRODUCTS
app.use("/user", productRoutes);

// CART
app.use("/user", cartRoutes);

// ORDERS
app.use("/user", orderRoutes);

/*
==================================================
TEST ROUTE
==================================================
*/

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Kitchen Friend backend is running",
  });
});

/*
==================================================
404 HANDLER
==================================================
*/

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/*
==================================================
GLOBAL ERROR HANDLER
==================================================
*/

app.use((error, req, res, next) => {
  console.error("GLOBAL SERVER ERROR:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

/*
==================================================
START SERVER
==================================================
*/

const PORT = 9003;

app.listen(PORT, () => {
  console.log(
    `Kitchen Friend backend running on http://localhost:${PORT}`
  );
});

