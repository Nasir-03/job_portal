import React from "react";
import { formatDateTime } from "../Data/Data";

const Experience = ({profileData}) => {
  return (
    <>
    <div className="pt-10">
      {profileData?.experiences?.map((items,index) => (
        <div key={index}>
      <div className="flex justify-between items-center md-mx:flex-col md-mx:items-start">
        <div className="flex items-center gap-6 md-mx:justify-between">
          <div className="bg-mine-shaft-700 rounded-xl">
            <img src="/companies/microsoft.webp" alt="" className="h-16 w-16" />
          </div>
          <div className="text-mine-shaft-300">
            <div className="font-bold text-xl">{items.jobTitle}</div>
            <div>{items.company} &#8226; {items.location}</div>
          </div>
        </div>
        <div className="text-mine-shaft-300 font-semibold">
          {formatDateTime(items.startDate)} - {formatDateTime(items.endDate)}
        </div>
      </div>
      <div className="text-mine-shaft-300 text-sm text-justify pt-5 pb-5">
         {items.description}
      </div>
      </div>
       ))}
    </div>

    
    </>
  );
};

export default Experience;

