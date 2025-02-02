import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';



const BgUpload = () => {

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
    <div className=" pb-16">
      {/* Title */}
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl  font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16'>See the magic. Try Now</h1>

       <div className='text-center mb-24'>
                <input type="file" name='' id='upload2'  hidden 
                  onChange={handleFileUpload}
                  accept="image/*" />
                <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-700 to-fuchsia-800 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload2">
                  <img width={20} src={assets.upload_btn_icon} alt="" />
                  <p className='text-white text-sm'>Upload your image</p>
                </label>
       </div>

    </div>
  )
}

export default BgUpload
