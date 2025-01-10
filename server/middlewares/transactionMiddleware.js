import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const transactionMiddleware = async (req, res, next) => {
  try {
    console.log("Transaction middleware. Headers:", req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing or incorrectly formatted",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    console.log("User attached to request:", req.user);
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



// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// const transactionMiddleware = async (req, res, next) => {
//   try {
//     // Extract token from Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization header is missing or incorrectly formatted",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     // Check if JWT_SECRET is defined
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         success: false,
//         message: "JWT_SECRET is not configured on the server",
//       });
//     }

//     // Verify token and extract payload
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       const errorMessage =
//         err.name === "TokenExpiredError"
//           ? "Token has expired"
//           : "Invalid token";
//       return res.status(401).json({
//         success: false,
//         message: errorMessage,
//       });
//     }

//     if (!decodedToken.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token payload",
//       });
//     }

//     // Attach user to request
//     const user = await userModel.findById(decodedToken.id).select(
//       "name email creditBalance"
//     ); // Retrieve only required fields
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in transactionMiddleware:", {
//       message: error.message,
//       stack: error.stack,
//       ip: req.ip,
//       route: req.originalUrl,
//     });

//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       details: error.message,
//     });
//   }
// };

// export default transactionMiddleware;
