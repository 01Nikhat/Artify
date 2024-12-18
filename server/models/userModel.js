import mongoose from "mongoose";
// user database scema 
const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true,unique:true},
  password:{type:String,required:true},
  creditBalance:{type:Number,default:5},
})

//it will search for user is availble or not if not true then go for second operation mongoose.model("user",userSchema) and create new user 
const userModel =mongoose.models.user || mongoose.model("user",userSchema)

export default userModel;