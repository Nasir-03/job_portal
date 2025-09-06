import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconBookmark,
  IconMapPin,
  IconBriefcase,
  IconCoinFilled,
  IconBrandWordpress,
} from "@tabler/icons-react";
import Border from "../component/Border";
import { timeAgo } from "../Data/Data";
import { postJob } from "../services/JobService";

const OverViewTab = ({ selectedJobs, isClosed }) => {
  if (!selectedJobs) {
    return (
      <div className="text-red-500 font-semibold text-center mt-10">
        ❌ Job with this ID was not found
      </div>
    );
  }

  useEffect(() => {
    console.log(selectedJobs);
  }, [isClosed]);

  const handleClosed = async () => {
    try {
      const response = await postJob({
        ...selectedJobs,
        jobStatus: "CLOSED",
      });
      console.log("Succesfully closed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-10 px-10">
      <div className="">
        <div className="flex justify-between items-center xs-mx:flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-mine-shaft-700 rounded-xl shrink-0">
              <img
                src="/companies/microsoft.webp"
                alt=""
                className="h-20 w-20 px-2 xs-mx:h-14 xs-mx:w-14"
              />
            </div>
            <div className="text-mine-shaft-300">
              <div className="font-bold text-xl xs-mx:text-lg">{selectedJobs.jobTitle}</div>
              <div className="xs-mx:text-sm">
                {selectedJobs.company} &#8226; {timeAgo(selectedJobs.postTime)},{" "}
                {selectedJobs.applicants?.length} applicant
              </div>
            </div>
          </div>
          <div className="text-bright-sun-500 xs-mx:flex-row xs-mx:gap-7 font-semibold flex flex-col items-center gap-3">
            {/* <Link to='/apply-job'> */}
            {!isClosed ? (
              <>
                <Link to={`/post-jobs/${selectedJobs.id}`}>
                  <button className="border px-2 py-2 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-sm bg-opacity-15">
                    Edit
                  </button>
                </Link>
                <button
                  className="border px-2 py-2 bg-red-400 text-red-600 rounded-lg text-sm bg-opacity-15"
                  onClick={handleClosed}
                >
                  Close
                </button>
              </>
            ) : (
              <div>
                <button className="border px-2 py-2 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-sm bg-opacity-15">
                  ReOpen
                </button>
              </div>
            )}
            {/* </Link> */}
            {/* <IconBookmark stroke={1.5} className='h-8 w-8'/> */}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <Border />
      </div>

      <div className="pt-10 grid grid-cols-4 sm-mx:grid-cols-2 mb-5">
        <div className="flex flex-col items-center">
          <div className="bg-gold-glow">
            <IconMapPin
              stroke={1.5}
              className="w-10 h-10 xs-mx:h-6 xs-mx:w-6 text-bright-sun-200  rounded-full"
            />
          </div>
          <div>
            <div className="text-mine-shaft-300 font-semibold text-xl xs-mx:text-sm">
              Location
            </div>
            <div className="text-mine-shaft-300 text-sm xs-mx:text-base">
              {selectedJobs.location}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gold-glow">
            <IconBriefcase
              stroke={1.5}
              className="w-10 h-10 xs-mx:h-6 xs-mx:w-6 text-bright-sun-200  rounded-full"
            />
          </div>
          <div>
            <div className="text-mine-shaft-300 font-semibold text-xl xs-mx:text-sm">
              Experience
            </div>
            <div className="text-mine-shaft-300 text-sm xs-smx:text-base">
              {selectedJobs.experience}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gold-glow">
            <IconCoinFilled
              stroke={1.5}
              className="w-10 h-10 xs-mx:h-6 xs-mx:w-6 text-bright-sun-200  rounded-full"
            />
          </div>
          <div>
            <div className="text-mine-shaft-300 font-semibold text-xl xs-mx:text-sm">
              salary
            </div>
            <div className="text-mine-shaft-300 text-sm xs-mx:text-base">
              {selectedJobs.packagedOffer} LPA
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gold-glow">
            <IconBrandWordpress
              stroke={1.5}
              className="w-10 h-10 xs-mx:h-6 xs-mx:w-6 text-bright-sun-200  rounded-full"
            />
          </div>
          <div>
            <div className="text-mine-shaft-300 font-semibold text-xl xs-mx:text-sm">
              Job Type
            </div>
            <div className="text-mine-shaft-300 text-sm xs-mx:text-base">
              {selectedJobs.jobType}
            </div>
          </div>
        </div>
      </div>

      <Border />

      {/* Skills */}

      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5">
          Requires Skills
        </div>
        <div className="flex gap-3 mb-3">
          {selectedJobs?.skillsRequired?.map((item, index) => (
            <div className="pt-3 flex flex-wrap  items-center" key={index}>
              <div className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Border />

      {/* About Job */}

      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5">
          About job
        </div>
        <div className="text-mine-shaft-200 text-justify font-semibold">
          {selectedJobs.description}
        </div>
      </div>

      {/* Responsibility */}

      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5">
          Responsibilities
        </div>

        <div className="text-mine-shaft-300 leading-loose ">
          <ul className="list-disc list-inside space-y-1 marker:text-bright-sun-400">
            <li>3+ years of experience here working on his field here.</li>
            <li>
              bechlor degree of computer science and software engineer and
              related degree{" "}
            </li>
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
          </ul>
        </div>
      </div>

      {/* Qualifications  */}

      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5">
          Qualifications and skill sets
        </div>

        <div className="text-mine-shaft-300 leading-loose ">
          <ul className="list-disc list-inside space-y-1 marker:text-bright-sun-400">
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
            <li>Design, Build test and teake care </li>
          </ul>
        </div>
      </div>

      <Border />
    </div>
  );
};

export default OverViewTab;
