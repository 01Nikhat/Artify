// import React from 'react';
// import { assets } from '../assets/assets';


// const BgSteps = () => {
//   return (
//     <div className='mx-36 lg:mx-25 xl:mx-34 xl:py-20'>
//       <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
//         Steps to remove background<br />image in seconds
//       </h1>
//       <div className='flex flex-row gap-4 mt-16 xl:mt-24 justify-start'>
//         {/* Step 1 */}
//         <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 ml-[-20px]'>
//           <img className='max-w-9' src={assets.upload_icon} alt="" />
//           <div>
//             <p className='text-xl font-medium'>Upload Image</p>
//             <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later.<br />This is a demo...</p>
//           </div>
//         </div>
//         {/* Step 2 */}
//         <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
//           <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
//           <div>
//             <p className='text-xl font-medium'>Remove Background</p>
//             <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later.<br />This is a demo...</p>
//           </div>
//         </div>
//         {/* Step 3 */}
//         <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
//           <img className='max-w-9' src={assets.download_icon_bg} alt="" />
//           <div>
//             <p className='text-xl font-medium'>Download Image</p>
//             <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later.<br />This is a demo...</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BgSteps;


import React from "react";
import { assets } from "../assets/assets";

const BgSteps = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 py-10">
      {/* Heading */}
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mt-10">
        Steps to remove background <br className="hidden md:block" />
        image in seconds
      </h1>

      {/* Steps Section */}
      <div className="mt-12 xl:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="flex items-start gap-4 bg-white border shadow-lg p-6 sm:p-8 rounded-xl hover:scale-105 transition-all duration-500">
          <img className="w-12 h-12" src={assets.upload_icon} alt="Upload Icon" />
          <div>
            <p className="text-lg sm:text-xl font-medium">Upload Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Upload your image in one click and get started with background removal.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 bg-white border shadow-lg p-6 sm:p-8 rounded-xl hover:scale-105 transition-all duration-500">
          <img className="w-12 h-12" src={assets.remove_bg_icon} alt="Remove BG Icon" />
          <div>
            <p className="text-lg sm:text-xl font-medium">Remove Background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Our AI instantly removes the background while keeping details sharp.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 bg-white border shadow-lg p-6 sm:p-8 rounded-xl hover:scale-105 transition-all duration-500">
          <img className="w-12 h-12" src={assets.download_icon_bg} alt="Download Icon" />
          <div>
            <p className="text-lg sm:text-xl font-medium">Download Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Save your transparent image in high resolution with just one click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgSteps;

