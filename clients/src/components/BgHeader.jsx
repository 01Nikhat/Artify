import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const BgHeader = () => {
  const navigate = useNavigate();
  const { uploadAndRemoveBackground } = useContext(AppContext);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await uploadAndRemoveBackground(file);
        navigate('/bgResult');
      } catch (error) {
        console.error('Error uploading file:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
      {/* ---------------Left Side-----------*/}
      <div>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br /><span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>Background from</span> <br /> images for free</h1>
        <p className='my-6 text=[15xl] text-grey-500'>Remove backgrounds in seconds with our easy-to-use tool<br className='max-md:hidden'/>perfect for clean, professional images every time!</p>
        <div>
          <input 
            type="file" 
            name='upload' 
            id='upload1' 
            hidden 
            onChange={handleFileUpload}
            accept="image/*"
          />
          <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-700 to-fuchsia-800 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
            <img width={20} src={assets.upload_btn_icon} alt="" />
            <p className='text-white text-sm'>Upload your image</p>
          </label>
        </div>
      </div>
      {/* ---------------Right Side-----------*/}
      <div className='w-full max-w-md'>
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default BgHeader;

