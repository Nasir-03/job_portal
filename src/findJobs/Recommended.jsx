import React, { useEffect, useState } from "react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour4,
} from "@tabler/icons-react";
import amazon from "../../public/companies/amazon.webp";
import netflix from "../../public/companies/netflix.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllJobs } from "../services/JobService";
import { timeAgo } from "../Data/Data";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slices/ProfileSlice";
import { fetchUserProfile } from "../slices/ProfileSlice";

const Recommended = ({ columns = 4 }) => {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [filterJobList, setFilterJoblist] = useState([]);

  const { id } = useParams();
  const profile = useSelector((state) => state.profile);
  const selector = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const companyImage = {
    microsoft: "/companies/microsoft.webp",
    amazon: "/companies/amazon.webp",
    netflix: "/companies/netflix.webp",
    google: "/companies/google.webp",
    spotify: "/companies/spotify.webp",
    figma: "/companies/figma.webp",
    meta: "/companies/meta.webp",
    pinterest: "/companies/pinterest.webp",
    oracle: "/companies/oracle.webp",
    walmart: "/companies/walmart.webp",
    flipkart: "/companies/flipkart.png",
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        console.log(response);
        setJobList(response.filter((job) => job.jobStatus === "ACTIVE"));
        console.log("Jobs fetched successfully:", response);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  //  put data into filter

  useEffect(() => {
    if (jobList && jobList.length > 0) {
      setFilterJoblist(jobList);
    }
  }, [jobList]);

  // filter on based of searching

  //    useEffect(() => {
  //   if (!jobList || jobList.length === 0) return;

  //   let filtered = [...jobList];

  //   // ✅ match job title
  //   if (selector.job_role && selector.job_role.length > 0) {
  //     filtered = filtered.filter((job) =>
  //       selector.job_role.some(job.jobTitle)
  //     );
  //   }

  //   // ✅ match location
  //   if (selector.location && selector.location.length > 0) {
  //     filtered = filtered.filter((job) =>
  //       selector.location.some(job.location)
  //     );
  //   }

  //   // ✅ match experience
  //   if (selector.experience && selector.experience.length > 0) {
  //     filtered = filtered.filter((job) =>
  //       job.experience && selector.experience.some(job.experience)
  //     );
  //   }

  //   // ✅ match job type
  //   if (selector.job && selector.job.length > 0) {
  //     filtered = filtered.filter((job) =>
  //       selector.job.some(job.jobType)
  //     );
  //   }

  //   // ✅ match skills if array
  //   if (selector.skills && selector.skills.length > 0) {
  //     filtered = filtered.filter(
  //       (job) =>
  //         job.skillsRequired &&
  //         job.skillsRequired.some((skill) =>
  //           selector.skills.some(skill)
  //         )
  //     );
  //   }

  //   setFilterJoblist(filtered);
  // }, [jobList, selector]);

  //    useEffect(() => {
  //   if (!jobList || jobList.length === 0) return;

  //   let filtered = jobList.filter((job) => {
  //     return (
  //       // ✅ job role
  //       (selector.job_role?.length > 0 &&
  //         selector.job_role.some((role) => role === job.jobTitle)) ||

  //       // ✅ location
  //       (selector.location?.length > 0 &&
  //         selector.location.some((loc) => loc === job.location)) ||

  //       // ✅ experience
  //       (selector.experience?.length > 0 &&
  //         job.experience &&
  //         selector.experience.some((exp) => exp === job.experience)) ||

  //       // ✅ job type
  //       (selector.job?.length > 0 &&
  //         selector.job.some((jt) => jt === job.jobType)) ||

  //       // ✅ skills
  //       (selector.skills?.length > 0 &&
  //         job.skillsRequired &&
  //         job.skillsRequired.some((skill) =>
  //           selector.skills.includes(skill)
  //         ))
  //     );
  //   });

  //   setFilterJoblist(filtered);
  // }, [jobList, selector]);

  useEffect(() => {
    if (!jobList || jobList.length === 0) return;

    let filtered = [...jobList];

    // ✅ match job title
    if (selector.job_role && selector.job_role.length > 0) {
      filtered = filtered.filter((job) =>
        selector.job_role.some((role) => role === job.jobTitle)
      );
    }

    // ✅ match location
    if (selector.location && selector.location.length > 0) {
      filtered = filtered.filter((job) =>
        selector.location.some((loc) => loc === job.location)
      );
    }

    // ✅ match skills if array
    if (selector.skills && selector.skills.length > 0) {
      filtered = filtered.filter((job) =>
        job.skillsRequired?.some((skill) =>
          selector.skills.some(
            (ski) => ski.toLowerCase() === skill.toLowerCase()
          )
        )
      );
    }

    setFilterJoblist(filtered);
  }, [jobList, selector]);

  const userId = useSelector((state) => state.user.id); // assuming stored in user slice

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch]);

  const handleSavedJobs = (jobId) => {
    if (!profile?.id) {
      console.warn("Profile not loaded yet, ignoring click");
      return;
    }

    let savedJobs = [...(profile.savedJobs || [])];
    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs.push(jobId);
    }

    const updatedProfile = { ...profile, savedJobs };
    const formData = new FormData();
    formData.append(
      "profile",
      new Blob([JSON.stringify(updatedProfile)], { type: "application/json" })
    );

    dispatch(updateUserProfile({ id: profile.id, formData }));
  };

  return (
    <div className=" w-full">
      <div className="text-mine-shaft-300 text-4xl sm-mx:text-2xl font-bold p-6">
        Recommended Jobs
      </div>

      <div
        className={`w-full grid ${
          columns === 1
            ? "grid-cols-1 bs-mx:grid-cols-2 sm-mx:grid-cols-1"
            : columns === 2
            ? "grid-cols-2"
            : columns == 3
            ? "grid-cols-3"
            : "grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        } gap-6 px-4 flex-wrap`}
      >
        {filterJobList.map(
          (job, index) =>
            id !== job.id && (
              <div
                key={index}
                className="bg-mine-shaft-900 rounded-xl flex flex-col gap-3 p-2 cursor-pointer"
              >
                <div className="flex items-center justify-evenly">
                  <div className="bg-mine-shaft-700 rounded-full">
                    <img
                      src={companyImage[job.company?.toLowerCase()]}
                      alt=""
                      className="w-16 h-8 p-2"
                    />
                  </div>
                  <div className="text-mine-shaft-300">
                    <div className="text-xl font-semibold">{job.jobTitle}</div>
                    <div className="text-sm">
                      {" "}
                      {job.company}.{" "}
                      {job.applicants ? job.applicants.length : 0} application
                    </div>
                    <div className="text-center">{job.location}</div>
                  </div>
                  <div>
                    {profile.savedJobs?.includes(job.id) ? (
                      <IconBookmarkFilled
                        onClick={() => handleSavedJobs(job.id)}
                        stroke={2}
                        className="text-bright-sun-400"
                      />
                    ) : (
                      <IconBookmark
                        onClick={() => handleSavedJobs(job.id)}
                        stroke={2}
                        className="text-white hover:text-bright-sun-400"
                      />
                    )}
                  </div>
                </div>

                <div
                  className="flex flex-wrap gap-2 px-4 [&>div]:py-1 [&>div]:px-2 [&>div]:text-bright-sun-300
              [&>div]:bg-mine-shaft-700 [&>div]:rounded-xl text-xs"
                >
                  {job.skillsRequired?.map((skill, index) => (
                    <div key={index}>{skill}</div>
                  ))}
                </div>

                <div className="text-sm text-mine-shaft-300 text-justify px-2 line-clamp-3">
                  {job.description}
                </div>
                {/* Divider */}
                <div className="px-2">
                  <div className="border-b border-mine-shaft-300 mt-2 px-2">
                    {" "}
                  </div>
                </div>
                <div className="flex justify-between p-2">
                  <div className="text-xl text-mine-shaft-300">
                    &#8377; {job.packagedOffer} Lpa
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <IconClockHour4
                        stroke={2}
                        className="text-mine-shaft-300"
                      />
                    </div>
                    <div className="text-mine-shaft-200 text-sm">
                      {" "}
                      Posted {timeAgo(job.postTime)}
                    </div>
                  </div>
                </div>
                <div className="">
                  <button className="w-full bg-mine-shaft-300 p-2 text-lg">
                    <Link to={`/jobs/${job.id}`}>View Jobs</Link>
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Recommended;
