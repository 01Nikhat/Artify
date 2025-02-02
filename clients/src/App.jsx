// import React, { useContext } from 'react'
// import Home from './pages/home'
// import BuyCredit from './pages/BuyCredit'
// import Result from './pages/Result'
// import {Routes,Route} from "react-router-dom";
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import { AppContext } from './context/AppContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BgRemoval from './pages/BgRemoval';
// import BgResult from './pages/BgResult';


// const App = () => {
//   const {showLogin} = useContext(AppContext);
//   return (
//     <div className='px-4 sm:px-10 md:px-14m lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
//       <ToastContainer  position='bottom-right' />
//         <Navbar />
//         {showLogin && <Login />}
//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/result' element={<Result />} />
//             <Route path='/buy' element={<BuyCredit />} />
//             <Route path='/bgremoval' element={<BgRemoval />} />
//             <Route path='/bgresult' element={<BgResult />} />
            
//           </Routes>
//           <Footer />
//     </div>
//   )
// }

// export default App


import React, { useContext } from 'react'
import Home from './pages/home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import {Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BgRemoval from './pages/BgRemoval';
import BgResult from './pages/BgResult';
import SVGDebugger from './components/SVGDebugger';

const App = () => {
  const {showLogin} = useContext(AppContext);
  return (
    <div className='px-4 sm:px-10 md:px-14m lg:px-28 min-h-screen bg-gradient-to-b
     from-teal-50 to-orange-50'>
      <SVGDebugger />
      <ToastContainer position='bottom-right' />
      <div data-component-name="Navbar" data-component-path="/components/Navbar">
        <Navbar />
      </div>
      {showLogin && <div data-component-name="Login" data-component-path="/components/Login"><Login /></div>}
      <Routes>
        <Route path='/' element={<div data-component-name="Home" data-component-path="/pages/home"><Home /></div>} />
        <Route path='/result' element={<div data-component-name="Result" data-component-path="/pages/Result"><Result /></div>} />
        <Route path='/buy' element={<div data-component-name="BuyCredit" data-component-path="/pages/BuyCredit"><BuyCredit /></div>} />
        <Route path='/bgremoval' element={<div data-component-name="BgRemoval" data-component-path="/pages/BgRemoval"><BgRemoval /></div>} />
        <Route path='/bgresult' element={<div data-component-name="BgResult" data-component-path="/pages/BgResult"><BgResult /></div>} />
      </Routes>
      <div data-component-name="Footer" data-component-path="/components/Footer">
        <Footer />
      </div>
    </div>
  )
}

export default App

