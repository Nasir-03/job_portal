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
