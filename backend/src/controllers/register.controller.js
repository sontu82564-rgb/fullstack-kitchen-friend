import crypto from "crypto";
import User from "../models/userSchema.js";
import PendingUser from "../models/pendingUserSchema.js";
import { verifyMail } from "../utils/verifyMail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Remove previous pending registration (if any)
    await PendingUser.deleteOne({
      email: email.toLowerCase(),
    });

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    const tokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Save pending user
    // await PendingUser.create({
    //   name,
    //   email: email.toLowerCase(),
    //   password,
    //   role: role || "buyer",
    //   verificationToken: token,
    //   verificationTokenExpires: tokenExpires,
    // });

    // Send verification email
    await verifyMail(token, email);

    return res.status(201).json({
      success: true,
      message: "Please click the link to verify to account.",
    });

  } catch (error) {

    console.error("========== REGISTER ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
  
};