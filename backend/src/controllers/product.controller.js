import Product from "../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const {
      productName,
      category,
      description,
      price,
      stock,
    } = req.body;

    if (
      !productName ||
      !category ||
      !description ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All product details are required",
      });
    }

    const image = req.file
      ? "/uploads/" + req.file.filename
      : "";

    const product = await Product.create({
      seller: userId,
      productName: productName.trim(),
      category: category.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock),
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to add product",
      error: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      seller: userId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      req.body.productName !== undefined &&
      req.body.productName.trim() !== ""
    ) {
      product.productName =
        req.body.productName.trim();
    }

    if (
      req.body.category !== undefined &&
      req.body.category.trim() !== ""
    ) {
      product.category =
        req.body.category.trim();
    }

    if (
      req.body.description !== undefined &&
      req.body.description.trim() !== ""
    ) {
      product.description =
        req.body.description.trim();
    }

    if (
      req.body.price !== undefined &&
      req.body.price !== ""
    ) {
      product.price = Number(req.body.price);
    }

    if (
      req.body.stock !== undefined &&
      req.body.stock !== ""
    ) {
      product.stock = Number(req.body.stock);
    }

    if (req.file) {
      product.image =
        "/uploads/" + req.file.filename;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      seller: userId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate(
        "seller",
        "name email"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products",
      error: error.message,
    });
  }
};
export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const products = await Product.find({
      seller: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(
      "GET MY PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your products",
      error: error.message,
    });
  }
};
