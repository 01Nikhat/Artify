
import { response } from "express";
import userModel from "../models/userModel";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req,res) =>{
  try {
    const {userId,prompt} = req.body;

     const user = await userModel.findById(userId);

     if (!user || !prompt) {
      return res.json({success:false,message:'Missing Details'})
     }
     if (user.creditBalence === 0 || userModel.creditBalence < 0) {
      return res.json({success:false,message:'No Credit Balence',creditBalence:user.creditBalence})
     }

     //Creating multipart form data 

     const formData = new FormData()
     formData.append('prompt',prompt)

     const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType:'arraybuffer'
     })

     const base64Image = Buffer.from(data,'binary').toString('base64')

     const resultImage = `data:image/png;base64,${base64Image}`

     //deduct image credit

     await userModel.findByIdAndUpdate(user._id,{creditBalence:user.creditBalence - 1})
     res.json({success:true,message:'Image Generated',creditBalence:user.creditBalence - 1 , resultImage})

  } catch (error) {
    console.log(MessageChannel.error);
    
    res.json({success:false,message:error.message})
  }
}