import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

export const removeBackground = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path), req.file.originalname);

    const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': "12ba614bf4f8c9e9a49d7da26c717f60e2ac46c5425881a931aad4b7449d43a106a8cf256c0ccf971e5a16dba318ff85",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`ClipDrop API error: ${response.statusText}`);
    }

    const buffer = await response.buffer();
    
    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error removing background:', error);
    res.status(500).json({ error: 'Error removing background' });
  }
};

