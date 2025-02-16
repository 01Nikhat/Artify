

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const BgHeader = () => {
  const navigate = useNavigate();
  const { uploadAndRemoveBackground } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsProcessing(true);
        await uploadAndRemoveBackground(file);
        navigate("/bgResult");
      } catch (error) {
        console.error("Error uploading file:", error);
        // You might want to show an error message to the user here
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="relative w-screen overflow-hidden mt-16 lg:mt-0">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-24 pt-8 pb-12 lg:py-24 min-h-[calc(100vh-72px)]"> // Changed py-12 to pt-8 pb-12
        {/* ---------------Left Side-----------*/}
        <div className="text-white max-w-xl text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Remove the <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Background from
            </span>{" "}
            <br />
            images for free
          </h1>
          <p className="my-6 text-base sm:text-lg text-gray-300">
            Remove backgrounds in seconds with our easy-to-use tool
            <br className="hidden sm:inline" />
            perfect for clean, professional images every time!
          </p>
          <div>
            <input
              type="file"
              name="upload"
              id="upload1"
              hidden
              onChange={handleFileUpload}
              accept="image/*"
              disabled={isProcessing}
            />
            <label
              className={`inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-700 hover:from-violet-700 hover:to-fuchsia-800 transition-all duration-300 ${
                isProcessing ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
              htmlFor="upload1"
            >
              <p className="text-white text-sm sm:text-base">
                {isProcessing ? "Processing..." : "Upload your image"}
              </p>
            </label>
          </div>
        </div>

        {/* ---------------Right Side-----------*/}
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <img
            src={assets.header_img || "/placeholder.svg"}
            alt="Background removal example"
            className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BgHeader;

