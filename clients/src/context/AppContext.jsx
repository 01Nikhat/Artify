// import axios from "axios";
// import { createContext, useEffect, useState,useContext } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// export const AppContext = createContext();


// export const useAppContext = () => useContext(AppContext);

// const AppContextProvider = (props) => {
//   const [user, setUser] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [image,setImage] = useState(false);
//   //adding for removebg
//   const [originalImage, setOriginalImage] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   console.log("nikhat " + token);
//   const [credit, setCredit] = useState(0);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
//   const navigate = useNavigate();

//   const loadCreditsData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success && data.user) {
//         setCredit(data.user.credits || 0); // Fallback to 0 if undefined
//         setUser(data.user);
//         if (data.user.credits === 0) {
//           toast.warning("You have run out of credits. Please purchase more.");
//           navigate("/buy");
//         }
//       } else {
//         toast.error("Failed to load user data.");
//       }
//     } catch (error) {
//       console.error("Error loading credits:", error.response || error.message);
//       toast.error(error.response?.data?.message || "Failed to load credits.");
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setUser(null);
//   };

//   useEffect(() => {
//     if (token) {
//       loadCreditsData();
//     }
//   }, [token]);

//   //generate image function

//   const generateImage = async (prompt) => {
//     if (!token) {
//       toast.error("Please log in to generate images.");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/image/generate-image`,
//         { prompt },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         loadCreditsData();
//         return data.resultImage;
//       } else {
//         toast.error(data.message || "Failed to generate image.");
//         if (data.user?.credits === 0) {
//           navigate("/buy");
//         }
//       }
//     } catch (error) {
//       console.error("Error generating image:", error.response || error.message);
//       toast.error(error.response?.data?.message || "Error generating image.");
//     }
//   };

  
 
//   ////////////////////////////////////////////////////

//   const uploadAndRemoveBackground = async (file) => {
//     setIsLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       setOriginalImage(URL.createObjectURL(file));

//       const response = await fetch('http://localhost:4000/api/remove-bg', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to remove background');
//       }

//       const blob = await response.blob();
//       setProcessedImage(URL.createObjectURL(blob));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  
//   const value = {
//     user,
//     setUser,
//     showLogin,
//     setShowLogin,
//     backendUrl,
//     token,
//     setToken,
//     credit, // Pass credit state
//     setCredit,
//     loadCreditsData,
//     logOut,
//     generateImage,
//     originalImage,
//     processedImage,
//     isLoading,
//     error,
//     uploadAndRemoveBackground,
//   };

//   return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
// };

// export default AppContextProvider;

// //////////////////////////////////////////////////////////////

import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [image, setImage] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success && data.user) {
        setCredit(data.user.credits || 0);
        setUser(data.user);
        if (data.user.credits === 0) {
          toast.warning("You have run out of credits. Please purchase more.");
          navigate("/buy");
        }
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.error("Error loading credits:", error.response || error.message);
      toast.error(error.response?.data?.message || "Failed to load credits.");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const generateImage = async (prompt) => {
        if (!token) {
          toast.error("Please log in to generate images.");
          return;
        }
    
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/image/generate-image`,
            { prompt },
            { headers: { Authorization: `Bearer ${token}` } }
          );
    
          if (data.success) {
            loadCreditsData();
            return data.resultImage;
          } else {
            toast.error(data.message || "Failed to generate image.");
            if (data.user?.credits === 0) {
              navigate("/buy");
            }
          }
        } catch (error) {
          console.error("Error generating image:", error.response || error.message);
          toast.error(error.response?.data?.message || "Error generating image.");
        }
      };
    
      

  const uploadAndRemoveBackground = async (file) => {
    setIsLoading(true);
    setError(null);

    if (!token) {
      setError("Please log in to remove background.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setOriginalImage(URL.createObjectURL(file));

      const response = await axios.post(
        `${backendUrl}/api/remove-bg`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.data.success) {
        const base64Image = response.data.image;
        setProcessedImage(`data:image/png;base64,${base64Image}`);
        setCredit(response.data.creditBalance);
        toast.success("Background removed successfully!");
      } else {
        throw new Error(response.data.message || 'Failed to remove background');
      }
    } catch (err) {
      console.error('Error removing background:', err);
      setError(err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        logOut();
      } else if (err.response?.status === 403) {
        toast.error("Insufficient credits. Please purchase more.");
        navigate("/buy");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    generateImage,
    logOut,
    originalImage,
    processedImage,
    isLoading,
    error,
    uploadAndRemoveBackground,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

