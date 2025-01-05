import express from 'express'
import { removeBackground } from '../controllers/bgImgaeController.js'
import upload from '../middlewares/multer.js'
import userAuth from '../middlewares/auth.js'


const bgImageRouter = express.Router()

bgImageRouter.post('/remove-bg', upload.single('image'), removeBackground);

export default bgImageRouter;