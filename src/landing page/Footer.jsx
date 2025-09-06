import React from "react";
import {
  IconAnchor,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return ( location.pathname != "/signup" &&
    <footer className="w-full text-mine-shaft-300 px-6 py-12  bg-mine-shaft-950 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div className="flex flex-col gap-4">
          <div className="text-bright-sun-400">
            <IconAnchor className="h-10 w-10" />
          </div>
          <p className="text-sm leading-relaxed">
            Job portal with user profiles, skill updates, certifications, work
            experience and admin job postings.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2 text-bright-sun-400">
            {[IconBrandInstagram, IconBrandX, IconBrandYoutube].map((Icon, idx) => (
              <div
                key={idx}
                className="bg-mine-shaft-700 p-3 rounded-full hover:bg-mine-shaft-600 transition-colors duration-300 cursor-pointer"
              >
                <Icon stroke={2} className="h-5 w-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-bright-sun-300 text-lg font-semibold mb-4">
            Product
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-bright-sun-400 cursor-pointer">Find Job</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Find Company</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Find Employee</li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-bright-sun-300 text-lg font-semibold mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-bright-sun-400 cursor-pointer">About Us</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-bright-sun-300 text-lg font-semibold mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-bright-sun-400 cursor-pointer">Help & Support</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">Feedback</li>
            <li className="hover:text-bright-sun-400 cursor-pointer">FAQs</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-mine-shaft-500 mt-10 border-t border-mine-shaft-700 pt-4">
        © {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
