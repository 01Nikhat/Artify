


// import { useContext } from "react";
// import { assets } from "../assets/assets";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setShowLogin, logOut, credit } = useContext(AppContext);

//   const isBackgroundRemovalPage = location.pathname === "/bgremoval";
//   const isBackgroundResult = location.pathname === "/result";
//   const isHomePage = location.pathname === "/";

//   const textColorClass = isBackgroundRemovalPage || isBackgroundResult ? "text-white" : "text-black";

//   return (
//     <div
//       className={`flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 relative z-50 bg-transparent ${textColorClass}`}
//     >
//       <Link to="/">
//         <img
//           src={assets.logo || "/placeholder.svg"}
//           alt="Logo"
//           className={`w-28 sm:w-32 lg:w-40 ${
//             isBackgroundRemovalPage || isBackgroundResult ? "filter invert brightness-0" : ""
//           }`}
//         />
//       </Link>

//       <div>
//         {user ? (
//           <div className="flex items-center gap-2 sm:gap-3">
//             {/* Hide Button on Home Page */}
//             {!isHomePage && (
//               <button
//                 className={`flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full ${
//                   isBackgroundRemovalPage || isBackgroundResult ? "bg-blue-100 text-gray-800" : "bg-zinc-800 text-white"
//                 }`}
//                 onClick={() => navigate(isBackgroundRemovalPage ? "/text-to-image" : "/bgremoval")}
//               >
//                 {isBackgroundRemovalPage ? (
//                   <>
//                     Text to Image Generator
//                     <img className="w-3 sm:w-4 filter invert-0 brightness-0 " src={assets.arrow_icon || "/placeholder.svg"} alt="" />
//                   </>
//                 ) : (
//                   <>
//                     Remove Background
//                     <img className="w-3 sm:w-4" src={assets.arrow_icon || "/placeholder.svg"} alt="" />
//                   </>
//                 )}
//               </button>
//             )}

//             <button
//               onClick={() => navigate("/buy")}
//               className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
//             >
//               <img className="w-5" src={assets.credit_star || "/placeholder.svg"} alt="Credit" />
//               <p className="text-xs sm:text-sm font-medium text-gray-600">
//                 Credit Left: {credit}
//               </p>
//             </button>

//             <p className={`max-sm:hidden pl-4 ${isBackgroundRemovalPage || isBackgroundResult ? "text-white" : "text-gray-600"}`}>
//               {user.name}
//             </p>

//             <div className="relative group">
//               <img src={assets.profile_icon || "/placeholder.svg"} className="w-10 drop-shadow-sm" alt="Profile" />
//               <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12">
//                 <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm text-black">
//                   <li onClick={logOut} className="px-2 py-1 cursor-pointer pr-10">
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 sm:gap-5">
//             <p onClick={() => navigate("/buy")} className="cursor-pointer">
//               Pricing
//             </p>
//             <button
//               className={`px-7 py-2 sm:px-10 text-sm rounded-full ${
//                 isBackgroundRemovalPage || isBackgroundResult ? "bg-white text-black" : "bg-zinc-800 text-white"
//               }`}
//               onClick={() => setShowLogin(true)}
//             >
//               Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


"use client"

import { useState, useContext } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setShowLogin, logOut, credit } = useContext(AppContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isBackgroundRemovalPage = location.pathname === "/bgremoval"
  const isBackgroundResult = location.pathname === "/result"
  const isHomePage = location.pathname === "/"

  const textColorClass = isBackgroundRemovalPage || isBackgroundResult ? "text-white" : "text-black"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className={`flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 relative z-50 bg-transparent ${textColorClass}`}
    >
      <Link to="/">
  <img
    src={assets.artify || "/placeholder.svg"}
    alt="Logo"
    className={`w-20 sm:w-24 lg:w-20 ${
      isBackgroundRemovalPage || isBackgroundResult ? "filter invert brightness-0" : ""
    }`}
  />
</Link>


      {/* Mobile menu button */}
      <button onClick={toggleMenu} className="lg:hidden">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className="hidden lg:flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            {!isHomePage && (
              <button
                className={`flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full ${
                  isBackgroundRemovalPage || isBackgroundResult ? "bg-blue-100 text-gray-800" : "bg-zinc-800 text-white"
                }`}
                onClick={() => navigate(isBackgroundRemovalPage ? "/text-to-image" : "/bgremoval")}
              >
                {isBackgroundRemovalPage ? (
                  <>
                    Text to Image Generator
                    <img
                      className="w-3 sm:w-4 filter invert-0 brightness-0 "
                      src={assets.arrow_icon || "/placeholder.svg"}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    Remove Background
                    <img className="w-3 sm:w-4" src={assets.arrow_icon || "/placeholder.svg"} alt="" />
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star || "/placeholder.svg"} alt="Credit" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">Credit Left: {credit}</p>
            </button>

            <p className={`pl-4 ${isBackgroundRemovalPage || isBackgroundResult ? "text-white" : "text-gray-600"}`}>
              {user.name}
            </p>

            <div className="relative group">
              <img src={assets.profile_icon || "/placeholder.svg"} className="w-10 drop-shadow-sm" alt="Profile" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm text-black">
                  <li onClick={logOut} className="px-2 py-1 cursor-pointer pr-10">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              className={`px-7 py-2 sm:px-10 text-sm rounded-full ${
                isBackgroundRemovalPage || isBackgroundResult ? "bg-white text-black" : "bg-zinc-800 text-white"
              }`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </>
        )}
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 sm:px-6">
          {user ? (
            <div className="flex flex-col gap-4">
              {!isHomePage && (
                <button
                  className={`flex items-center justify-center gap-4 px-4 py-2 text-sm rounded-full ${
                    isBackgroundRemovalPage || isBackgroundResult
                      ? "bg-blue-100 text-gray-800"
                      : "bg-zinc-800 text-white"
                  }`}
                  onClick={() => {
                    navigate(isBackgroundRemovalPage ? "/text-to-image" : "/bgremoval")
                    toggleMenu()
                  }}
                >
                  {isBackgroundRemovalPage ? "Text to Image Generator" : "Remove Background"}
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/buy")
                  toggleMenu()
                }}
                className="flex items-center justify-center gap-2 bg-blue-100 px-4 py-2 rounded-full"
              >
                <img className="w-5" src={assets.credit_star || "/placeholder.svg"} alt="Credit" />
                <p className="text-sm font-medium text-gray-600">Credit Left: {credit}</p>
              </button>

              <p className="text-center text-gray-600">{user.name}</p>

              <button
                onClick={() => {
                  logOut()
                  toggleMenu()
                }}
                className="text-sm text-gray-600 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/buy")
                  toggleMenu()
                }}
                className="text-sm text-gray-600 py-2"
              >
                Pricing
              </button>
              <button
                className={`px-7 py-2 text-sm rounded-full ${
                  isBackgroundRemovalPage || isBackgroundResult ? "bg-white text-black" : "bg-zinc-800 text-white"
                }`}
                onClick={() => {
                  setShowLogin(true)
                  toggleMenu()
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar











