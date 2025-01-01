import axios from "axios";
import { createContext, useEffect, useState } from "react";
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


 

//   // const loadCreditsData = async () => {
//   //   try {
//   //     const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     if (data.success) {
//   //       console.log("Credits Data:", data);
        
//   //       setCredit(data.user.credits); // Update to data.credits
//   //       console.log("updated credit value on loadscredit method :"+ data.user.credits);
        
//   //       setUser(data.user); // Set user details as needed
//   //       // Navigate to the buy page if credits are 0
//   //      console.log("data.credit value" + data.user.credits);
        
//   //       if (data.user.credits === 0) {
//   //         toast.warning("You have run out of credits. Please purchase more.");
//   //         navigate('/buy');
//   //       }
//   //       console.log('Nikhat:', data.user?.credits);
//   //       credit=data.user?.credits;
//   //     //  console.log('credit value is here : ' + credit);
        
//   //     }
//   //   } catch (error) {
//   //     if (error.response) {
//   //       toast.error(error.response.data?.message || "Server error occurred.");
//   //       console.error("Response error:", error.response.data);
//   //     } else if (error.request) {
//   //       toast.error("No response from server. Check your connection.");
//   //       console.error("Request error:", error.request);
//   //     } else {
//   //       toast.error("Unexpected error occurred. Please try again.");
//   //       console.error("Error:", error.message);
//   //     }
//   //   }
    
//   // };

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

//   //generating text to image function 

//   // const generateImage = async (prompt) =>{
//   //     try {
//   //      const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt},
//   //       { headers: { Authorization: `Bearer ${token}` } } );
//   //      if (data.success) {
//   //       loadCreditsData();
//   //       return data.resultImage;
        
//   //      }
//   //      else{
//   //       toast.error(data.message);
//   //       loadCreditsData();
//   //       if (data.user.credits === 0) {
//   //         navigate('/buy'); // Navigate to buy page if credits are 0
//   //       }
        
//   //      }
//   //     } catch (error) {
//   //       console.log("erroe on catch ");
//   //       toast.error(error.message);
        
//   //     }
//   // }

//   //generating text to image function 

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

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("samiul " + token);
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
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
