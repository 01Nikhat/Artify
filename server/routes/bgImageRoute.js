import express from 'express';
import { removeBackground } from '../controllers/bgImageController.js';
import upload from '../middlewares/multer.js';
import userAuth from '../middlewares/auth.js';
import attachUser from '../middlewares/attachUser.js';

const router = express.Router();

router.post('/remove-bg', userAuth, attachUser, upload.single('image'), removeBackground);

export default router;

