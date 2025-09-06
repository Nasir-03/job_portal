// import React from "react";
import { IconBookmark, IconClockHour4 } from "@tabler/icons-react";
import { timeAgo } from "../Data/Data";
import { useEffect } from "react";


const HistoryCard = ({ activeTab, jobs = [] }) => {
  const labels = {
    SAVED: "SAVED",
    APPLIED: "APPLIED",
    OFFERED: "OFFERED",
    INTERVIEWING: "INTERVIEWING",
  };

  useEffect(()=>{
    console.log(jobs)
  },[jobs])

  const companyImage = 
      {
         microsoft: '/companies/microsoft.webp',
         amazon: '/companies/amazon.webp',
          netflix: '/companies/netflix.webp',
         google: '/companies/google.webp',
         spotify: '/companies/spotify.webp',
         figma: '/companies/figma.webp',
          meta: '/companies/meta.webp',
          pinterest: '/companies/pinterest.webp',
          oracle: '/companies/oracle.webp',
          walmart: '/companies/walmart.webp',
          flipkart: '/companies/flipkart.png',
          // <img src={companyImage[job.company?.toLowerCase()]}
      }

  return (
    <div className="grid grid-cols-4 lg-mx:grid-cols-3 md-mx:grid-cols-2 xs-mx:grid-cols-1 pt-5 gap-3 px-5">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-mine-shaft-900 rounded-xl flex flex-col gap-3 p-2 cursor-pointer"
        >
          <div className="flex items-center justify-evenly">
            <div className="bg-mine-shaft-700 rounded-full">
              <img src={companyImage[job.company?.toLowerCase()]} className="h-16 w-16
              object-contain md-mx:h-8 md-mx:w-8"/>
            </div>
            <div className="text-mine-shaft-300 md-mx:pl-2">
              <div className="text-xl font-semibold md-mx:text-lg">{job.jobTitle}</div>
              <div className="text-sm">
                {job.company}.{" "}
                {job.applicants?.length ? job.applicants.length : 0} applications
              </div>
            </div>
            <div>
              <IconBookmark
                stroke={2}
                className="text-white hover:text-bright-sun-400"
              />
            </div>
          </div>

          <div
            className="flex flex-wrap gap-2 justify-between px-4 [&>div]:py-1 [&>div]:px-2 [&>div]:text-bright-sun-400
                      [&>div]:bg-mine-shaft-700 [&>div]:rounded-xl text-sm"
          >
            <div>Entry Level</div>
            <div>Part Time</div>
            <div>Internship</div>
          </div>

          <div className="text-sm text-mine-shaft-300 text-justify px-2 line-clamp-3">
            {job.description}
          </div>

          {/* Divider */}
          <div className="px-2">
            <div className="border-b border-mine-shaft-300 mt-2 px-2"></div>
          </div>

          <div className="flex justify-between p-2">
            <div className="text-xl text-mine-shaft-300">
              ₹ {job.packagedOffer} Lpa
            </div>
            <div className="flex gap-2 items-center">
              <IconClockHour4 stroke={2} className="text-mine-shaft-300" />
              <div className="text-mine-shaft-200 text-sm">
                {labels[activeTab]} • {timeAgo(job.postTime)} 
              </div>
            </div>
          </div>
          <div >
            <button className="w-full bg-bright-sun-400 text-mine-shaft-600 p-2 font-sm hover:bg-bright-sun-300">View jobs</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HistoryCard;