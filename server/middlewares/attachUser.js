import userModel from '../models/userModel.js'; // Adjust the path as needed

const attachUser = async (req, res, next) => {
  try {
    if (!req.body.userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in request",
      });
    }

    const user = await userModel.findById(req.body.userId);
    console.log("attachuser userid:" + user);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error attaching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default attachUser;

