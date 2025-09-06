import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUsers } from "../services/UserService";
import { validateUserForm } from "../services/validation";
import Notification from "./Notification";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [che, setChe] = useState(false);
  const [selectedType, setSelectedType] = useState("APPLICANT");
  const [errors,setErrors] = useState({})
  const [notification, setNotification] = useState({ msg: "", color: "" });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCheckBox = () => {
    setChe(!che);
  };


    useEffect(() => {
  if (notification.msg) {
    const timer = setTimeout(() => {
      setNotification({ msg: "", color: "" });
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [notification]);


    const handleSubmit = async () => {
  const validationError = validateUserForm({
    name,
    email,
    password,
    termsAccepted: che,
  });

  if (Object.keys(validationError).length > 0) {
    setErrors(validationError);
    return;
  }

  setErrors({}); // ✅ clear previous errors if validation passed

  const data = { name, email, password, accountType: selectedType };
  try {
    const response = await registerUsers(data);
    console.log("User registered successfully:", response);
     setNotification({ msg: "User registered successfully!", color: "green" });
     setTimeout(() => {
    navigate("/login");
  }, 2000);
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    const errorMessage =
    error.response?.data?.message || "Registration failed. Please try again.";
    setNotification({ msg: errorMessage, color: "red" });
  }
};

   
  return (
    <div className="w-1/2 px-10 relative">
      <div className="text-center absolute w-96 right-[75%] top-5">
         {notification.msg && <Notification msg={notification.msg} color={notification.color} />}
      </div>
      <div className="flex flex-col justify-center items-center h-full gap-3">
        <div className="text-mine-shaft-200 text-3xl font-semibold">
          Create Account
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="text-mine-shaft-200 text-lg">Full Name </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              name="fullName"
              autoComplete="name"
              required
              aria-required="true"
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-mine-shaft-100 px-3 py-2 text-sm text-mine-shaft-200 w-96 xs-mx:w-64"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="text-mine-shaft-200 text-lg">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              name="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-mine-shaft-100 px-3 py-2 text-sm text-mine-shaft-200 w-96 xs-mx:w-64"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="text-mine-shaft-200 text-lg">password</label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              name="email"
              autoComplete="email"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-mine-shaft-100 px-3 py-2 text-sm text-mine-shaft-200 w-96 xs-mx:w-64"
            />
            {errors.password && <p className="text-red-500 text-sm w-96">{errors.password}</p>}
          </div>

          <div className="flex flex-row xs-mx:flex-col items-center gap-4 [&>label]:text-mine-shaft-300 [&>label]:text-xl">
             <label
              className={`px-6 py-4 flex gap-2 accent-yellow-500 border transition duration-200 ease-in-out ${
                selectedType === "APPLICANT"
                  ? "border-bright-sun-200"
                  : "border-mine-shaft-800"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="APPLICANT"
                checked={selectedType === "APPLICANT"}
                onChange={handleChange}
              />
              APPLICANT
            </label>

            <label
              className={`px-6 py-4 flex gap-2 accent-yellow-500 border transition duration-200 ease-in-out ${
                selectedType === "EMPLOYER"
                  ? "border-bright-sun-200"
                  : "border-mine-shaft-800"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="EMPLOYER"
                checked={selectedType === "EMPLOYER"}
                onChange={handleChange}
              />
              EMPLOYER
            </label>
          </div>

       

        </div>
        <div className="flex items-center">
          <label>
            <input
              type="checkbox"
              name="terms"
              onClick={handleCheckBox}
              className="w-5 h-5 accent-yellow-400"
            />
            <span className="text-mine-shaft-300 pl-3 text-lg">I accept </span>{" "}
            <span className="text-bright-sun-300 text-lg">
              terms and conditions
            </span>
          </label>
        </div>
        <div className="w-[57%]">
          <button
            className="text-xl bg-yellow-600 text-black px-2 py-2 w-full xs-mx:px-1 xs-mx:py-1 xs-mx:text-sm hover:bg-yellow-400 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            sign up
          </button>
        </div>
        <div className="text-mine-shaft-300 text-lg">
          Have an account?{" "}
          {/* <Link to="/login" className="text-bright-sun-400 hover:underline"
          onClick={()=>setErrors({})}>
            Login
          </Link> */}

          <Link to="/signup" className="text-bright-sun-400 hover:underline">
              login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
