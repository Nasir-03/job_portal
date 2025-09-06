import { useEffect, useState } from 'react';
import OverViewTab from './OverViewTab';
import ApplicationTab from './ApplicationTab';
import InviteTab from './InviteTab';
import Offered from './Offered';
import Rejected from './Rejected';

const PostedJobDesc = ({selectedJobs,jobList,onStatusChange,isClosed,isFeatureOpen=false}) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [passJob,setPassJob] = useState([]);

  useEffect(() => {
  // console.log("selectedJobs ", selectedJobs);
  setPassJob(selectedJobs?.applicants || []);
}, [selectedJobs]);

  useEffect(()=>{
    setActiveTab("Overview");
  },[selectedJobs])

  return (
    <div className="mt-6">
      <div className="grid grid-cols-5 md-mx:grid-cols-3 xs-mx:grid-cols-2 gap-6 border-b border-gray-600 mb-4 ">
        
        {['Overview', 'Applications', 'Invited', 'Offered', 'Rejected'].map(tab => (
          <button
            key={tab}
            className={`pb-2 px-4 text-lg font-medium md-mx:text-sm ${
              activeTab === tab ? 'text-bright-sun-400 border-b-2 border-bright-sun-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-gray-300">
        {activeTab === 'Overview' && <OverViewTab selectedJobs={selectedJobs} isClosed={isClosed}/>}

         {activeTab === 'Applications' && <ApplicationTab jobList={passJob.filter((res) =>
         res.applicationStatus === "APPLIED")} 
         onStatusChange={onStatusChange}/>}

        {activeTab === 'Invited' && <InviteTab jobList={passJob.filter((res)=> 
        res.applicationStatus==="INTERVIEWING")}
        onStatusChange={onStatusChange}/>}
        
        {activeTab === 'Offered' && <Offered jobList={passJob.filter((res) => 
        res.applicationStatus==="OFFERED")}/>}

        {activeTab === 'Rejected' && <Rejected jobList={passJob.filter((res)=>
           res.applicationStatus==="REJECTED")}/>}  
      </div>
    </div>
  );
};

export default PostedJobDesc