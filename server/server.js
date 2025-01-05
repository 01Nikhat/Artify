import express from "express";
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import  connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import bgImageRouter from "./routes/bgImageRoute.js";

const PORT = process.env.PORT  || 4000
const app = express()

app.use(express.json())
app.use(cors())


// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.use('/api', bgImageRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

await connectDB();

app.get('/',(req, res) =>res.send("API working fine"));


app.listen(PORT, ()=> console.log('server running on port ' + PORT));