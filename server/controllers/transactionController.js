

import Razorpay from "razorpay";
import crypto from "crypto";
import transactionModel from "../models/transactionModel.js";
import userModel from "../models/userModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RsuMzhkOoUgPsq",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "7BPcW14FuwoZcZFj31IETkPj"
});

export const createOrder = async (req, res) => {
  console.log("Creating order. Request body:", req.body);
  console.log("User:", req.user);
  try {
    const { amount, plan, credits } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created:", order);

    const transaction = new transactionModel({
      userId: req.user.id,
      plan,
      amount,
      credits,
      date: Date.now(),
      orderId: order.id,
    });

    const savedTransaction = await transaction.save();
    console.log("Transaction saved:", savedTransaction);

    // Double-check if the transaction was saved
    const checkTransaction = await transactionModel.findOne({ orderId: order.id });
    if (!checkTransaction) {
      console.error("Transaction not found immediately after saving. This shouldn't happen.");
    } else {
      console.log("Transaction found after saving:", checkTransaction);
    }

    res.json({ success: true, order, key: razorpay.key_id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
};



export const verifyPayment = async (req, res) => {
  try {
    console.log("Verifying payment. Request body:", req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("razorpay order id :"+razorpay_order_id);
    
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Add a delay before querying the database
      await new Promise(resolve => setTimeout(resolve, 2000));

      const transaction = await transactionModel.findOne({ orderId: razorpay_order_id });
      if (!transaction) {
        console.error("Transaction not found for order:", razorpay_order_id);
        const allTransactions = await transactionModel.find({}).sort({ date: -1 }).limit(2).lean();
        console.log("Last 2 transactions in the database:", JSON.stringify(allTransactions, null, 2));
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }
      console.log("transaction.payment value :"+ transaction.payment);
      
      if (transaction.payment) {
        console.log("Transaction already marked as paid:", transaction);
        return res.json({ success: true, message: "Payment already verified", credits: req.user.creditBalance });
      }

      transaction.payment = true;
      transaction.razorpayPaymentId = razorpay_payment_id;
      await transaction.save();
      console.log("Transaction updated:", transaction);

      const user = await userModel.findById(transaction.userId);
      if (!user) {
        console.error("User not found for transaction:", transaction);
        return res.status(404).json({ success: false, message: "User not found" });
      }

      user.creditBalance += transaction.credits;
      await user.save();
      console.log("User credits updated:", user.creditBalance);

      res.json({ success: true, message: "Payment verified", credits: user.creditBalance });
    } else {
      console.error("Invalid signature");
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
  }
};





