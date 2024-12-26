import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


let credit1;
export const AppContext = createContext();
const AppContextProvider = (props) =>{

  const [user,setUser] = useState(null);
  const [showLogin,setShowLogin] = useState(false);

  //connecting backend to frontend part
  const [token , setToken ] = useState(localStorage.getItem('token'));
  const [credit,setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const navigate = useNavigate();


 

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log("Credits Data:", data);
        
        setCredit(data.user.credits); // Update to data.credits
        console.log("updated credit value on loadscredit method :"+ data.user.credits);
        
        setUser(data.user); // Set user details as needed
        // Navigate to the buy page if credits are 0
       console.log("data.credit value" + data.user.credits);
        
        if (data.user.credits === 0) {
          toast.warning("You have run out of credits. Please purchase more.");
          navigate('/buy');
        }
        console.log('Nikhat:', data.user?.credits);
        credit1=data.user?.credits;
      //  console.log('credit1 value is here : ' + credit1);
        
      }
    } catch (error) {
      console.error("Error fetching credits:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to load credits. Please try again.");
    }
  };



  const logOut = () =>{
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }

  useEffect(()=>{
    if (token) {
      console.log("Token:", token);
      loadCreditsData();
    console.log('Updated credit:', credit1);
    }
  },[token]);

  //generating text to image function 

  // const generateImage = async (prompt) =>{
  //     try {
  //      const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt},
  //       { headers: { Authorization: `Bearer ${token}` } } );
  //      if (data.success) {
  //       loadCreditsData();
  //       return data.resultImage;
        
  //      }
  //      else{
  //       toast.error(data.message);
  //       loadCreditsData();
  //       if (data.user.credits === 0) {
  //         navigate('/buy'); // Navigate to buy page if credits are 0
  //       }
        
  //      }
  //     } catch (error) {
  //       console.log("erroe on catch ");
  //       toast.error(error.message);
        
  //     }
  // }

  //generating text to image function 

  const generateImage = async (prompt) =>{
    console.log("prompt value on appcontext :"+ prompt);
    console.log("token on generate image :"+ token);
    
    
    try {
     const {data} = await axios.post(`${backendUrl}/api/image/generate-image`,{prompt},
      { headers: { Authorization: `Bearer ${token}` } } );
      console.log("data success value on generate image :"+ data.success + {data});
      
     if (data.success) {
      loadCreditsData();
      console.log("data is return here");
      return data.resultImage;
     
      
      
     }
     else{
      console.log("data goes to else part of generateImage");
      
      toast.error(data.message);
      loadCreditsData();
      if (data.user.credits === 0) {
        navigate('/buy'); // Navigate to buy page if credits are 0
      }
      
     }
    } catch (error) {
      console.log("erroe on catch of appcontext of generateimage method");
      toast.error(error.message);
      
    }
}

  //ending backend to frontend part, below in const value used this value
  // console.log('samiul:' + credit);
  
  console.log('Updated credit:', credit1);
  const value = {
    user,setUser,showLogin,setShowLogin, backendUrl,token,setToken,credit1,setCredit,loadCreditsData,logOut
    ,generateImage
  };
  return(
    <AppContext.Provider value={value} >
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;