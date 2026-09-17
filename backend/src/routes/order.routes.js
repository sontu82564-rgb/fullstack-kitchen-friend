import express from "express";

import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateSellerOrderStatus,
} from "../controllers/order.controller.js";

import { auth } from "../middleware/auth.js";
import { buyerOnly } from "../middleware/buyer.js";
import { sellerOnly } from "../middleware/seller.js";

const router = express.Router();

/*
BUYER
*/

router.post(
  "/orders",
  auth,
  buyerOnly,
  createOrder
);

router.get(
  "/orders",
  auth,
  buyerOnly,
  getMyOrders
);

/*
SELLER
*/

router.get(
  "/seller/orders",
  auth,
  sellerOnly,
  getSellerOrders
);

router.put(
  "/seller/orders/:id/status",
  auth,
  sellerOnly,
  updateSellerOrderStatus
);

export default router;

