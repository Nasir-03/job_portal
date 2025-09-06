import React, { useEffect, useState } from 'react';
import HistoryCard from './HistoryCard';
import { useSelector } from "react-redux";
import { getAllJobs } from '../services/JobService';

const History = () => {
  const [activeTab, setActiveTab] = useState("APPLIED");
  const [jobList,setJobList] = useState([]);
  const [showList,setShowList] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchJob = async ()=> {
      try{
          const response = await getAllJobs();
      setJobList(response);
      console.log(response);
      
      }catch(err){
        console.error(err)
      }
    }
    fetchJob()
  },[])


   useEffect(() => {
    if (jobList.length && user?.profileId) {
      setShowList(
        jobList.filter((job) =>
          job.applicants?.some(
            (applicant) =>
              applicant.applicantId === user.profileId &&
              applicant.applicationStatus === activeTab
          )
        )
      );
    }
  }, [jobList, activeTab, user?.profileId]);


  // useEffect (() => {
  //    if (jobList.length && user?.profileId)  {
  //    setShowList (jobList.filter((job) => job.applicants?.filter((applicant) => applicant.applicantId 
  //   === user.profileId && applicant.applicationStatus===activeTab).length>0));
  //    }
  // },[jobList, activeTab, user?.profileId])

  const activeClass = (tab) => {
    return tab === activeTab
      ? "text-yellow-400 border-b-4 border-yellow-400 pb-1"
      : "text-mine-shaft-300";
  };

  const tabs = ["APPLIED", "SAVED", "OFFERED", "INTERVIEWING"];

  return (
    <div className="bg-mine-shaft-950 w-full p-4">
      <div className="text-mine-shaft-300 text-3xl mb-4">
        Job History
      </div>

      <div className="flex gap-8 text-xl xs-mx:text-sm xs-mx:font-bold xs-mx:gap-2 border-b border-mine-shaft-700">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${activeClass(tab)} cursor-pointer transition-all`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <HistoryCard activeTab={activeTab} jobs={showList}/>
      </div>
    </div>
  );
};

export default History;
