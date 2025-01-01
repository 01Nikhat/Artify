import jwt from 'jsonwebtoken';


const userAuth = async(req,res,next) => {
  const {token} = req.headers;

   // Log token to verify it's correctly passed
   console.log("Received Token:", token);

  if (!token) {
    return res.json({success:false,message: 'Not Authorised.Login Again'});

  }
  try {
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    }else{
      return res.json({success:false,message: 'Not Authorised.Login Again'});

    }
    next();
  } catch (error) {
    console.log("samiul");
    console.log("Received Headers:", req.headers);

    res.json({success:false,message:error.message});
  }
}

export default userAuth;




//import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   try {
//     // Extract the authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization header is missing or incorrectly formatted",
//       });
//     }

//     // Split and extract the token
//     const token = authHeader.split(" ")[1];
//     console.log("Extracted Token:", token);

//     // Verify the token
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", tokenDecode);

//     if (!tokenDecode.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token payload",
//       });
//     }

//     // Attach user ID to the request
//     req.body.userId = tokenDecode.id;

//     next(); // Proceed to the next middleware or route
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);
//     return res.status(401).json({
//       success: false,
//       message: "Token verification failed",
//     });
//   }
// };

//export default userAuth;
