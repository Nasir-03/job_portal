import {
  IconHeart,
  IconClockHour4,
  IconCalendarWeek,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Data/Data";
import { getUserProfile } from "../services/ProfileService";

const Rejected = ({ jobList }) => {
  const [appliedJob, setAppliedJob] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (jobList) {
      setAppliedJob(jobList);
    }
  }, [jobList]);

  useEffect(() => {
    if (jobList.length > 0) {
      const fetchProfiles = async () => {
        try {
          let allProfiles = [];
          for (const job of jobList) {
            const response = await getUserProfile(job.applicantId);
            allProfiles.push(response);
            console.log("checking jobs ", response);
          }
          setProfiles(allProfiles);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProfiles();
    }
  }, [jobList]);

  useEffect(() => {
    console.log("profiles are ", profiles);
  }, [profiles]);

  const handleProfile = (item) => {
    console.log(item);
  };

  return (
    <div>
      {profiles.length > 0 ? (
        <div className="grid grid-cols-3 lg-mx:grid-cols-2 bs-mx:grid-cols-3 md-mx:grid-cols-2 xs-mx:grid-cols-1 gap-5">
          {/* <div className="bg-mine-shaft-900 rounded-xl flex flex-col gap-3 p-2"> */}
          {profiles.map((items, index) => (
            <div
              key={index}
              className="bg-mine-shaft-900 rounded-xl leading-snug p-2"
            >
              <div className="flex items-center justify-evenly">
                <div className="bg-mine-shaft-700  rounded-full">
                  {/* <img src={avatar} alt="" className="w-16 h-16 rounded-full" /> */}
                </div>
                <div className="text-mine-shaft-300">
                  <div className="text-xl font-semibold">{items.jobTitle}</div>
                  <div className="text-sm">
                    {items.company}. {items.aplicants?.length} application
                  </div>
                </div>
                <div>
                  <IconHeart stroke={2} className="text-white" />
                </div>
              </div>

              <div
                className="flex gap-2 flex-wrap justify-between px-4 [&>div]:py-1 [&>div]:px-2 [&>div]:text-bright-sun-300
                         [&>div]:bg-mine-shaft-900 [&>div]:rounded-xl text-sm"
              >
                {items.skills?.map(
                  (skill, ind) => ind < 4 && <div key={ind}>{skill}</div>
                )}
              </div>

              <div className="text-sm text-mine-shaft-300 text-justify px-2 line-clamp-3">
                {items.about}
              </div>
              {/* Divider */}
              <div className="px-2">
                <div className="border-b border-mine-shaft-300 mt-2 px-2">
                  {" "}
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div className="text-xl text-mine-shaft-200">
                  &#8377; {items.packagedOffer} Lpa
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <IconClockHour4
                      stroke={2}
                      className="text-mine-shaft-300"
                    />
                  </div>
                  <div className="text-mine-shaft-200 text-sm">
                    {timeAgo(items.postTime)}
                  </div>
                </div>
              </div>
              <div className="px-2 pb-3">
                <div className="border-b border-mine-shaft-300 mt-2"></div>
              </div>

              <div className="flex flex-col sm:flex-row w-full justify-between gap-3 px-2 text-mine-shaft-300">
                {/* Profile Button */}
                <div className="flex-1">
                  <Link
                    to={`/talent-profile/${items.applicantId}`}
                    className="block"
                  >
                    <button className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm sm:px-1">
                      Profile
                    </button>
                  </Link>
                </div>

                {/* Message Button */}
                <div className="flex-1">
                  <button className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm sm:px-1">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* </div> */}
        </div>
      ) : (
        <div className="text-red-500 font-semibold text-center mt-10">
          Rejected List are not found
        </div>
      )}
    </div>
  );
};

export default Rejected;
