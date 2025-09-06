import React, { useState } from "react";
import PostedJobCard from "./PostedJobCard";

const PostedJob = ({ jobList, activeJob, onSelectJob,setIsClosed,handleFeature=false }) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  const handleClosed = ()=> {
     setActiveTab("CLOSED");
     setIsClosed(true);
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-2 font-xl rounded-xl ${
            activeTab === "ACTIVE"
              ? "bg-bright-sun-400 text-black"
              : "bg-mine-shaft-900 text-mine-shaft-300"
          }`}
          onClick={() => setActiveTab("ACTIVE")}
        >
          Active [{jobList?.filter((jobs) => jobs.jobStatus === "ACTIVE").length}]
        </button>

        <button
          className={`px-3 py-2 font-xl rounded-xl ${
            activeTab === "DRAFT"
              ? "bg-bright-sun-400 text-black"
              : "bg-mine-shaft-900 text-mine-shaft-300"
          }`}
          onClick={() => setActiveTab("DRAFT")}
        >
          Draft [{jobList?.filter((jobs) => jobs.jobStatus === "DRAFT").length}]
        </button>

        <button
          className={`px-3 py-2 font-xl rounded-xl ${
            activeTab === "CLOSED"
              ? "bg-bright-sun-400 text-black"
              : "bg-mine-shaft-900 text-mine-shaft-300"
          }`}
          // onClick={() => setActiveTab("CLOSED")}
          onClick={handleClosed}
        >
          Closed [{jobList?.filter((jobs) => jobs.jobStatus === "CLOSED").length}]
        </button>
      </div>

      {/* Filter and Map */}
      {jobList
        ?.filter((jobs) => jobs.jobStatus === activeTab)
        .map((jobs) => (
          <div
            key={jobs.id}
             onClick={() => onSelectJob(jobs)} // ✅ select job on click
          >
            <PostedJobCard job={jobs} />
          </div>
        ))}
    </div>
  );
};

export default PostedJob;

// import React, { useEffect, useState } from "react";
// import PostedJobCard from "./PostedJobCard";

// const PostedJob = ({ jobList, job, onSelectJob }) => {
//   const [activeTab, setActiveTab] = useState("ACTIVE");

//   useEffect(() => {
//     console.log("jobList is: ", jobList);
//     console.log("activeJob is: ", job);
//     console.log("onSelectJob is: ", onSelectJob);
//   }, [jobList, job, onSelectJob]);

//   return (
//     <div>
//       {/* Tabs */}
//       <div className="flex gap-2 mb-4">
//         <button
//           className={`px-3 py-2 font-xl rounded-xl ${
//             activeTab === "ACTIVE"
//               ? "bg-bright-sun-400 text-black"
//               : "bg-mine-shaft-900 text-mine-shaft-300"
//           }`}
//           onClick={() => setActiveTab("ACTIVE")}
//         >
//           Active [
//           {jobList?.filter((jobs) => jobs.jobStatus === "ACTIVE").length}]
//         </button>

//         <button
//           className={`px-3 py-2 font-xl rounded-xl ${
//             activeTab === "DRAFT"
//               ? "bg-bright-sun-400 text-black"
//               : "bg-mine-shaft-900 text-mine-shaft-300"
//           }`}
//           onClick={() => setActiveTab("DRAFT")}
//         >
//           Draft [{jobList?.filter((jobs) => jobs.jobStatus === "DRAFT").length}]
//         </button>
//       </div>

//       {/* Job List */}
//       {jobList
//         ?.filter((jobs) => jobs.jobStatus === activeTab)
//         .map((jobs) => (
//           <div
//             key={jobs.id}
//             className={`cursor-pointer ${
//               job && job.id === jobs.id ? "border border-yellow-400" : ""
//             }`}
//             onClick={() => onSelectJob(jobs)}
//           >
//             <PostedJobCard job={jobs} />
//           </div>
//         ))}
//     </div>
//   );
// };

// export default PostedJob;
