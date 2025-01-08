import Razorpay from 'razorpay';
import crypto from 'crypto';
import transactionModel from '../models/transactionModel.js';
import userModel from '../models/userModel.js';

console.log('Initializing Razorpay in transactionController');
console.log('RAZORPAY_KEY_ID:', "rzp_test_RsuMzhkOoUgPsq");
console.log('RAZORPAY_KEY_SECRET:', "7BPcW14FuwoZcZFj31IETkPj" ? '[SET]' : '[NOT SET]');

const razorpay = new Razorpay({
  key_id: "rzp_test_RsuMzhkOoUgPsq",
  key_secret: "7BPcW14FuwoZcZFj31IETkPj"
});

export const createOrder = async (req, res) => {
  try {
    const { amount, plan, credits } = req.body;
    console.log('Creating order with amount:', amount, 'plan:', plan, 'credits:', credits);
    console.log('User object:', req.user); // Log the user object

    if (!req.user || !req.user.id) {
      console.error('User not authenticated or user ID not available');
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`
    };

    console.log('Razorpay order options:', options);

    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);

    const transaction = new transactionModel({
      userId: req.user.id,
      plan,
      amount,
      credits,
      date: Date.now(),
      orderId: order.id
    });

    await transaction.save();
    console.log('Transaction saved:', transaction);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error details:', error.response ? error.response.data : 'No additional details');
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order', 
      details: error.message,
      razorpayError: error.response ? error.response.data : null
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const transaction = await transactionModel.findOne({ orderId: razorpay_order_id });
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }

      transaction.payment = true;
      await transaction.save();

      const user = await userModel.findById(transaction.userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.creditBalance += transaction.credits;
      await user.save();

      res.json({
        success: true,
        message: 'Payment verified successfully',
        credits: user.creditBalance
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Error verifying payment', details: error.message });
  }
};

