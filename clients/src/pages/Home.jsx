// import { useState, useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import image1 from "../assets/text-to-image.mp4"
// import image2 from "../assets/bg-removed.mp4";

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const navigate = useNavigate()
//   const videoRefs = [useRef(null), useRef(null)]

//   useEffect(() => {
//     const playCurrentVideo = () => {
//       videoRefs[currentSlide].current.play()
//     }

//     playCurrentVideo()

//     const videoElement = videoRefs[currentSlide].current
//     const handleVideoEnd = () => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % 2)
//     }

//     videoElement.addEventListener("ended", handleVideoEnd)

//     return () => {
//       videoElement.removeEventListener("ended", handleVideoEnd)
//     }
//   }, [currentSlide, videoRefs]) // Added videoRefs to dependencies

//   const handleRedirect = (path) => {
//     navigate(path)
//   }

//   const slides = [
//     {
//       video: image1,
//       title: "Text to Image Generation",
//       description: "Transform your ideas into stunning visuals with our AI-powered text-to-image generation.",
//       buttonText: "Try Text to Image",
//       redirectPath: "/text-to-image",
//     },
//     {
//       video: image2,
//       title: "Background Removal",
//       description: "Effortlessly remove backgrounds from your images with our advanced AI technology.",
//       buttonText: "Remove Background",
//       redirectPath: "/bgremoval",
//     },
//   ]

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//         >
//           <video
//             ref={videoRefs[index]}
//             className="absolute inset-0 w-full h-full object-cover"
//             src={slide.video}
//             muted
//             playsInline
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="text-center text-white p-8">
//               <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
//               <p className="text-xl mb-8">{slide.description}</p>
//               <button
//                 onClick={() => handleRedirect(slide.redirectPath)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
//               >
//                 {slide.buttonText}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Home

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image1 from "../assets/text-to-image.gif";
import image2 from "../assets/bg-removed.gif";

const Home = () => {
  const navigate = useNavigate();
  const imageRefs = [useRef(null), useRef(null)];

  const handleRedirect = (path) => {
    navigate(path);
  };

  const slides = [
    {
      image: image1,
      title: "Text to Image Generation",
      description: "Transform your ideas into stunning visuals with our AI-powered text-to-image generation.",
      buttonText: "Try Text to Image",
      redirectPath: "/text-to-image",
    },
    {
      image: image2,
      title: "Background Removal",
      description: "Effortlessly remove backgrounds from your images with our advanced AI technology.",
      buttonText: "Remove Background",
      redirectPath: "/bgremoval",
    },
  ];

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-purple-100 overflow-y-auto">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="w-full md:w-1/2 h-auto md:h-full p-6 md:p-8 flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* GIF Container with Auto Sizing */}
          <div className="relative max-w-fit max-h-fit mb-6 md:mb-8 rounded-lg overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_30px_rgba(0,0,0,0.3)]">
            <img
              ref={imageRefs[index]}
              className="w-auto h-auto object-scale-down"
              src={slide.image}
              alt={slide.title}
              onError={(e) => {
                console.error("Image error:", e);
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600">
              {slide.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRedirect(slide.redirectPath)}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-800 hover:from-violet-700 hover:to-fuchsia-900 transition-all duration-300 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              {slide.buttonText}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;










