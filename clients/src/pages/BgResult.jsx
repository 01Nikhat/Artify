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

  const handleTryAnother = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        {/* Image container */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          {/* left Image container */}
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            {originalImage ? (
              <img className='rounded-md border w-full h-full' src={originalImage} alt="Original" />
            ) : (
              <div className='rounded-md border border-gray-300 h-64 flex items-center justify-center text-gray-400'>
                No image uploaded
              </div>
            )}
          </div>
          {/* right Image container */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Remove</p>
            <div className='rounded-md border border-gray-300 h-64 relative bg-layer overflow-hidden'>
              {isLoading ? (
                <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                  <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
                </div>
              ) : processedImage ? (
                <img src={processedImage} alt="Processed" className='w-full h-full object-contain' />
              ) : (
                <div className='h-full flex items-center justify-center text-gray-400'>
                  {error ? `Error: ${error}` : 'Processed image will appear here'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
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
            className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'
          >
            Try another image
          </button>
          {processedImage && (
            <a 
              className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'
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

