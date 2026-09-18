import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get logged-in user's profile
router.get(
  "/profile",
  auth,
  getProfile
);

// Update logged-in user's profile
router.put(
  "/profile",
  auth,
  updateProfile
);

export default router;

