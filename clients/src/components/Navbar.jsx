// import React, { useContext } from 'react'
// import {assets} from "../assets/assets";
// import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Navbar = () => {

// //const [user,setUser] = useState(null);
// const navigate = useNavigate();
// const {user,setShowLogin,logOut, credit} = useContext(AppContext)
// //console.log("User:", user, "Credits:", credit);
//   return (
//     <div className='flex items-center justify-between py-4'>
//       <Link to="/"><img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/></Link>

//       <div >
//         {user ? 
        
//         <div className='flex items-center gap-2 sm:gap-3'>
//           <div className='flex items-center justify-between'>
          
//             <button className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full " onClick={() => navigate('/bgremoval')}>BG Removal <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" /></button>
//           </div>
//           <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
//             <img className='w-5' src={assets.credit_star} alt="" />
//             <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit Left : {credit}</p>
//           </button>
//           <p className='text-gray-600 max-sm:hidden pl-4'>{user.name}</p>
//           <div className='relative group'>
//             <img src={assets.profile_icon} className='w-10 drop-shadow-sm' alt="" />
//             <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
//               <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
//                 <li onClick = {logOut} className='px-2 py-1 cursor-pointer pr-10'>Logout</li>
//               </ul>
//             </div>
//           </div>
         

//         </div> 
//         :
//         <div className='flex items-center gap-2 sm:gap-5'>
//           <p onClick= {()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
//           <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full' onClick={()=>setShowLogin(true)}>Login</button>
//         </div>
//  }
       
       
//       </div>
//     </div>
    
//   )
// }

// export default Navbar



import { useContext } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setShowLogin, logOut, credit } = useContext(AppContext)

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 relative z-50 bg-transparent">
      <Link to="/">
        <img src={assets.logo || "/placeholder.svg"} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <button
                className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
                onClick={() => navigate("/bgremoval")}
              >
                BackGround Removal <img className="w-3 sm:w-4" src={assets.arrow_icon || "/placeholder.svg"} alt="" />
              </button>
            </div>
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star || "/placeholder.svg"} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">Credit Left : {credit}</p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">{user.name}</p>
            <div className="relative group">
              <img src={assets.profile_icon || "/placeholder.svg"} className="w-10 drop-shadow-sm" alt="" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 ">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li onClick={logOut} className="px-2 py-1 cursor-pointer pr-10">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar






