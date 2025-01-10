

// import express from "express";
// import cors from 'cors';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import  connectDB from './config/mongodb.js';
// import userRouter from "./routes/userRoutes.js";
// import imageRouter from "./routes/imageRoutes.js";
// import bgImageRouter from "./routes/bgImageRoute.js";
// import { log } from "console";
// import transactionRouter from "./routes/transactionRoute.js";

// // Get the directory name of the current module
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// //console.log('nikiiiiiiiiiiiiii' + __dirname);

// dotenv.config({ path: path.join(__dirname, '.env') });
// //console.log('Loading .env file from:', path.join(__dirname, '.env'));
// const envPath = path.join(__dirname, '.env');


// // Only log these in development
// if (process.env.NODE_ENV === 'development') {
//   console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
//   console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '[SET]' : '[NOT SET]');
// }

// const PORT = process.env.PORT  || 4000
// const app = express()

// app.use(express.json())
// app.use(cors())

// // Ensure uploads directory exists
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// //console.log(`Uploads directory: ${uploadsDir}`);

// app.use('/api/user',userRouter);
// app.use('/api/image',imageRouter);
// app.use('/api', bgImageRouter);
// app.use('/api/transaction', transactionRouter); // Add the transaction router


// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   console.error('Stack:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!', details: err.message });
// });

// await connectDB();

// app.get('/',(req, res) =>res.send("API working fine"));

// app.listen(PORT, () => {
//   console.log('Server running on port ' + PORT);
//   console.log('Environment:', process.env.NODE_ENV);
//   console.log('CLIPDROP_API key set:', !!process.env.CLIPDROP_API);
//   console.log('RAZORPAY_KEY_ID set:', !!process.env.RAZORPAY_KEY_ID);
//   console.log('RAZORPAY_KEY_SECRET set:', !!process.env.RAZORPAY_KEY_SECRET);
// });

// // Log all environment variables (be careful with this in production)
// console.log('Environment variables:', process.env);



// import express from "express";
// import cors from 'cors';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import connectDB from './config/mongodb.js';
// import userRouter from "./routes/userRoutes.js";
// import imageRouter from "./routes/imageRoutes.js";
// import bgImageRouter from "./routes/bgImageRoute.js";
// import transactionRouter from "./routes/transactionRoute.js";

// // Get the directory name of the current module
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Configure dotenv
// const envPath = path.join(__dirname, '.env');
// dotenv.config({ path: envPath });

// // Set NODE_ENV if not set
// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = 'development';
// }

// console.log('Current working directory:', process.cwd());
// console.log('__dirname:', __dirname);
// console.log('Environment:', process.env.NODE_ENV);
// console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
// console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '[SET]' : '[NOT SET]');

// const PORT = process.env.PORT || 4000;
// const app = express();

// app.use(express.json());
// app.use(cors());

// // Ensure uploads directory exists
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// console.log(`Uploads directory: ${uploadsDir}`);

// app.use('/api/user', userRouter);
// app.use('/api/image', imageRouter);
// app.use('/api', bgImageRouter);
// app.use('/api/transaction', transactionRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   console.error('Stack:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!', details: err.message });
// });

// await connectDB();

// app.get('/', (req, res) => res.send("API working fine"));

// app.listen(PORT, () => {
//   console.log('Server running on port ' + PORT);
//   console.log('Environment:', process.env.NODE_ENV);
//   console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
//   console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '[SET]' : '[NOT SET]');
// });




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
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

console.log('CORS configuration:', {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
  console.log('Server running on port ' + PORT);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
  console.log('RAZORPAY_KEY_ID set:', !!process.env.RAZORPAY_KEY_ID);
  console.log('RAZORPAY_KEY_SECRET set:', !!process.env.RAZORPAY_KEY_SECRET);
});

