

import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req,res) =>{
  try {
    const {userId,prompt} = req.body;
      console.log("userid:" + userId);
      console.log("prompt data: "+ prompt);
      
      
     const user = await userModel.findById(userId);
      console.log("user value on imagecontroller :" + user);
      
     if (!user || !prompt) {
      return res.json({success:false,message:'Missing Details'})
     }
     console.log("user,creditbalance on imagecontroller: "+ user.creditBalance);
     
     if (user.creditBalance  <= 0) {
      return res.json({success:false,message:'No Credit Balence',creditBalance:user.creditBalance})
     }

     //Creating multipart form data 

     const formData = new FormData()
     formData.append('prompt',prompt)
     console.log('API Key:', process.env.CLIPDROP_API);

     const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
      headers: {
       
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType:'arraybuffer'
     })
     console.log("data succcess value on imagecontroller :"+ data.success + {data});
     
     const base64Image = Buffer.from(data,'binary').toString('base64')

     const resultImage = `data:image/png;base64,${base64Image}`
     console.log("resultImage :"+ resultImage);
     

     //deduct image credit

     await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})
     res.json({success:true,message:'Image Generated',creditBalance:user.creditBalance - 1 , resultImage});

  } catch (error) {
    console.log(error.message);
    console.log("error on imagecontroller");

    
    res.json({success:false,message:error.message})
  }
}

