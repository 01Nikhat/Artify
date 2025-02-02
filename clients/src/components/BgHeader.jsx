// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';

// const BgHeader = () => {
//   const navigate = useNavigate();
//   const { uploadAndRemoveBackground } = useContext(AppContext);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         await uploadAndRemoveBackground(file);
//         navigate('/bgResult');
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         // You might want to show an error message to the user here
//       }
//     }
//   };

//   return (
//     <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
//       {/* ---------------Left Side-----------*/}
//       <div>
//         <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br /><span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>Background from</span> <br /> images for free</h1>
//         <p className='my-6 text=[15xl] text-grey-500'>Remove backgrounds in seconds with our easy-to-use tool<br className='max-md:hidden'/>perfect for clean, professional images every time!</p>
//         <div>
//           <input 
//             type="file" 
//             name='upload' 
//             id='upload1' 
//             hidden 
//             onChange={handleFileUpload}
//             accept="image/*"
//           />
//           <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-700 to-fuchsia-800 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
//             <p className='text-white text-sm'>Upload your image</p>
//           </label>
//         </div>
//       </div>
//       {/* ---------------Right Side-----------*/}
//       <div className='w-full max-w-md'>
//         <img src={assets.header_img} alt="" />
//       </div>
//     </div>
//   )
// }

// export default BgHeader;


import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const BgHeader = () => {
  const navigate = useNavigate()
  const { uploadAndRemoveBackground } = useContext(AppContext)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        await uploadAndRemoveBackground(file)
        navigate("/bgResult")
      } catch (error) {
        console.error("Error uploading file:", error)
        // You might want to show an error message to the user here
      }
    }
  }

  return (
    <div className="relative w-screen -mx-4 sm:-mx-10 md:-mx-14 lg:-mx-28 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 lg:px-44 py-20 min-h-[calc(100vh-72px)]">
        {/* ---------------Left Side-----------*/}
        <div className="text-white max-w-xl">
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
            Remove the <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Background from
            </span>{" "}
            <br />
            images for free
          </h1>
          <p className="my-6 text-[15px] text-gray-300">
            Remove backgrounds in seconds with our easy-to-use tool
            <br className="max-md:hidden" />
            perfect for clean, professional images every time!
          </p>
          <div>
            <input type="file" name="upload" id="upload1" hidden onChange={handleFileUpload} accept="image/*" />
            <label
              className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-700 hover:from-violet-700 hover:to-fuchsia-800 transition-all duration-300 hover:scale-105"
              htmlFor="upload1"
            >
              <p className="text-white text-sm">Upload your image</p>
            </label>
          </div>
        </div>
        {/* ---------------Right Side-----------*/}
        <div className="w-full max-w-md">
          <img
            src={assets.header_img || "/placeholder.svg"}
            alt="Background removal example"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default BgHeader



