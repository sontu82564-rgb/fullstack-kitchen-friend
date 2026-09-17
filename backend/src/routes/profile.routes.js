import express from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", auth, getProfile);

export default router;