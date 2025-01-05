// import React from 'react'
// import { assets } from '../assets/assets'

// const BgResult = () => {
  
//   return (
//     <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
//       <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
//         {/* Image container */}
//         <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
//           {/* left Image container */}
//           <div>
//             <p className='font-semibold text-gray-600 mb-2'>Original</p>
//             <img className='rounded-md border' src={assets.image_w_bg} alt="" />
//           </div>
//           {/* right Image container */}
//           <div className='flex flex-col '>
//             <p className='font-semibold text-gray-600 mb-2'>Background Remove</p>
//             <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
//               {/* <img src={assets.image_wo_bg} alt="" /> */}

//               <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
//                 <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
//               </div>

//             </div>
//           </div>
//         </div>

//          {/* Buttons */}
//       <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
//         <button className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>Try another image</button>
//         <a className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700' href="">Download Image</a>
//       </div>
//       </div>
     
      
//     </div>
//   )
// }

// export default BgResult

// import React, { useContext, useState } from 'react';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import { toast } from 'react-toastify';
// import axios from 'axios';


// const BgResult = () => {
//   //const { removeBgImage } = useContext(AppContext);
//   const [loading, setLoading] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [resultImage, setResultImage] = useState(null);

//   const { removeBgImage, backendUrl , token,user } = useContext(AppContext); // Access backendUrl here
  
//   // Your existing code...
  

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       toast.error("Please select an image.");
//       return;
//     }
  
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image_file", file);
  
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/bgimage`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//           params: {
//             userId: user?._id, // Ensure `user._id` is set when loading credits
//           },
//         }
//       );
  
//       if (data.success) {
//         setResultImage(data.resultImage);
//         toast.success("Background removed successfully!");
//       } else {
//         toast.error(data.message || "Failed to process image.");
//       }
//     } catch (error) {
//       console.error("Error removing background:", error.response || error.message);
//       toast.error(
//         error.response?.data?.message || "An error occurred while processing."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
//       <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
//         {/* Image container */}
//         <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
//           {/* Left Image container */}
//           <div>
//             <p className='font-semibold text-gray-600 mb-2'>Original</p>
//             <img
//               className='rounded-md border'
//               src={uploadedImage || assets.image_w_bg}
//               alt="Original Image"
//             />
//           </div>
//           {/* Right Image container */}
//           <div className='flex flex-col'>
//             <p className='font-semibold text-gray-600 mb-2'>Background Remove</p>
//             <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
//               {loading ? (
//                 <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
//                   <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
//                 </div>
//               ) : resultImage ? (
//                 <img src={resultImage} alt="Result Image" />
//               ) : (
//                 <div className='text-center text-gray-400'>No image processed</div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
//           <label htmlFor='upload-input' className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer'>
//             Try another image
//           </label>
//           <input
//             id='upload-input'
//             type='file'
//             accept='image/*'
//             className='hidden'
//             onChange={handleImageUpload}
//           />
//           {resultImage && (
//             <a
//               className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'
//               href={resultImage}
//               download='result-image.png'
//             >
//               Download Image
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BgResult;

import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const BgResult = () => {
  const { originalImage, processedImage, isLoading, error, uploadAndRemoveBackground } = useAppContext();
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadAndRemoveBackground(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="mb-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Upload Image
        </label>
      </div>

      {isLoading && (
        <div className="text-center my-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Processing image...</p>
        </div>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {originalImage && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Original Image</h2>
            <img src={originalImage} alt="Original" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        )}
        {processedImage && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Background Removed</h2>
            <img src={processedImage} alt="Processed" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        )}
      </div>

      {!originalImage && !processedImage && (
        <div className="text-center text-gray-500">
          Upload an image to remove its background
        </div>
      )}
    </div>
  );
};

export default BgResult;

