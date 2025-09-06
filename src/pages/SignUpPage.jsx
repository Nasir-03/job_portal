// import React from 'react'
// import { IconAnchor } from '@tabler/icons-react'
// import SignUp from '../signUpLogin/SignUp'
// import Login from '../signUpLogin/Login'
// import { useLocation } from 'react-router-dom'

// const SignUpPage = () => {
//     const location = useLocation()

//   return (
//     <div className='min-h-[90vh] font-poppins bg-mine-shaft-950 overflow-hidden'>
//        <div className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000
//         ${location.pathname == '/sign'?'-translate-x-1/2':'translate-x-0'}`}>
//          <Login />
//         <div className={`w-1/2 h-full bg-mine-shaft-900 transition-all duration-1000 ease-in-out ${location.pathname=='/sign'?'rounded-r-[200px]':'rounded-l-[200px]'}`}>
//             <div className='flex h-full flex-col gap-3 items-center justify-center text-bright-sun-400'>
//                     <div className='flex gap-2'>
//                        <IconAnchor  className='h-20 w-20   '/>
//                     <h1 className='text-7xl font-semibold'>JobHook</h1>
//                     </div>
//                     <div className='text-mine-shaft-200 text-3xl font-semibold'>
//                         Find the made for you
//                     </div>
//                   </div>
//         </div>

//         <SignUp />
//        </div>
//     </div>
//   )
// }

// export default SignUpPage






import React from "react";
import { IconAnchor } from "@tabler/icons-react";
import SignUp from "../signUpLogin/SignUp";
import Login from "../signUpLogin/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/sign";

  return (
    <div className="min-h-screen font-poppins bg-mine-shaft-950 overflow-hidden">
      <div
        className={`w-full h-full flex flex-col md:flex-row [&>*]:flex-shrink-0 
        transition-all ease-in-out duration-1000
        ${isSignUp ? "md:-translate-x-1/2" : "translate-x-0"}`}
      >
        {/* ✅ Login (only visible when NOT signUp OR on desktop side) */}
        <div
          className={`w-full md:w-1/2 flex items-center justify-center p-6 
          ${isSignUp ? "hidden md:flex" : "flex"}`}
        >
          <Login />
        </div>

        {/* ✅ Branding Section (desktop only) */}
        <div
          className={`hidden md:flex w-1/2 h-[100vh] bg-mine-shaft-900 
          transition-all duration-1000 ease-in-out 
          ${isSignUp ? "rounded-r-[200px]" : "rounded-l-[200px]"}`}
        >
          <div className="flex h-full flex-col gap-3 items-center justify-center text-bright-sun-400 text-center">
            <div className="flex gap-2 items-center">
              <IconAnchor className="h-16 w-16 lg:h-20 lg:w-20" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                JobHook
              </h1>
            </div>
            <div className="text-mine-shaft-200 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-4">
              Find the made for you
            </div>
          </div>
        </div>

        {/* ✅ SignUp (only visible when signUp route OR on desktop side) */}
        <div
          className={`w-full md:w-1/2 flex items-center justify-center p-6 
          ${isSignUp ? "flex" : "hidden md:flex"}`}
        >
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
