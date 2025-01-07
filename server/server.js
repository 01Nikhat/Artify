// import express from "express";
// import cors from 'cors';
// import 'dotenv/config';
// import fs from 'fs';
// import path from 'path';
// import  connectDB from './config/mongodb.js';
// import userRouter from "./routes/userRoutes.js";
// import imageRouter from "./routes/imageRoutes.js";
// import bgImageRouter from "./routes/bgImageRoute.js";

// const PORT = process.env.PORT  || 4000
// const app = express()

// app.use(express.json())
// app.use(cors())


// // Ensure uploads directory exists
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// app.use('/api/user',userRouter);
// app.use('/api/image',imageRouter);
// app.use('/api', bgImageRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!', details: err.message });
// });

// await connectDB();

// app.get('/',(req, res) =>res.send("API working fine"));


// app.listen(PORT, ()=> console.log('server running on port ' + PORT));


import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import  connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import bgImageRouter from "./routes/bgImageRoute.js";
import { log } from "console";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//console.log('nikiiiiiiiiiiiiii' + __dirname);

dotenv.config({ path: path.join(__dirname, '.env') });
//console.log('Loading .env file from:', path.join(__dirname, '.env'));
const envPath = path.join(__dirname, '.env');


const PORT = process.env.PORT  || 4000
const app = express()

app.use(express.json())
app.use(cors())

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
//console.log(`Uploads directory: ${uploadsDir}`);

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.use('/api', bgImageRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

await connectDB();

app.get('/',(req, res) =>res.send("API working fine"));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('CLIPDROP_API key set:', !!process.env.CLIPDROP_API);
});

// Log all environment variables (be careful with this in production)
console.log('Environment variables:', process.env);

