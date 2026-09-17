import mongoose from "mongoose";

import Order from "../models/order.Schema.js";
import Product from "../models/productSchema.js";

/*
==================================================
CREATE ORDER
POST /user/orders
==================================================
*/
export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const {
      items,
      shippingAddress,
      paymentMethod = "COD",
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your order must contain at least one product",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const requiredAddressFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    for (const field of requiredAddressFields) {
      if (
        !shippingAddress[field] ||
        !String(shippingAddress[field]).trim()
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    if (paymentMethod !== "COD") {
      return res.status(400).json({
        success: false,
        message: "Only Cash on Delivery is currently supported",
      });
    }

    const orderItems = [];

    let subtotal = 0;

    /*
    ------------------------------------------
    CHECK PRODUCTS AND STOCK
    ------------------------------------------
    */

    for (const item of items) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await Product.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "One of the products was not found",
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} units of ${product.productName} are available`,
        });
      }

      const itemTotal = product.price * quantity;

      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        productName: product.productName,
        price: product.price,
        quantity,
        image: product.image || "",
      });
    }

    /*
    ------------------------------------------
    DELIVERY CHARGE
    ------------------------------------------
    */

    const deliveryCharge = 40;

    const totalAmount =
      subtotal + deliveryCharge;

    /*
    ------------------------------------------
    REDUCE STOCK
    ------------------------------------------
    */

    for (const item of orderItems) {
      const updatedProduct =
        await Product.findOneAndUpdate(
          {
            _id: item.product,
            stock: {
              $gte: item.quantity,
            },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            new: true,
          }
        );

      if (!updatedProduct) {
        return res.status(400).json({
          success: false,
          message: `Stock changed for ${item.productName}. Please try again.`,
        });
      }
    }

    /*
    ------------------------------------------
    CREATE ORDER
    ------------------------------------------
    */

    const order = await Order.create({
      user: userId,

      items: orderItems,

      shippingAddress: {
        fullName:
          String(
            shippingAddress.fullName
          ).trim(),

        phone:
          String(
            shippingAddress.phone
          ).trim(),

        address:
          String(
            shippingAddress.address
          ).trim(),

        city:
          String(
            shippingAddress.city
          ).trim(),

        state:
          String(
            shippingAddress.state
          ).trim(),

        pincode:
          String(
            shippingAddress.pincode
          ).trim(),
      },

      subtotal,

      deliveryCharge,

      totalAmount,

      paymentMethod: "COD",

      paymentStatus: "Pending",

      orderStatus: "Pending",
    });

    /*
    ------------------------------------------
    RESPONSE
    ------------------------------------------
    */

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to place order",
      error: error.message,
    });
  }
};

/*
==================================================
GET BUYER ORDERS
GET /user/orders
==================================================
*/
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const orders = await Order.find({
      user: userId,
    })
      .populate(
        "items.product",
        "productName category price stock image"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "GET MY ORDERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your orders",
      error: error.message,
    });
  }
};

/*
==================================================
GET SELLER ORDERS
GET /user/seller/orders
==================================================
*/
export const getSellerOrders = async (
  req,
  res
) => {
  try {
    const sellerId =
      req.user?.id || req.user?._id;

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    /*
    ------------------------------------------
    FIND ORDERS CONTAINING SELLER PRODUCTS
    ------------------------------------------
    */

    const sellerProducts =
      await Product.find({
        seller: sellerId,
      }).select("_id");

    const sellerProductIds =
      sellerProducts.map(
        (product) => product._id
      );

    const orders = await Order.find({
      "items.product": {
        $in: sellerProductIds,
      },
    })
      .populate(
        "user",
        "name email"
      )
      .populate(
        "items.product",
        "productName category price stock image seller"
      )
      .sort({
        createdAt: -1,
      });

    /*
    ------------------------------------------
    RETURN ONLY SELLER'S ITEMS
    ------------------------------------------
    */

    const sellerOrders = orders.map(
      (order) => {
        const sellerItems =
          order.items.filter((item) => {
            return (
              item.product &&
              item.product.seller &&
              item.product.seller.toString() ===
                sellerId.toString()
            );
          });

        return {
          ...order.toObject(),

          items: sellerItems,
        };
      }
    );

    return res.status(200).json({
      success: true,
      orders: sellerOrders,
    });
  } catch (error) {
    console.error(
      "GET SELLER ORDERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch seller orders",
      error: error.message,
    });
  }
};

/*
==================================================
UPDATE SELLER ORDER STATUS
PUT /user/seller/orders/:id/status
==================================================
*/
export const updateSellerOrderStatus =
  async (req, res) => {
    try {
      const sellerId =
        req.user?.id || req.user?._id;

      const { id } = req.params;

      const { orderStatus } = req.body;

      if (!sellerId) {
        return res.status(401).json({
          success: false,
          message: "Please login first",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(
          orderStatus
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      const order =
        await Order.findById(id).populate(
          "items.product",
          "seller productName"
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      /*
      ------------------------------------------
      CHECK SELLER OWNS AT LEAST ONE ITEM
      ------------------------------------------
      */

      const sellerOwnsItem =
        order.items.some((item) => {
          return (
            item.product &&
            item.product.seller &&
            item.product.seller.toString() ===
              sellerId.toString()
          );
        });

      if (!sellerOwnsItem) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to update this order",
        });
      }

      order.orderStatus = orderStatus;

      await order.save();

      return res.status(200).json({
        success: true,
        message:
          "Order status updated successfully",
        order,
      });
    } catch (error) {
      console.error(
        "UPDATE SELLER ORDER STATUS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update order status",
        error: error.message,
      });
    }
  };

