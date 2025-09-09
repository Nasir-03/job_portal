import React from "react";

const Working = () => {
  return (
    <div>
      <div className="text-4xl bs-mx:text-3xl md-mx:2xl xsm-mx:text-xl mt-10 mb-6 text-mine-shaft-100 text-center">
        How it <span className="text-bright-sun-400">Works</span>
      </div>

      <div className="text-center text-mine-shaft-200 text-lg md-mx:text-sm">
        Effortlessly navigate through the process and land your dream job.
      </div>

      <div className="flex flex-col md:flex-row relative text-white mt-20 xs-mx:mt-10 gap-10 items-center justify-center">
        {/* Image wrapper (relative) */}
        <div className="relative w-[50%] bs-mx:w-[45%] md-mx:w-full xs-mx:mt-0 flex justify-center">
          <img
            src="/Girl.png"
            alt="girls images"
            className="h-[50vh] xs-mx:h-[30vh] w-full object-contain rounded-lg"
          />

          {/* Avatar overlay */}
          <div
            className="absolute top-1/2 left-[65%] xl-mx:left-[70%] bs-mx:left-[85%] md-mx:left-[60%] -translate-x-1/2 -translate-y-1/2
      w-24 xs-mx:w-28 sm:w-32 md:w-40 xs-mx:top-3/4 xs-mx:left-[65%]
      border border-yellow-500 rounded-xl text-center px-2 py-2 backdrop-blur-md"
          >
            <div className="h-14 w-14 xs-mx:h-16 xs-mx:w-16 sm:h-20 sm:w-20 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center border-2 mx-auto">
              <img
                src="/avataar.jpg"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-2">
              <h1 className="text-sm sm:text-base md:text-lg">
                Complete your profile
              </h1>
              <p className="text-xs sm:text-sm">70% completed</p>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="flex flex-col gap-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full lg-mx:h-12 lg-mx:w-12 xs-mx:h-10 xs-mx:w-10 shrink-1 bg-yellow-400 border border-white"></div>
            <div>
              <h1 className="text-white font-semibold">Build your resume</h1>
              <p className="text-white">
                Create a standout resume with your skills.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 lg-mx:h-12 lg-mx:w-12 xs-mx:h-10 xs-mx:w-10 shrink-1 rounded-full bg-yellow-400 border border-white"></div>
            <div>
              <h1 className="text-white font-semibold">Apply for job</h1>
              <p className="text-white">
                Find and apply for jobs that match your skills.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 lg-mx:h-12 lg-mx:w-12 xs-mx:h-10 xs-mx:w-10 shrink-1 rounded-full bg-yellow-400 border border-white"></div>
            <div>
              <h1 className="text-white font-semibold">Get Hired</h1>
              <p className="text-white">
                Connect with employers and start your new job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
