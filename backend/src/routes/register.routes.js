import express from "express";
import { register } from "../controllers/register.controller.js";
import axios from 'axios'


const router = express.Router();

router.post("/register", register);

export default router;