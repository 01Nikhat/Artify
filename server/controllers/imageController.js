

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
     
     if (user.creditBalance  === 0 || user.creditBalance < 0) {
      return res.json({success:false,message:'No Credit Balence',creditBalance:user.creditBalance})
     }

     //Creating multipart form data 

     const formData = new FormData()
     console.log("form data" + formData.getBuffer());
     
     formData.append('prompt',prompt)
     console.log('API Key:', process.env.CLIPDROP_API);

     const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
      
      headers: {
       
        'x-api-key': "6750ffddbc6d34182996ddafbeaccfda7cb839923064e81a41de636970ddb7813bc187e28486ba0325d9e81f15b4bb27",
        
      },
      responseType:'arraybuffer'
     })
     console.log("data succcess value on imagecontroller :"+ data.success + {data});
     
     const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;
     console.log("resultImage :"+ resultImage);
     

     //deduct image credit

     await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})
     res.json({success:true,message:'Image Generated',creditBalance:user.creditBalance - 1 , resultImage});

  } catch (error) {
    console.log(error.message);
    console.log("error on imagecontroller");
    console.error('Error response:', error.response?.data || error.message);
    res.json({ success: false, message: error.message });
  }
}


