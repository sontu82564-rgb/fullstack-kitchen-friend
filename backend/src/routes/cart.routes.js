import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

import { auth } from "../middleware/auth.js";
import { buyerOnly } from "../middleware/buyer.js";

const router = express.Router();


router.post(
  "/cart",
  auth,
  buyerOnly,
  addToCart
);

/*
========================================
GET CART
GET /user/cart
========================================
*/
router.get(
  "/cart",
  auth,
  buyerOnly,
  getCart
);

/*
========================================
UPDATE CART QUANTITY
PUT /user/cart/:productId
========================================
*/
router.put(
  "/cart/:productId",
  auth,
  buyerOnly,
  updateCartQuantity
);

/*
========================================
REMOVE PRODUCT FROM CART
DELETE /user/cart/:productId
========================================
*/
router.delete(
  "/cart/:productId",
  auth,
  buyerOnly,
  removeFromCart
);

/*
========================================
CLEAR CART
DELETE /user/cart
========================================
*/
router.delete(
  "/cart",
  auth,
  buyerOnly,
  clearCart
);

export default router;

