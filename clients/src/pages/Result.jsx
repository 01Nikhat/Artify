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



// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { motion } from 'framer-motion';
// import { AppContext } from '../context/AppContext.jsx';

// const Result = () => {
//   const [image, setImage] = useState(assets.example3);
//   const [isImageLoaded, setImageLoaded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState('');

//   const { generateImage } = useContext(AppContext);

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
    
//     <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center px-4"
//         >
//       <motion.form
//         initial={{ opacity: 0.2, y: 100 }}
//         transition={{ duration: 1 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         onSubmit={onSubmitHandler}
//         className="relative z-10 flex flex-col min-h-screen justify-center items-center"
//       >
//         <div className="relative">
//           <img
//             src={image}
//             alt=""
//             className="max-w-sm rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
//           />
//           <span
//             className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
//               loading ? "w-full transition-all duration-[10s]" : "w-0"
//             }`}
//           ></span>
//         </div>
//         <p className={!loading ? "hidden" : ""}>Loading...</p>
        
//         {/* Input & Button */}
//         {!isImageLoaded && (
//           <div className="flex w-full max-w-xl bg-neutral-700 text-white text-sm p-0.5 mt-10 rounded-full">
//             <input
//               onChange={(e) => setInput(e.target.value)}
//               value={input}
//               type="text"
//               placeholder="Describe what you want to generate"
//               className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-gray-300"
//             />
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-violet-600 to-fuchsia-700 sm:px-16 py-3 rounded-full hover:scale-105 transition-transform"
//             >
//               Generate
//             </button>
//           </div>
//         )}
        
//         {/* Actions */}
//         {isImageLoaded && (
//           <div className="flex gap-4 flex-wrap justify-center text-white text-sm p-2 mt-10">
//             {/* Generate Another Button */}
//             <p
//               onClick={() => setImageLoaded(false)}
//               className="border border-blue-500 text-blue-500 font-semibold px-8 py-3 rounded-full cursor-pointer 
//               bg-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 
//               transition-all duration-300 ease-in-out"
//             >
//               Generate Another
//             </p>

//             {/* Download Button */}
//             <a
//               href={image}
//               download
//               className="bg-gradient-to-r from-violet-600 to-fuchsia-700 sm:px-16 py-3 rounded-full hover:scale-105 transition-transform">
//               Download
//             </a>
//           </div>
//         )}

//       </motion.form>
//     </motion.div>

//   );


// };

// export default Result;



import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext.jsx';

const Result = () => {
  const [image, setImage] = useState(assets.example3);
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
      className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center px-4 py-10"
    >
      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        {/* Image Display Section */}
        <div className="relative w-full max-w-md lg:max-w-sm mt-2">
          <img
            src={image}
            alt="Generated content"
            className="w-full rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
          {loading && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </div>
          )}
        </div>

        {/* Loading Message */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-300 text-sm"
          >
            Generating your image...
          </motion.p>
        )}

        {/* Input Field */}
        {!isImageLoaded && (
          <div className="w-full max-w-xl bg-neutral-700/50 backdrop-blur-sm text-white text-sm p-1 mt-10 rounded-full shadow-lg flex">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe what you want to generate..."
              className="w-full bg-transparent outline-none px-6 py-3 placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-700 px-8 py-3 rounded-full hover:scale-105 transition-transform font-medium"
            >
              Generate
            </button>
          </div>
        )}

        {/* Buttons for New Image & Download */}
        {isImageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <button
              onClick={() => setImageLoaded(false)}
              className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold"
            >
              Generate Another
            </button>
            <a
              href={image}
              download
              className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-700 hover:scale-105 transition-transform text-white font-semibold"
            >
              Download Image
            </a>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Result;

