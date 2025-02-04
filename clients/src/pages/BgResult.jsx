// import React, { useRef } from 'react';
// import { useAppContext } from '../context/AppContext';

// const BgResult = () => {
//   const { originalImage, processedImage, isLoading, error, uploadAndRemoveBackground } = useAppContext();
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       await uploadAndRemoveBackground(file);
//     }
//   };

//   const handleTryAnother = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
//       <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
//         {/* Image container */}
//         <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
//           {/* left Image container */}
//           <div>
//             <p className='font-semibold text-gray-600 mb-2'>Original</p>
//             {originalImage ? (
//               <img className='rounded-md border w-full h-full' src={originalImage} alt="Original" />
//             ) : (
//               <div className='rounded-md border border-gray-300 h-64 flex items-center justify-center text-gray-400'>
//                 No image uploaded
//               </div>
//             )}
//           </div>
//           {/* right Image container */}
//           <div className='flex flex-col'>
//             <p className='font-semibold text-gray-600 mb-2'>Background Remove</p>
//             <div className='rounded-md border border-gray-300 h-64 relative bg-layer overflow-hidden'>
//               {isLoading ? (
//                 <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
//                   <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
//                 </div>
//               ) : processedImage ? (
//                 <img src={processedImage} alt="Processed" className='w-full h-full object-contain' />
//               ) : (
//                 <div className='h-full flex items-center justify-center text-gray-400'>
//                   {error ? `Error: ${error}` : 'Processed image will appear here'}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//             className="hidden"
//             id="image-upload"
//           />
//           <button 
//             onClick={handleTryAnother}
//             className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'
//           >
//             Try another image
//           </button>
//           {processedImage && (
//             <a 
//               className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'
//               href={processedImage}
//               download="processed_image.png"
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


// import React, { useRef } from 'react';
// import { useAppContext } from '../context/AppContext';

// const BgResult = () => {
//   const { originalImage, processedImage, isLoading, error, uploadAndRemoveBackground } = useAppContext();
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       await uploadAndRemoveBackground(file);
//     }
//   };

//   const handleTryAnother = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className='mx-4 my-8 lg:mx-44'>
//       <div className='bg-white rounded-xl shadow-lg px-8 py-8'>
//         {/* Image container */}
//         <div className='flex flex-col sm:grid sm:grid-cols-2 gap-8'>
//           {/* Original Image container */}
//           <div className='flex flex-col'>
//             <p className='font-semibold text-gray-700 text-lg mb-4'>Original Image</p>
//             {originalImage ? (
//               <img 
//                 className='rounded-lg border border-gray-200 w-full h-auto max-h-96 object-cover' 
//                 src={originalImage} 
//                 alt="Original" 
//               />
//             ) : (
//               <div className='rounded-lg border-2 border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-500'>
//                 <p>No image uploaded</p>
//               </div>
//             )}
//           </div>

//           {/* Processed Image container */}
//           <div className='flex flex-col'>
//             <p className='font-semibold text-gray-700 text-lg mb-4'>Background Removed</p>
//             <div className='rounded-lg border border-gray-200 h-64 relative bg-gray-50 overflow-hidden'>
//               {isLoading ? (
//                 <div className='absolute inset-0 flex items-center justify-center'>
//                   <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
//                 </div>
//               ) : processedImage ? (
//                 <img 
//                   src={processedImage} 
//                   alt="Processed" 
//                   className='w-full h-full object-contain' 
//                 />
//               ) : (
//                 <div className='h-full flex items-center justify-center text-gray-500'>
//                   {error ? `Error: ${error}` : 'Processed image will appear here'}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className='flex flex-col sm:flex-row justify-end items-center gap-4 mt-8'>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//             className="hidden"
//             id="image-upload"
//           />
//           <button 
//             onClick={handleTryAnother}
//             className='px-6 py-2.5 text-violet-600 text-sm font-medium border border-violet-600 rounded-lg hover:bg-violet-50 transition-colors duration-300'
//           >
//             Try Another Image
//           </button>
//           {processedImage && (
//             <a 
//               className='px-6 py-2.5 text-white text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg hover:opacity-90 transition-opacity duration-300'
//               href={processedImage}
//               download="processed_image.png"
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




import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import originalImage from '../assets/default-original.jpg';
import processedImage from '../assets/default-processed.png';

const BgResult = () => {
  const {  isLoading, error, uploadAndRemoveBackground } = useAppContext();
  const fileInputRef = useRef(null);
  const [displayedOriginal, setDisplayedOriginal] = useState(originalImage);
  const [displayedProcessed, setDisplayedProcessed] = useState(processedImage);

  useEffect(() => {
    if (originalImage) setDisplayedOriginal(originalImage);
    if (processedImage) setDisplayedProcessed(processedImage);
  }, [originalImage, processedImage]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadAndRemoveBackground(file);
    }
  };

  const handleTryAnother = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='mx-4 my-8 lg:mx-44'>
      <div className='bg-white rounded-xl shadow-lg px-8 py-8'>
        {/* Image container */}
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-8'>
          {/* Original Image container */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-700 text-lg mb-4'>Original Image</p>
            <div className='rounded-lg border border-gray-200 h-64 relative bg-gray-50 overflow-hidden'>
              <img 
                className='w-full h-full object-contain' 
                src={displayedOriginal} 
                alt="Original" 
              />
            </div>
          </div>

          {/* Processed Image container */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-700 text-lg mb-4'>Background Removed</p>
            <div className='rounded-lg border border-gray-200 h-64 relative bg-gray-50 overflow-hidden'>
              {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
                </div>
              ) : processedImage ? (
                <img 
                  src={displayedProcessed} 
                  alt="Processed" 
                  className='w-full h-full object-contain' 
                />
              ) : (
                <div className='h-full flex items-center justify-center text-gray-500'>
                  {error ? `Error: ${error}` : 'Processed image will appear here'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row justify-end items-center gap-4 mt-8'>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />
          <button 
            onClick={handleTryAnother}
            className='px-6 py-2.5 text-violet-600 text-sm font-medium border border-violet-600 rounded-lg hover:bg-violet-50 transition-colors duration-300'
          >
            Try Another Image
          </button>
          {processedImage && (
            <a 
              className='px-6 py-2.5 text-white text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg hover:opacity-90 transition-opacity duration-300'
              href={processedImage}
              download="processed_image.png"
            >
              Download Image
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BgResult;





