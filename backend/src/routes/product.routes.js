
import express from "express";

import {
  createProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import Product from "../models/productSchema.js";

import { auth } from "../middleware/auth.js";
import { sellerOnly } from "../middleware/seller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// =====================================
// BUYER - GET ALL PRODUCTS
// =====================================
router.get(
  "/products",
  getProducts
);

router.get(
  "/products/:id",
  auth,
  async (req, res) => {
    try {
      const product =
        await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error(
        "GET SINGLE PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Unable to get product",
      });
    }
  }
);


router.get(
  "/my-products",
  auth,
  sellerOnly,
  getMyProducts
);


router.post(
  "/products",
  auth,
  sellerOnly,
  upload.single("image"),
  createProduct
);


router.put(
  "/products/:id",
  auth,
  sellerOnly,
  upload.single("image"),
  updateProduct
);


router.delete(
  "/products/:id",
  auth,
  sellerOnly,
  deleteProduct
);

export default router;

