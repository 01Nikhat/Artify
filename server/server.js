



import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import bgImageRouter from "./routes/bgImageRoute.js";
import transactionRouter from "./routes/transactionRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://artify-clients.onrender.com" || '',
  credentials: true,
}));

console.log('CORS configuration:', {
  origin:  'https://artify-clients.onrender.com',
  credentials: true,
});

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api', bgImageRouter);
app.use('/api/transaction', transactionRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

await connectDB();

app.get('/', (req, res) => {
  res.send("API working fine");
  console.log('Received request on root path');
});

app.listen(PORT, () => {
  //console.log('Server running on port ' + PORT);
  //console.log('Environment:', process.env.NODE_ENV);
 // console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
 // console.log('RAZORPAY_KEY_ID set:', !!process.env.RAZORPAY_KEY_ID);
 // console.log('RAZORPAY_KEY_SECRET set:', !!process.env.RAZORPAY_KEY_SECRET);
});

