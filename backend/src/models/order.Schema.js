import mongoose from "mongoose";

/*
==================================================
ORDER ITEM SCHEMA
==================================================
*/

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    /*
    Store the product image at the time
    the order is created.
    */
    image: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

/*
==================================================
ORDER SCHEMA
==================================================
*/

const orderSchema = new mongoose.Schema(
  {
    /*
    Buyer who created the order
    */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /*
    Products inside the order
    */
    items: {
      type: [orderItemSchema],
      required: true,

      validate: {
        validator: function (items) {
          return items.length > 0;
        },

        message:
          "Order must contain at least one item",
      },
    },

    /*
    Shipping information
    */
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    /*
    Price calculation
    */
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryCharge: {
      type: Number,
      required: true,
      min: 0,
      default: 40,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    /*
    Payment
    */
    paymentMethod: {
      type: String,

      enum: ["COD"],

      default: "COD",
    },

    paymentStatus: {
      type: String,

      enum: [
        "Pending",
        "Paid",
      ],

      default: "Pending",
    },

    /*
    Order status
    */
    orderStatus: {
      type: String,

      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],

      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

/*
==================================================
CREATE MODEL
==================================================
*/

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;


