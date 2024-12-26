import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Your API key (replace with the actual key)
const apiKey = '12ba614bf4f8c9e9a49d7da26c717f60e2ac46c5425881a931aad4b7449d43a106a8cf256c0ccf971e5a16dba318ff85';  
// Example prompt
const promptData = 'sun';  // Replace with your desired prompt for image generation

// Prepare the data to be sent with the API request
const form = new FormData();
form.append('prompt', promptData);

// Make sure the boundary is included in the Content-Type
const headers = {
  'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
  'x-api-key': apiKey,  // Use the API key in the header
  ...form.getHeaders(),  // Include the headers required for FormData
};

axios.post('https://clipdrop-api.co/text-to-image/v1', form, { headers, responseType: 'arraybuffer' })
  .then(response => {
    // Save the image to a file (in this case, as 'generated_image.png')
    fs.writeFile('generated_image.png', response.data, (err) => {
      if (err) {
        console.error('Error saving the image:', err);
      } else {
        console.log('Image saved successfully as generated_image.png');
      }
    });
  })
  .catch(error => {
    console.error('Error during image generation:', error.response ? error.response.data : error.message);
  });
