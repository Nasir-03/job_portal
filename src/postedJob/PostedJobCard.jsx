import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { timeAgo } from '../Data/Data';

const PostedJobCard = ({job}) => {
   const {id} = useParams();
   
   useEffect(()=>{
      console.log(job)
   },[job])

  return (
   <Link to={`/posted-job/${job.id}`}>
    <div className={`[&>div:hover]:shadow-2xl [&>div]:rounded-xl [&>div]:border-l [&>div]:border-l-bright-sun-400 w-full pr-5`}>
      <div className= {`px-5 p-2 mt-3 text-mine-shaft-300 ${String(job.id) === id ? 'bg-bright-sun-300 !text-black':'bg-mine-shaft-900'}  flex flex-col flex-wrap`}>
        <div className='text-xl font-semibold'>{job.jobTitle}</div>
        <div className='text-sm'>{job.location}</div>
        <div className='text-sm'>{job.company}</div>
        <div className='flex items-center justify-between'>
        <div className='text-xs  '>{timeAgo(job.postTime)}</div>
        <div>{job.jobStatus === "ACTIVE" ?"Actived" :job.jobStatus === "DRAFT"?"Drafted"
        :"Closed"}</div>
        </div>
      </div>
    </div>
    </Link>
  );
};


export default PostedJobCard
