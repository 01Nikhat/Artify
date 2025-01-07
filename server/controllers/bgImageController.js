// import fetch from 'node-fetch';
// import FormData from 'form-data';
// import fs from 'fs';

// export const removeBackground = async (req, res) => {
//   try {
    
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file uploaded' });
//     }

//     const formData = new FormData();
//     formData.append('image_file', fs.createReadStream(req.file.path), req.file.originalname);

//     const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
//       method: 'POST',
//       headers: {
//         'x-api-key': "12ba614bf4f8c9e9a49d7da26c717f60e2ac46c5425881a931aad4b7449d43a106a8cf256c0ccf971e5a16dba318ff85",
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`ClipDrop API error: ${response.statusText}`);
//     }

//     const buffer = await response.buffer();
    
//     // Clean up the temporary file
//     fs.unlinkSync(req.file.path);

//     res.set('Content-Type', 'image/png');
//     res.send(buffer);
   
//   } catch (error) {
//     console.error('Error removing background:', error);
//     res.status(500).json({ error: 'Error removing background' });
//   }
// };

import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

export const removeBackground = async (req, res) => {
  try {
    const user = req.user;
    console.log("user value on bgimagecontroller:", user);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log("user.creditBalance on bgimagecontroller:", user.creditBalance);

    if (user.creditBalance <= 0) {
      return res.status(403).json({ success: false, message: 'Insufficient credit balance', creditBalance: user.creditBalance });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    console.log("File received:", req.file);

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path), req.file.originalname);


    console.log("Sending request to ClipDrop API...");
    console.log("CLIPDROP_API key:", process.env.CLIPDROP_API); // Log the API key (be careful in production)
    const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      body: formData,
    });

    console.log("ClipDrop API response status:", response.status);

    if (!response.ok) {
      throw new Error(`ClipDrop API error: ${response.statusText}`);
    }

    const buffer = await response.buffer();
    console.log("Received buffer from ClipDrop API, length:", buffer.length);
    
    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    // Deduct credit balance
    user.creditBalance -= 1;
    await user.save();
    console.log("Updated user credit balance:", user.creditBalance);

    res.set('Content-Type', 'image/png');
    res.status(200).json({
      success: true,
      message: 'Background removed successfully',
      image: buffer.toString('base64'),
      creditBalance: user.creditBalance
    });
    console.log("Response sent to client");
  } catch (error) {
    console.error('Error removing background:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error removing background', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

