import express from "express";
import { verifyEmail } from "../controllers/verify.controller.js";

const router = express.Router();

router.get("/verify/:token", verifyEmail);

export default router;