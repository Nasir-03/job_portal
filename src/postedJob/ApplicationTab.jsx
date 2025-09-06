import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconHeart, IconClockHour4, IconCalendarWeek } from "@tabler/icons-react";
import { getUserProfile } from "../services/ProfileService";
import ScheduleModal from "./ScheduleModal ";
import { changeStatus } from "../services/JobService";
import { timeAgo } from "../Data/Data";

const ApplicationTab = ({ jobList, onStatusChange }) => {
  const [profiles, setProfiles] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

    useEffect(()=>{
      if (jobList.length > 0){
        const fetchProfiles = async() => {
           try{
              let allProfiles = [];
              for (const job of jobList) {
                const response = await getUserProfile(job.applicantId);
                allProfiles.push(response)
                console.log("checking jobs ",response)
              }
              setProfiles(allProfiles);
           }catch(err){
            console.error(err);
           }
        }
         fetchProfiles();
      }
    },[jobList])


  useEffect(() => {
    console.log("Profiles fetched: ", profiles);
     console.log("JobList is ",jobList)
  }, [profiles,jobList]);

  const handleScheduleClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = ({ applicant, date, time }) => {
    const interviewing = `${date}T${time}:00`;

    const payload = {
      jobId: applicant.jobId,
      applicationId: applicant.applicantId,
      interviewing,
      applicationStatus: "INTERVIEWING",
    };

    // Update local scheduled list
    setScheduledInterviews((prev) => [...prev, payload]);

    // Call backend immediately
    changeStatus(payload)
      .then(() => {
        onStatusChange(payload);
        console.log("✅ Status updated successfully");
      })
      .catch((err) => {
        console.error("❌ Error updating status:", err);
      });
  };

  return (
    <div>
      {profiles.length > 0 ? (
        <div className="grid grid-cols-3 lg-mx:grid-cols-2 bs-mx:grid-cols-3 md-mx:grid-cols-2 xs-mx:grid-cols-1 gap-10">
          {/* <div className="bg-mine-shaft-900 rounded-xl flex gap-3 p-2"> */}
            {profiles.map((items, index) => {
              const scheduled = scheduledInterviews.find(
                (s) => s.applicantId === items.applicantId
              );

              return (
                <div key={index} className="bg-mine-shaft-900 rounded-2xl p-2">
                  {/* Header */}
                  <div className="flex items-center justify-evenly">
                    <div className="bg-mine-shaft-700 rounded-full"></div>
                    <div className="text-mine-shaft-300">
                      <div className="text-xl font-semibold">{items.jobTitle}</div>
                      <div className="text-sm">{items.company}</div>
                    </div>
                    <div>
                      <IconHeart stroke={2} className="text-white" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex gap-2 flex-wrap justify-between px-4">
                    {items.skills?.slice(0, 4).map((skill, ind) => (
                      <div
                        key={ind}
                        className="py-1 px-2 text-bright-sun-300 bg-mine-shaft-900 rounded-xl text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>

                  {/* About */}
                  <div className="text-sm text-mine-shaft-300 px-2 line-clamp-3">
                    {items.about}
                  </div>

                  <div className="px-2">
                    <div className="border-b border-mine-shaft-300 mt-2 px-2"></div>
                  </div>

                  {/* Salary & Posted time */}
                  <div className="flex justify-between p-2">
                    <div className="text-xl text-mine-shaft-200">&#8377; 20 Lpa</div>
                    <div className="flex gap-2 items-center">
                      <IconClockHour4 stroke={2} className="text-mine-shaft-300" />
                      <div className="text-mine-shaft-200 text-sm">
                        {timeAgo(jobList.find(job => job.applicantId === items.id)?.interviewTime)}
                      </div>
                    </div>
                  </div>

                  <div className="px-2 pb-3">
                    <div className="border-b border-mine-shaft-300 mt-2"></div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full justify-between gap-3 px-2 text-mine-shaft-300">
                    <Link to="/talent-profile" className="w-1/2">
                      <button className="w-full border border-bright-sun-300 px-2 py-1 text-xl">
                        Profile
                      </button>
                    </Link>
                    <div className="w-1/2 flex">
                      <button
                        onClick={() => handleScheduleClick(items)}
                        className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                      >
                        {scheduled ? "Reschedule" : "Schedule"}
                        <IconCalendarWeek stroke={2} />
                      </button>
                    </div>
                  </div>

                  {scheduled && (
                    <div className="text-sm text-bright-sun-300 px-2 mt-2">
                      Scheduled on {date} at {time}
                    </div>
                  )}
                </div>
              );
            })}
          {/* </div> */}
        </div>
      ) : (
        <div className="text-red-500 font-semibold text-center mt-10">
          Application not found
        </div>
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleSubmit}
          applicant={selectedApplicant}
        />
      )}
    </div>
  );
};

export default ApplicationTab;
