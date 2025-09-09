import React from "react";
import boy from "../assets/boys.png";
import { IconSearch } from '@tabler/icons-react';

const DreamPage = () => {
  return (
    <div className="flex sm-mx:flex-col items-center w-full p-4 h-[60vh] lg-mx:h-[70vh] sm-mx:h-[80vh] bs-mx:pt-0">
      <div className="w-[45%] sm-mx:w-full flex flex-col items-center justify-center px-12">
        <div className="text-6xl lg-mx:text-5xl bs-mx:text-4xl sm-mx:text-2xl leading-tight font-bold text-mine-shaft-100 [&>span]:text-bright-sun-300">
          Find your <span>dream job</span>With us
        </div>
        <div className="text-lg sm-mx:text-sm text-mine-shaft-200 mt-6 leading-8">
          Good life begins with a big company. Start explore of thousands of
          jobs in one place
        </div>
        <div className="mt-4 flex justify-center gap-4 items-end lg-mx:pl-5">
          <div className="w-40 bs-mx:w-32 md-mx:w-28 xsm-mx:w-24 bg-mine-shaft-700 p-2 rounded-md">
            <label className="block text-white text-sm mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Software Engineer"
              className="w-full p-1 rounded-md text-sm outline-none bg-transparent text-white"
            />
          </div>

           <div className="w-40 bs-mx:w-32 md-mx:w-28 xsm-mx:w-24 bg-mine-shaft-700 p-2 rounded-md">
            <label className="block text-white text-sm mb-1">Job Type</label>
            <input
              type="text"
              placeholder="Fulltime"
              className="w-full p-1 rounded-md text-sm outline-none bg-transparent text-white"
            />
          </div>
          <div className="h-full w-20 bs-mx:w-16">
            <IconSearch stroke={2} className="h-[85%] w-[85%] sm-mx:h-[70%] sm-mx:w-[70%] text-white cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* Right part */}
      <div className="w-[55%]">
        <div className="flex items-center justify-center sm-mx:gap-0">
            <img src="/boys.png" alt="boys" 
             className="h-[70vh] sm-mx:h-[50vh] object-contain w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DreamPage;
