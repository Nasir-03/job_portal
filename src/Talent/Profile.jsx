import React, { useEffect } from "react";
import background from "../assets/background.avif";
import avatar from "../assets/avataar.jpg";
import { IconMapPin } from "@tabler/icons-react";
import Experience from "./Experience";
import Certification from "./Certification";
import { getUserProfile } from "../services/ProfileService";

const Profile = ({profileData}) => {

  useEffect(()=>{
    console.log(profileData);
  },[profileData])

  return (
    <div className="w-full">
      <div className="w-full relative">
        <img
          src={background}
          alt=""
          className="h-[200px] w-full rounded-2xl object-cover"
        />
        <img
          src={avatar}
          className="h-48 w-48 lg-mx:h-40 lg-mx:w-40 sm-mx:h-32 sm-mx:w-32 sm-mx:top-28 rounded-full -bottom-1/3 absolute left-4 border-8 border-mine-shaft-950"
        />
      </div>

      <div className="flex justify-between px-10 mt-16 text-mine-shaft-300">
        <div>
          <div className="text-3xl font-semibold">{profileData?.name}</div>
          <div className="text-xl xs-mx:text-lg">{profileData.jobTitle} &#8226; {profileData?.company}</div>
          <div className="flex gap-2">
            <div className="text-xl">
              <IconMapPin
                stroke={2}
                className="h-8 w-8 text-mine-shaft-300 rounded-full p-2 bg-mine-shaft-700"
              />
            </div>
             {profileData?.location}
          </div>
        </div>
        <div>
          <button className="px-4 py-2 text-mine-shaft-300 border border-bright-sun-400 text-xl rounded-xl
          xs-mx:px-2 xs-mx:py-1 xs-mx:text-sm">
            Message
          </button>
        </div>
      </div>

      {/* Divider */}

      <div className="border-b border-mine-shaft-300 mt-10 px-2"> </div>

      <div>
        <div className="text-3xl font-bold text-mine-shaft-300 mt-10">
          About
        </div>
        <div className="text-xl xs-mx:text-lg text-mine-shaft-300 pt- text-justify">
           {profileData?.about}
        </div>
        <div></div>
      </div>

       <div className="border-b border-mine-shaft-300 mt-10 px-2"> </div>

      <div>
        <div className="text-3xl font-bold text-mine-shaft-300 mt-10">
          Skills
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {profileData.skills?.map((items,index) => (
            <div key={index}>
               <div className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
              {items}
            </div>
            </div>
          ))}
        </div>
      </div>

      <div>
         <div className="border-b border-mine-shaft-300 mt-10 px-2"> </div>
        <div className="text-3xl font-bold text-mine-shaft-300 mt-10">
          Experience
        </div>
        <div><Experience profileData={profileData}/></div>
        <div><Certification /></div>
      </div>
    </div>
  );
};

export default Profile;
