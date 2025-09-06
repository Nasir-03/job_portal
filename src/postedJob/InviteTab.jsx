import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IconHeart,
  IconClockHour4,
  IconCalendarWeek,
  IconCircleX,
  IconLockFilled,
} from "@tabler/icons-react";
import { getUserProfile } from "../services/ProfileService";
import ScheduleModal from "./ScheduleModal ";
import { changeStatus } from "../services/JobService";
import { formatDateTime } from "../Data/Data";

const InviteTab = ({ jobList, onStatusChange }) => {
  const [profiles, setProfiles] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // 🔥 store scheduled interviews
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  const { id } = useParams();

  // useEffect(() => {
  //   if (appliedJob.length > 0) {
  //     const fetchProfiles = async () => {
  //       try {
  //         let allProfiles = [];

  //         for (const job of appliedJob) {
  //           for (const applicant of job.applicants || []) {
  //             if (applicant.applicationStatus === "INTERVIEWING") {
  //               const res = await getUserProfile(applicant.applicantId);
  //               allProfiles.push({
  //                 ...res,
  //                 jobId: job.id,
  //                 applicantId: applicant.applicantId,
  //                 applicants: job.applicants, // <-- keep the applicants array
  //               });
  //             }
  //           }
  //         }
  //         setProfiles(allProfiles);
  //       } catch (err) {
  //         console.error("Error fetching applicant profiles:", err);
  //       }
  //     };

  //     fetchProfiles();
  //   }
  // }, [appliedJob]);

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

  const handleScheduleClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowScheduleModal(true);
  };

  const handleDelete = (items) => {
    console.log(items);
    const rejectedTime = `${date}T${time}:00`;
    const payloads = {
      jobId: id,
      applicationId: items.id,
      interviewing: rejectedTime,
      applicationStatus: "REJECTED",
    };

    changeStatus(payloads)
      .then((res) => {
        console.log("Backend response:", res);
        onStatusChange(payloads);
        console.log("✅ Interview change successfully");
      })
      .catch((err) => {
        console.error("❌ Applied updated errors:", err);
      });
  };

  // 🔥 receive schedule info from modal
  // const handleScheduleSubmit = ({ applicant, date, time }) => {
  //   setScheduledInterviews((prev) => [
  //     ...prev,
  //     { id: applicant.jobId, applicationId: applicant.id, interviewing: {date, time},applicationStatus:"INTERVIEWING" },
  //   ]);

  //   console.log("Scheduled for:", applicant);
  //   console.log("Date:", date);
  //   console.log("Time:", time);
  //   console.log("Id is: ",selectedApplicant);

  //    changeStatus(scheduledInterviews)
  //    .then((res) => console.log("success")
  //    ).catch((err) =>{
  //      console.error(err);
  //    })

  // };

  const handleScheduleSubmit = ({ applicant, date, time }) => {
    // Combine date & time into ISO string (Java LocalDateTime format)
    const interviewing = `${date}T${time}:00`;

    // Build payload matching your Application DTO
    console.log("Applicant is: ", applicant);

    const payload = {
      jobId: applicant.jobId,
      applicationId: applicant.applicantId, // now this will be correct
      interviewing: interviewing, // "2025-08-16T10:30:00"
      applicationStatus: "INTERVIEWING",
    };

    //  console.log("selected job", selectedJob)
    // Update local UI
    setScheduledInterviews((prev) => [...prev, { ...payload }]);

    // Call backend immediately with correct payload
    changeStatus(payload)
      .then(() => {
        console.log("✅ Status updated successfully");
      })
      .catch((err) => {
        console.error("❌ Error updating status:", err);
      });
  };

  const acceptStatus = (items) => {
    const offeringTime = `${date}T${time}:00`;
    const payloads = {
      jobId: items.jobId,
      applicationId: items.applicantId,
      interviewing: offeringTime,
      applicationStatus: "OFFERED",
    };
    changeStatus(payloads)
      .then(() => {
        console.log();
      })
      .catch((err) => {
        console.log(err);
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
                    <div className="text-xl font-semibold">
                      {items.jobTitle}
                    </div>
                    <div className="text-sm">{items.company}</div>
                  </div>
                  <div className="flex gap-2">
                    <IconHeart stroke={2} className="text-white" />
                    <IconCircleX
                      stroke={2}
                      className="text-white cursor-pointer"
                      onClick={() => handleDelete(items)}
                    />
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
                  <div className="text-xl text-mine-shaft-200">
                    &#8377; 20 Lpa
                  </div>
                  <div className="flex gap-2 items-center">
                    <IconClockHour4
                      stroke={2}
                      className="text-mine-shaft-300"
                    />
                    <div className="text-mine-shaft-200 text-sm">
                      2 days ago
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

export default InviteTab;
