import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

let credit1;
export const AppContext = createContext();
const AppContextProvider = (props) =>{
  const [user,setUser] = useState(null);
  const [showLogin,setShowLogin] = useState(false);

  //connecting backend to frontend part
  const [token , setToken ] = useState(localStorage.getItem('token'));
  const [credit,setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";


  /*const loadCreditsData = async () =>{
    try {
      // const {data} = await axios.get(backendUrl + '/api/user/credits',{headers: {token}});

      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching credits:", error.response?.data || error.message);
      toast.error("Failed to load credits. Please try again.");
      
    }
  }
*/

// const loadCreditsData = async () => {
//   try {
//     const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (data.success) {
//       console.log("Credits Data:", data);

//       setCredit(data.user?.credits);
//       setUser(data.user);
//     }
//   } catch (error) {
//     console.error("Error fetching credits:", error.response?.data || error.message);
//     toast.error(error.response?.data?.message || "Failed to load credits. Please try again.");
//   }
// };

const loadCreditsData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      console.log("Credits Data:", data);
      
      setCredit(data.credits); // Update to data.credits
      setUser(data.user); // Set user details as needed
      console.log('samiul:', data.user?.credits);
      credit1=data.user?.credits;
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
  },[token])

  //ending backend to frontend part, below in const value used this value
  // console.log('samiul:' + credit);
  
  console.log('Updated credit:', credit1);
  const value = {
    user,setUser,showLogin,setShowLogin, backendUrl,token,setToken,credit1,setCredit,loadCreditsData,logOut
  };
  return(
    <AppContext.Provider value={value} >
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;