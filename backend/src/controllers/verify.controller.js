import User from "../models/userSchema.js";
import PendingUser from "../models/pendingUserSchema.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing.",
      });
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({
      verificationToken: token,
    });

    if (!pendingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link.",
      });
    }

    // Check token expiry
    if (pendingUser.verificationTokenExpires < new Date()) {
      await PendingUser.deleteOne({ _id: pendingUser._id });

      return res.status(400).json({
        success: false,
        message: "Verification link has expired.",
      });
    }

    // Check if already registered
    const existingUser = await User.findOne({
      email: pendingUser.email,
    });

    if (existingUser) {
      await PendingUser.deleteOne({ _id: pendingUser._id });

      return res.status(400).json({
        success: false,
        message: "User already verified.",
      });
    }

    // Create verified user
    await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: pendingUser.role || "buyer",
      isVerified: true,
    });

    // Delete pending user
    await PendingUser.deleteOne({
      _id: pendingUser._id,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Verification failed.",
      error: error.message,
    });
  }
};