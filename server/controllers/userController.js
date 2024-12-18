import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
//     res.json({success:true,credits:user.creditbBalance,user:{name:user.name}})
//   } catch (error) {
//     console.log(error.message);
//     res.json({success:false, message: error.message})
//   }
// }
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    // Include creditBalance in the user object
    res.json({
      success: true,
      user: {
        name: user.name,
        credits: user.creditBalance, // Assuming `creditBalance` exists in your user schema
      },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export {registerUser,loginUser,userCredits} 