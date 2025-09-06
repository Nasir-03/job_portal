// import React from 'react'
// import Login from './Login'
// import ForgetPassword from './ForgetPassword'
// import SignUpPage from '../pages/SignUpPage'

// const LoginWithPasswordModals = () => {
//   return (
//     <div>
//       <div className='relative blur-sm bg-white/30'>
//       {/* <div className="relative backdrop-blur-sm bg-white/30 rounded-xl shadow-md w-fit mx-auto"> */}
//         <SignUpPage />
//       </div>
//       <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
//         <ForgetPassword />
//       </div>
//     </div>
//   )
// }

// export default LoginWithPasswordModals

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";

const LoginWithPasswordModals = () => {
  const location = useLocation();
  const isForgotPage = location.pathname === "/forgot-password";

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-mine-shaft-900">
      {/* Background login */}
      <div className={`${isForgotPage ? "blur-sm" : ""} transition-all duration-300`}>
        <Login />
      </div>

      {/* Modal only on /forgot-password */}
      {isForgotPage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <ForgetPassword />
        </div>
      )}
    </div>
  );
};

export default LoginWithPasswordModals;
