
export const buyerOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    if (req.user.role !== "buyer") {
      return res.status(403).json({
        success: false,
        message: "Buyer account required.",
      });
    }

    next();
  } catch (error) {
    console.error("BUYER MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};

