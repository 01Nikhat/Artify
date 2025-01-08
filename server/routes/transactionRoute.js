import express from 'express';
import { createOrder, verifyPayment } from '../controllers/transactionController.js';
import transactionMiddleware from "../middlewares/transactionMiddleware.js";

const router = express.Router();

// Use transaction middleware for both routes
router.post("/create-order", transactionMiddleware, createOrder);
router.post("/verify-payment", transactionMiddleware, verifyPayment);
export default router;

