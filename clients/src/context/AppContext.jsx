import axios from "axios";
import { createContext, useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();


// let credit;
// const AppContextProvider = (props) =>{

//   const [user,setUser] = useState(null);
//   const [showLogin,setShowLogin] = useState(false);

//   //connecting backend to frontend part
//   const [token , setToken ] = useState(localStorage.getItem('token'));
//   const [credit,setCredit] = useState(false);

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
  
  


//   const logOut = () =>{
//     localStorage.removeItem('token');
//     setToken('');
//     setUser(null);
//   }

//   useEffect(()=>{
//     if (token) {
//       console.log("Token:", token);
//       loadCreditsData();
//     console.log('Updated credit:', credit);
//     }
//   },[token]);



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
  
//   //ending backend to frontend part, below in const value used this value
//   console.log('samiul:' + credit);
  
//   console.log('Updated credit:', credit);
//   const value = {
//     user,setUser,showLogin,setShowLogin, backendUrl,token,setToken,credit,setCredit,loadCreditsData,logOut
//     ,generateImage
//   };
//   return(
//     <AppContext.Provider value={value} >
//       {props.children}
//     </AppContext.Provider>
//   )
// }
// export default AppContextProvider;

//////////////////////////////////////////////////////////////////////////////

//updated appcontext

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [image,setImage] = useState(false);
  //adding for removebg
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("nikhat " + token);
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
        setCredit(data.user.credits || 0); // Fallback to 0 if undefined
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
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  //generate image function

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

  // const removeBgImage = async (req, res) => {
  //   try {
  //     const { userId } = req.body;
  
  //     const user = await userModel.findById(userId);
  //     if (!user) {
  //       return res.status(404).json({ success: false, message: "User not found" });
  //     }
  
  //     if (user.creditBalance <= 0) {
  //       return res.status(400).json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
  //     }
  
  //     const imagePath = req.file.path;
  //     const imageFile = fs.createReadStream(imagePath);
  
  //     const formData = new FormData();
  //     formData.append('image_file', imageFile);
  
  //     const { data } = await axios.post(
  //       "https://clipdrop-api.co/remove-background/v1",
  //       formData,
  //       {
  //         headers: { 'x-api-key': "12ba614bf4f8c9e9a49d7da26c717f60e2ac46c5425881a931aad4b7449d43a106a8cf256c0ccf971e5a16dba318ff85" },
  //         responseType: "arraybuffer",
  //       }
  //     );
  
  //     const base64Image = Buffer.from(data, "binary").toString("base64");
  //     const resultImage = `data:image/png;base64,${base64Image}`;
  
  //     await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
  
  //     res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: "Background removed successfully" });
  
  //     // Cleanup
  //     fs.unlinkSync(imagePath);
  //   } catch (error) {
  //     console.error("Error removing background:", error.message);
  //     res.status(500).json({ success: false, message: "An error occurred while processing the image" });
  //   }
  // };
  
  ////////////////////////////////////////////////////

  const uploadAndRemoveBackground = async (file) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      setOriginalImage(URL.createObjectURL(file));

      const response = await fetch('http://localhost:4000/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
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
    credit, // Pass credit state
    setCredit,
    loadCreditsData,
    logOut,
    generateImage,
    originalImage,
    processedImage,
    isLoading,
    error,
    uploadAndRemoveBackground,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

//////////////////////////////////////////////////////////////






