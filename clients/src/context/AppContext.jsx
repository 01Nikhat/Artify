
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "import Steps from '../components/steps'";
  const navigate = useNavigate();
  /*  --------------------------------LOADS CREDIT DATA ---------------------------------        */
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
  /*  -------------------------------- LOGOUT  ---------------------------------        */
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
  /*  --------------------------------  GENERATE IMAGE ---------------------------------        */
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

  /*  -------------------------------- UPLOAD REMOVE AND BACKGROUND ------------------------------      */
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

  /*  --------------------------------     INITIATE PAYMENT  ---------------------------------        */
  // const initiatePayment = async (plan) => {
  //   if (!plan || !plan.price || !plan.id || !plan.credits) {
  //     toast.error("Invalid plan details.");
  //     return;
  //   }

  //   try {
  //     const { data } = await axios.post(
  //       `${backendUrl}/api/transaction/create-order`,
  //       { amount: plan.price, plan: plan.id, credits: plan.credits },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (data.success) {
  //       const options = {
  //         key: data.key,
  //         amount: data.order.amount,
  //         currency: "INR",
  //         name: "Imagify",
  //         description: `Purchase ${plan.credits} credits`,
  //         order_id: data.order.id,
  //         handler: async (response) => {
  //           try {
  //             const verificationData = await axios.post(
  //               `${backendUrl}/api/transaction/verify-payment`,
  //               response,
  //               {
  //                 headers: { Authorization: `Bearer ${token}` },
  //               }
  //             );

  //             if (verificationData.data.success) {
  //               setCredit(verificationData.data.credits);
  //               toast.success("Payment successful! Credits added to your account.");
  //             } else {
  //               toast.error("Payment verification failed.");
  //             }
  //           } catch (error) {
  //             console.error("Verification error:", error);
  //             toast.error("Error verifying payment.");
  //           }
  //         },
  //         prefill: {
  //           name: user?.name,
  //           email: user?.email,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     } else {
  //       toast.error("Failed to create order.");
  //     }
  //   } catch (error) {
  //     console.error("Payment initiation error:", error);
  //     toast.error("Error initiating payment.");
  //   }
  // };


  const initiatePayment = async (plan) => {
    if (!plan || !plan.price || !plan.id || !plan.credits) {
      toast.error("Invalid plan details.");
      return;
    }

    try {
      console.log("Initiating payment for plan:", plan);
      const { data } = await axios.post(
        `${backendUrl}/api/transaction/create-order`,
        { amount: plan.price, plan: plan.id, credits: plan.credits },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Create order response:", data);

      if (data.success) {
        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: "INR",
          name: "Imagify",
          description: `Purchase ${plan.credits} credits`,
          order_id: data.order.id,
          handler: async (response) => {
            console.log("Razorpay payment response:", response);
            try {
              console.log("Verifying payment...");
              const verificationData = await axios.post(
                `${backendUrl}/api/transaction/verify-payment`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              console.log("Verification response:", verificationData.data);

              if (verificationData.data.success) {
                setCredit(verificationData.data.credits);
                toast.success("Payment successful! Credits added to your account.");
                await loadCreditsData();
              } else {
                console.error("Payment verification failed:", verificationData.data);
                toast.error("Payment verification failed. Please contact support.");
              }
            } catch (error) {
              console.error("Verification error:", error);
              if (error.response) {
                console.error("Error response:", error.response.data);
                console.error("Error status:", error.response.status);
                if (error.response.status === 404) {
                  toast.error("Transaction not found. Please wait a moment and try again.");
                } else {
                  toast.error("Error verifying payment. Please contact support.");
                }
              } else {
                toast.error("Error verifying payment. Please check your connection and try again.");
              }
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Failed to create order:", data);
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      toast.error("Error initiating payment. Please try again.");
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
    initiatePayment,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;


/////////////////////////////////////////////////////////////////

