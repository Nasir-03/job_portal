import React, { useEffect, useState } from "react";
import PostedJob from "../postedJob/PostedJob";
import PostedJobDesc from "../postedJob/PostedJobDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllJobs } from "../services/JobService";
// import UpdateApplicantStatus from "../postedJob/updateApplicantStatus";
import UpdateApplicantStatus from "../postedJob/UpdateApplicantStatus";

import { IconMenu2 } from "@tabler/icons-react";

const PostedJobPage = () => {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [isClosed, setIsClosed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();

        const filteredJobs = response.filter(
          (job) => job.postedBy === user.profileId
        );

        setJobList(filteredJobs);

        if (filteredJobs.length > 0) {
          if (id) {
            const foundJob = filteredJobs.find(
              (job) => String(job.id) === String(id)
            );
            setSelectedJob(foundJob || null);
          } else {
            setSelectedJob(filteredJobs[0]);
          }
        } else {
          setSelectedJob(null);
        }
      } catch (err) {
        console.error("Error fetching jobs in PostedJobPages  :", err);
      }
    };

    fetchJobs();
  }, [id]);

  return (
    <div className="bg-mine-shaft-950 min-h-[100vh] font-poppins flex p-5 overflow-x-hidden relative">
      {/* Menu Icon (only on bs-mx and smaller) */}
      <div className="flex justify-between">
      <div className="bs-mx:block hidden absolute top-5 left-5 z-50">
        <IconMenu2
          className="text-mine-shaft-300 cursor-pointer"
          onClick={toggleMenu}
        />
      </div>
         {/* <div className="hidden md-mx:block absolute top-5 right-5 text-white">
          <button className="h-8 w-24 px-2 border cursor-pointer hover:text-mine-shaft-600"
          onClick={handleFeature}>Features</button>
         </div> */}
      </div>

      {/* Sidebar for mobile (slides in/out) */}
   

  {isMenuOpen && <div className='hidden bs-mx:block absolute top-14 left-0 bg-mine-shaft-900 h-auto w-[30wh] xs-mx:w-[20wh] p-4 rounded-md z-50 transition-all duration-300 ease-in-out'>
        <PostedJob
          jobList={jobList}
          activeJob={selectedJob}
          onSelectJob={setSelectedJob}
          setIsClosed={setIsClosed}
          // handleFeature={handleFeature}
        />
      </div>}

      {/* Sidebar for desktop */}
      <div className="w-1/4 bs-mx:hidden">
        <PostedJob
          jobList={jobList}
          activeJob={selectedJob}
          onSelectJob={setSelectedJob}
          setIsClosed={setIsClosed}
        />
      </div>

      {/* Job Description Section */}
      <div className="w-full lg:w-3/4 bs-mx:w-full">
        <PostedJobDesc
          selectedJobs={selectedJob}
          jobList={jobList}
          onStatusChange={(payload) =>
            setJobList((prev) => UpdateApplicantStatus(prev, payload))
          }
          isClosed={isClosed}
          // isFeatureOpen={isFeatureOpen}
        />
      </div>
      
    </div>
  );
};

export default PostedJobPage;
