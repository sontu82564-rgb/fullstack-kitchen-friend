import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
     
    role: {
      type:String,
      enum:["buyer","seller"],
      default:"buyer",
    },

    verificationToken: {
      type: String,
      required: true,
      index: true,
    },

    verificationTokenExpires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError
const PendingUser =
  mongoose.models.PendingUser ||
  mongoose.model("PendingUser", pendingUserSchema);

export default PendingUser;