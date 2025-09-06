import React, { useRef, useState, useEffect } from "react";
import {
  IconAnchor,
  IconBell,
  IconMenu2,
  IconSettings,
} from "@tabler/icons-react";
import Avatar from "../component/Avatar";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
import { useDispatch, useSelector } from "react-redux";
import { setUpResponseInterceptor } from "../interceptor/AxiosInterCeptor";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../slices/UserSlice";

const Header = () => {
  const [drop, setDrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrop = () => {
    setDrop(!drop);
  };

  useEffect(() => {
    setUpResponseInterceptor(navigate);
    console.log(menuOpen);
  }, [navigate]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ ...decoded, email: decoded.sub }));
      } catch (err) {
        console.error("Failed to decode JWT:", err);
        // Optionally, remove invalid token
        // dispatch(removeJwt());
      }
    }
  }, [token, dispatch]);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDrop(false);
      }
    };

    if (drop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drop]);

  return (
    location.pathname !== "/signup" && (
      <div className="w-full bg-mine-shaft-950 h-24 px-6 text-white flex justify-between items-center">
        {/* Left */}
        <div className="flex gap-1 items-center text-bright-sun-400">
          <IconAnchor className="h-10 w-10" />
          <h1 className="xs:flex hidden text-4xl font-semibold">JobHook</h1>
        </div>
        <div className="bs:flex hidden">
          <NavLinks />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-3 items-center">
              <div className="xsm:flex hidden font-semibold">{user.name}</div>
              <div className="relative" ref={menuRef}>
                <div onClick={handleDrop} className="cursor-pointer">
                  <Avatar />
                </div>
                {drop && (
                  <div className="absolute top-16 -right-16 z-50">
                    <ProfileDropDown />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/signup"
              className="px-2 py-1 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15"
            >
              Login
            </Link>
          )}

          <div className="bg-mine-shaft-950 p-2 rounded-full relative">
            <IconBell stroke={1.5} />
            <span className="absolute top-1 right-2 h-3 w-3 bg-bright-sun-400 rounded-full border-2 border-mine-shaft-950 animate-pulse"></span>
          </div>

          {/* Menu icon only for small screens */}
          <div className="bs:hidden">
            <IconMenu2
              className="lg:hidden cursor-pointer"
              onClick={handleMenu}
            />
            {menuOpen && (
              <div className="absolute top-24 right-0 bg-mine-shaft-900 h-[80vh] w-[30wh] p-4 rounded-md z-50 transition-all duration-300 ease-in-out">
                <NavLinks vertical={true} setMenuOpen={setMenuOpen} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
