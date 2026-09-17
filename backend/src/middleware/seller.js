export const sellerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "seller") {
    return res.status(403).json({
      success: false,
      message: "Seller account required.",
    });
  }

  next();
};