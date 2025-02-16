


import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image1 from "../assets/texttoimage.gif";
import image2 from "../assets/bg-remove.gif";
import "../index.css"; // Ensure your custom styles are in this file.

const Home = () => {
  const navigate = useNavigate();
  const imageRefs = [useRef(null), useRef(null)];

  const handleRedirect = (path) => {
    navigate(path);
  };
  //below is the assets
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
    <div className="relative w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
  {slides.map((slide, index) => (
    <motion.div
      key={index}
          className="w-full md:w-1/2 h-[50vh] md:h-full p-4 md:p-8 flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <motion.div
            className="relative max-w-fit max-h-fit mb-6 md:mb-8 rounded-lg overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
            whileHover={{ scale: 1.05 }}
          >
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
          </motion.div>
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
              className="relative bg-gray-900 text-white font-bold py-1 px-4 md:py-3 md:px-6 rounded-lg transition duration-300 shadow-lg border-2 border-transparent glow-effect hover:glowing"
            >
              <span className="relative z-10">{slide.buttonText}</span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;













