// import mongoose from "mongoose";
// // transaction database scema 
// const transactionSchema = new mongoose.Schema({
//   userId : {type: String, required: true},
//   plan : {type: String, required: true},
//   amount : {type: Number, required: true},
//   credits : {type: Number, required: true},
//   payment : {type: Boolean, default: false},
//   date : {type: Number},
// })

// //it will search for user is availble or not if not true then go for second operation mongoose.model("transaction",transactionSchema) and create new user 
// const transactionModel =mongoose.models.transaction || mongoose.model("transaction",transactionSchema)

// export default transactionModel;