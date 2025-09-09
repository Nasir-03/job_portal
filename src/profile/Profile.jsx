import React, { useEffect, useState } from "react";
import Experience from "./Experience";
import Certification from "./Certification";
import Border from "../component/Border";
import Info from "./Info";
import About from "./About";
import Skill from "./Skill";

const Profile = () => {

  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // you can also remove this if you want instant scroll
  });
}, []);



  return (
    <div className="w-3/4 mx-auto pt-5">
      <Info />

      {/* Divider */}

      <div className="pt-5">
        <Border />
      </div>

        <About />

      <div className="pt-5">
        <Border />
      </div>
     

        <div>
          <Skill />
        </div>

        <div>
          <Experience />
        </div>

          <div>
            <Certification />
        </div>
      
    </div>
  );
};

export default Profile;
