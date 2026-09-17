import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

/*
==================================================
ADD PRODUCT TO CART
POST /user/cart
==================================================
*/
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const requestedQuantity = Number(quantity);

    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    if (requestedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available`,
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId.toString()
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + requestedQuantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available`,
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity: requestedQuantity,
      });
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      select:
        "productName category description price stock image seller",
    });

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add product to cart",
      error: error.message,
    });
  }
};

/*
==================================================
GET CART
GET /user/cart
==================================================
*/
export const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    }).populate({
      path: "items.product",
      select:
        "productName category description price stock image seller",
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get cart",
      error: error.message,
    });
  }
};

/*
==================================================
UPDATE CART QUANTITY
PUT /user/cart/:productId
==================================================
*/
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const newQuantity = Number(quantity);

    if (
      !Number.isInteger(newQuantity) ||
      newQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available`,
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (cartItem) =>
        cartItem.product.toString() ===
        productId.toString()
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product is not in your cart",
      });
    }

    item.quantity = newQuantity;

    await cart.save();

    await cart.populate({
      path: "items.product",
      select:
        "productName category description price stock image seller",
    });

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart,
    });
  } catch (error) {
    console.error(
      "UPDATE CART QUANTITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update cart",
      error: error.message,
    });
  }
};

/*
==================================================
REMOVE PRODUCT FROM CART
DELETE /user/cart/:productId
==================================================
*/
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !==
        productId.toString()
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: "Product is not in your cart",
      });
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      select:
        "productName category description price stock image seller",
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error(
      "REMOVE FROM CART ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to remove product from cart",
      error: error.message,
    });
  }
};

/*
==================================================
CLEAR CART
DELETE /user/cart
==================================================
*/
export const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is already empty",
        cart: {
          user: userId,
          items: [],
        },
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to clear cart",
      error: error.message,
    });
  }
};

