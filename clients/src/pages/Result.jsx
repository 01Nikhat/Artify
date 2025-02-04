// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { motion } from 'framer-motion';
// import { AppContext } from '../context/AppContext.jsx';
// import { useNavigate } from "react-router-dom";

// const Result = () => {
//   const [image, setImage] = useState(assets.example1);
//   const [isImageLoaded, setImageLoaded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState('');

//   const { generateImage, credit } = useContext(AppContext);
//   console.log("creditBALANCE :" + credit);

//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (input) {
//       const image = await generateImage(input);
//       if (image) {
//         setImageLoaded(true);
//         setImage(image);
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <motion.form
//       initial={{ opacity: 0.2, y: 100 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       onSubmit={onSubmitHandler}
//       className='flex flex-col min-h-[90vh] justify-center items-center'
//     >
//       <div>
//         <div className='relative w-full max-w-sm rounded-lg overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_30px_rgba(0,0,0,0.3)]'>
//           <img src={image} alt="" className='w-full h-full object-contain' />
//           <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
//         </div>
//         <p className={!loading ? 'hidden' : ''}>Loading...</p>
//       </div>

//       {!isImageLoaded && (
//         <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
//           <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
//           <button type='submit' className='bg-zinc-900 sm:px-16 py-3 rounded-full'>Generate</button>
//         </div>
//       )}

//       {isImageLoaded && (
//         <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
//           <p onClick={() => { setImageLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
//           <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
//         </div>
//       )}
//     </motion.form>
//   );
// }

// export default Result;



import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext.jsx';

const Result = () => {
  const [image, setImage] = useState(assets.example1);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    
    <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center px-4"
        >
      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
        className="relative z-10 flex flex-col min-h-screen justify-center items-center"
      >
        <div className="relative">
          <img
            src={image}
            alt=""
            className="max-w-sm rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          ></span>
        </div>
        <p className={!loading ? "hidden" : ""}>Loading...</p>
        
        {/* Input & Button */}
        {!isImageLoaded && (
          <div className="flex w-full max-w-xl bg-neutral-700 text-white text-sm p-0.5 mt-10 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe what you want to generate"
              className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-gray-300"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-700 sm:px-16 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Generate
            </button>
          </div>
        )}
        
        {/* Actions */}
        {isImageLoaded && (
          <div className="flex gap-4 flex-wrap justify-center text-white text-sm p-2 mt-10">
            {/* Generate Another Button */}
            <p
              onClick={() => setImageLoaded(false)}
              className="border border-blue-500 text-blue-500 font-semibold px-8 py-3 rounded-full cursor-pointer 
              bg-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 
              transition-all duration-300 ease-in-out"
            >
              Generate Another
            </p>

            {/* Download Button */}
            <a
              href={image}
              download
              className="bg-gradient-to-r from-violet-600 to-fuchsia-700 sm:px-16 py-3 rounded-full hover:scale-105 transition-transform">
              Download
            </a>
          </div>
        )}

      </motion.form>
    </motion.div>

  );


};

export default Result;

