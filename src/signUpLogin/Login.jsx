import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { loginUsers } from "../services/UserService";
import Notification from "./Notification";
import { validLogin } from "../services/validation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/UserSlice";
import { setJwt } from "../slices/JwtSlice";
import loginUser from "../services/AuthService";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ msg: "", color: "" });
  const [error, setError] = useState({});
  const [isAllow, setIsAllow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = { email, password };

  useEffect(() => {
    if (notification.msg) {
      const time = setTimeout(() => {
        setNotification({ msg: "", color: "" });
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [notification]);

  const handleLogin = async () => {
    const validError = validLogin(email, password);

    if (Object.keys(validError).length > 0) {
      setError(validError);
      return;
    }

    setError({});
    setLoading(true);

    try {
      const response = await loginUser(data);
      console.log("Login successful", response);
      setNotification({ msg: "Login Successfully", color: "green" });

      dispatch(setJwt(response.jwt));
      const decoded = jwtDecode(response.jwt);
      console.log("Decoded JWT:", decoded);
      dispatch(setUser({ ...decoded, email: decoded.sub }));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setNotification({ msg: errorMessage, color: "red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 px-10 relative">
      <div className="pb-5">
      <button
        className="px-2 py-1 mt-2 bg-bright-sun-300 text-bright-sun-400 
      rounded-lg text-xl bg-opacity-15"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      </div>
      <div className="text-center !absolute w-96 left-[75%] top-5">
        {notification.msg && (
          <Notification msg={notification.msg} color={notification.color} />
        )}
      </div>
      <div className="flex flex-col justify-center items-center h-full gap-3">
        <div className="text-mine-shaft-200 text-3xl font-semibold">Login</div>
        <div className="flex flex-col gap-2 w-96 xs-mx:w-60">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-mine-shaft-200 text-lg">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              name="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-mine-shaft-100 px-3 py-2 text-lg text-mine-shaft-200 w-full"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-mine-shaft-200 text-lg">Password</label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              name="password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-mine-shaft-100 px-3 py-2 text-lg text-mine-shaft-200 w-full"
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
        </div>
        <div className="w-[75%]">

          <button
          onClick={handleLogin}
            disabled={loading}
             className={`w-full  text-black px-2 py-2 text-xl rounded-lg hover:bg-yellow-700 transition-colors duration-300
              md:w-32 lg:w-40 h-10 flex items-center justify-center 
             bg-bright-sun-400 font-semibold 
              ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                {/* spinner size adjusts per screen */}
                <div
                  className="h-5 w-5 border-4 border-black border-t-transparent 
                   rounded-full animate-spin
                   sm:h-6 sm:w-6 md:h-7 md:w-7 xs-mx:p-5"
                ></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="text-mine-shaft-300 text-lg">
          Don’t have an account?{" "}
          <Link to="/sign" className="text-bright-sun-400 hover:underline">
            Sign Up
          </Link>
        </div>
        <div
          className="text-mine-shaft-300 text-lg curor-pointer hover:underline
          "
          onClick={() => setIsAllow(!isAllow)}
        >
          <Link
            to="/forgot-password"
            state={{ isAllow: true }}
            className="text-bright-sun-400"
          >
            Forget Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
