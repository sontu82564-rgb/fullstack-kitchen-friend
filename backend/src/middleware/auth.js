import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const auth = async (req, res, next) => {
  try {

    let token = req.cookies.token;

    // Read Authorization header if cookie is missing
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.secretKey
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
};