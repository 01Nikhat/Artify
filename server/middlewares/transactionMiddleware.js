import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const transactionMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing or incorrectly formatted",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // Attach user to request
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in transactionMiddleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      details: error.message,
    });
  }
};

export default transactionMiddleware;
