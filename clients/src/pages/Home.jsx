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

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/text-to-image.mp4";
import image2 from "../assets/bg-removed.mp4";

const Home = () => {
  const navigate = useNavigate();
  const videoRefs = [useRef(null), useRef(null)];

  const handleRedirect = (path) => {
    navigate(path);
  };

  const slides = [
    {
      video: image1,
      title: "Text to Image Generation",
      description:
        "Transform your ideas into stunning visuals with our AI-powered text-to-image generation.",
      buttonText: "Try Text to Image",
      redirectPath: "/text-to-image",
    },
    {
      video: image2,
      title: "Background Removal",
      description:
        "Effortlessly remove backgrounds from your images with our advanced AI technology.",
      buttonText: "Remove Background",
      redirectPath: "/bgremoval",
    },
  ];

  return (
    <div className="relative w-full h-screen flex">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="w-1/2 h-full p-8 flex flex-col justify-center items-center"
        >
          <div className="relative w-full h-full mb-8">
            <video
              ref={videoRefs[index]}
              className="w-full h-full object-cover" // Ensures the video covers the full width and height
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
              type="video/mp4"
              onError={(e) => {
                e.target.style.display = "none"; // Hide video if it fails to load
              }}
            />
            <img
              src="fallback-image.jpg" // Use a fallback image if video fails
              alt="Fallback"
              className="w-full h-full object-cover hidden" // Initially hidden, will be shown if video fails
              onError={(e) => {
                e.target.style.display = "none"; // Hide fallback if it also fails
              }}
            />
          </div>
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl mb-8">{slide.description}</p>
            <button
              onClick={() => handleRedirect(slide.redirectPath)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;



