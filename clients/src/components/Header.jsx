

// import React, { useContext } from 'react'
// import { assets } from '../assets/assets';
// import { motion } from "framer-motion";
// import { AppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const { user, setShowLogin } = useContext(AppContext);
//   const navigate = useNavigate();

//   const onClickHandler = () => {
//     if (user) {
//       navigate('/result')
//     } else {
//       setShowLogin(true);
//     }
//   }

//   return (
//     <motion.div
//       className="relative flex flex-col justify-center items-center text-center my-20 h-screen"
//       initial={{ opacity: 0.2, y: 100 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//     >
//       {/* Background animation */}
//       <motion.div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${assets.bg_page})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//         animate={{
//           scale: [1, 1.05, 1], // Zoom effect
//           backgroundPosition: ['center', 'right', 'center'], // Shifting right effect
//         }}
//         transition={{
//           duration: 15, // Duration for the zoom and shift
//           ease: 'easeInOut',
//           repeat: Infinity, // Loop forever
//         }}
//       />
      
//       {/* Content over background */}
//       <div className="relative z-10 text-stone-500 inline-flex text-center gap-2 bg-white px-6 rounded-full py-1 border border-neutral-500">
//         <p>Best text to image generator</p>
//         <img src={assets.star_icon} alt="" />
//       </div>

//       <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-8 text-center z-10 relative">
//         Turn text to <span className="text-blue-600">image</span>, in seconds.
//       </motion.h1>
//       <motion.p className="text-center max-w-xl mx-auto mt-5 z-10 relative">
//         Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.
//       </motion.p>

//       <motion.button
//         onClick={onClickHandler}
//         className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full z-10 relative"
//         whileInView={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
//       >
//         Generate Images
//         <img className="h-6" src={assets.star_group} alt="" />
//       </motion.button>

//       <motion.div className="flex flex-wrap justify-center mt-10 gap-3 z-10 relative">
//         {Array(6).fill('').map((item, index) => (
//           <motion.img
//             className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
//             whileHover={{ scale: 1.05, duration: 0.1 }}
//             src={index % 2 === 0 ? assets.example1 : assets.example2}
//             alt=""
//             key={index}
//             width={70}
//           />
//         ))}
//       </motion.div>

//       <motion.p className="mt-2 text-neutral-600 z-10 relative">
//         Generated images from imagify
//       </motion.p>
//     </motion.div>
//   );
// }

// export default Header;



import { useContext } from "react"
import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate("/result")
    } else {
      setShowLogin(true)
    }
  }

  return (
    <div className="relative -mt-[72px] min-h-screen flex flex-col -mx-4 sm:-mx-10 md:-mx-14 lg:-mx-28">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.bg_page})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          scale: [1, 1.05, 1],
          backgroundPosition: ["center", "right", "center"],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center text-center flex-grow pt-28 pb-20 px-4 sm:px-10 md:px-14 lg:px-28"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 rounded-full py-1 border border-neutral-500">
          <p>Best text to image generator</p>
          <img src={assets.star_icon || "/placeholder.svg"} alt="" />
        </div>

        <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-8 text-center">
          Turn text to <span className="text-blue-600">image</span>, in seconds.
        </motion.h1>
        <motion.p className="text-center max-w-xl mx-auto mt-5">
          Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the
          magic happen.
        </motion.p>

        <motion.button
          onClick={onClickHandler}
          className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
        >
          Generate Images
          <img className="h-6" src={assets.star_group || "/placeholder.svg"} alt="" />
        </motion.button>

        <motion.div className="flex flex-wrap justify-center mt-10 gap-3">
          {Array(6)
            .fill("")
            .map((item, index) => (
              <motion.img
                className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                whileHover={{ scale: 1.05, duration: 0.1 }}
                src={index % 2 === 0 ? assets.example1 : assets.example2}
                alt=""
                key={index}
                width={70}
              />
            ))}
        </motion.div>

        <motion.p className="mt-2 text-neutral-600">Generated images from imagify</motion.p>
      </motion.div>
    </div>
  )
}

export default Header





