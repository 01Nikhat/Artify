import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
//for register controller 
const registerUser = async(req,res) =>{
  try {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.json({success:false, message: 'Missing Details'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData = {
      name,
      email,
      password:hashedPassword
    }

   const newUser = new userModel(userData);
   const user = await newUser.save()

   const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

   res.json({success:true, token, user: {name:user.name}})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
    
  }
}
//for login controller 
const loginUser = async (req,res) =>{
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
      return res.json({success:false,message:"user does not exist"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (isMatch) {
      const  token = jwt.sign({id:user._id},process.env.JWT_SECRET)

      return res.json({success:true,token,user:{name:user.name}})

    }else{
      return res.json({success:false,message:"invalid credential"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
  }
}
//for usercredit controller

// const userCredits = async (req,res) =>{

//   try {
//     const {userId} = req.body;

//     const user = await userModel.findById(userId)
//     res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
//      console.log('credit balance'+ user.creditBalance);
//   } catch (error) {
//     console.log(error.message);
//     res.json({success:false, message: error.message})
//   }
// }

//user ccredits method 
// const userCredits = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await userModel.findById(userId);

//     // Include creditBalance in the user object
//     res.json({
//       success: true,
//       credits: user.creditBalance,
//       user: {
//         name: user.name,
//       },
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

//updated usercrdits method
const userCredits = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        name: user.name,
        credits: user.creditBalance,
      },
    });
    console.log('credit balance'+ user.creditBalance);
    
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
    console.log("error on usercontroller of usercredits catch part");
    
  }
};

//razorpay method 

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const paymentRazorpay = async(req,res) =>{
//   try {
//     const {userId, planId} = req.body;

//     const userData = await userModel.findById(userId);

//     if (!userId || !planId) {
//       return res.json({success:false,message:"missing details!"})
//     }
//     let credits,plan,amount,date
//     switch (planId) {
//       case 'Basic':
//         plan = 'Basic'
//         credits = 100
//         amount = 10
//         break;
      
//         case 'Advanced':
//         plan = 'Advanced'
//         credits = 500
//         amount = 50
//         break;

//         case 'Business':
//           plan = 'Business'
//           credits = 5000
//           amount = 250
//           break;
        
    
//       default:
//         return res.json({success:false,message:"Plan not Fond"});
       
//     }
//     //for getting date data 
//     date = Date.now();

//     const transactionData = {
//       userId, plan, amount,credits,date
//     }
    

//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message})
    
//   }
// }

export {registerUser,loginUser,userCredits} 