import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCircleX } from "@tabler/icons-react";
import { changePassword, sendOtp, verifyOtp } from "../services/UserService";
import Notification from "./Notification";

const ForgetPassword = ({isAllow}) => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [notification, setNotification] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerified,setIsVerified] = useState();

  const navigate = useNavigate();
  const inputRef = useRef([]);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await sendOtp(email);
      console.log("OTP sent successfully", response);
      setNotification({ msg: "OTP sent successfully", color: "green" });
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setNotification({ msg: "Failed to send OTP", color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetEmail = (value) => {
    setEmail(value);
    setIsLoading(false);
    setIsOtpSent(false);
  };

  const resetSubmit = ()=> {
      setIsVerified(false);
      try{
        const data = {email,password};
        changePassword(data);
        <Notification msg="password changed successfully" color="green"/>
      }catch(err){
         console.log("password not changed", err.response.data.errorMessage);
         <Notification msg="password not changed" color="red"/>
      }
  }

  const hanldeChangeOtp = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    if (value && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
    if (index === otp.length - 1) {
      handleOtpVerify();
    }
  };

  const handleOtpVerify = (value) => {
    console.log("OTP entered:", value);
    verifyOtp(email, value)
      .then((response) => {
        console.log("OTP verified successfully", response);
        setIsVerified(true)
        isOtpSent(false)
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  useEffect(() => {
  const value = otp.join('');
  if (value.length === 6 && otp.every(d => d.trim() !== '')) {
    handleOtpVerify(value);
  }
}, [otp]);


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCut = () => {
    navigate(-1);
  }

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative bg-mine-shaft-900 p-6 rounded-lg w-[30vw] lg-mx:w-[40vw] md-mx-w-[60vw]">
       <div>
           <h1 className="text-2xl lg-mx:text-xl text-center text-mine-shaft-300 font-bold mb-4">
        Forget Password
      </h1>   
     
           <button
      className="absolute top-3 right-3 text-bright-sun-400"
      onClick={handleCut}
    >
      <IconCircleX size={28} />
    </button>``
       </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleSetEmail(e.target.value)}
            className="w-full border border-bright-sun-300 bg-mine-shaft-700 px-4 py-2 pr-24 text-lg lg-mx:text-sm text-mine-shaft-300 outline-none rounded"
          />
          <button
            className={`absolute right-1 top-1/2 -translate-y-1/2 bg-bright-sun-500 text-white px-3 py-1 rounded text-sm transition-all duration-200 flex items-center justify-center ${
              isOtpSent ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendOtp}
            disabled={isLoading || isOtpSent}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </div>

      <div className="absolute top-10">
        {notification && (
          <Notification msg={notification.msg} color={notification.color} />
        )}
      </div>

      {isOtpSent && (
        <div className="mt-6 flex justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => hanldeChangeOtp(e, index)}
              ref={(el) => (inputRef.current[index] = el)}
              className="w-10 h-10 border border-bright-sun-300 bg-mine-shaft-700 text-lg text-mine-shaft-300 outline-none rounded mx-1 text-center"
            />
          ))}
        </div>
      )}

      {isVerified && (
        <div>
          <div className="mt-5">
            <input type="password" placeholder="Changed password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-bright-sun-300 bg-mine-shaft-700 px-4 py-2 pr-24 text-lg text-mine-shaft-300 outline-none rounded"/>
          </div>
          <button className="w-full mt-5 text-xl text-mine-shaft-300 px-4 py-2 border border-bright-sun-300 outline-none"
           onClick={resetSubmit}>
            Reset
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ForgetPassword;
