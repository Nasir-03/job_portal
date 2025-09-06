import React from 'react'
import { Link } from 'react-router-dom'
import JobDesc from '../DescJob/JobDesc'
import Recommended from '../findJobs/Recommended'
// import Card from '../Talent/Card'


const DescJob = () => {
  return (
    <div className='bg-mine-shaft-950 overflow-x-hidden'>
      <Link to='/find-job'>
       <button className='px-2 py-1 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15'>
        Back
       </button>
       </Link>

       <div className='flex gap-10 bs-mx:w-full bs-mx:flex-col bs-mx:px-5'>
        <div className='w-[65%] bs-mx:w-full'>
        <JobDesc />
       </div>
       <div className='w-[30%] bs-mx:w-full '>
          <Recommended columns={1}/>
       </div>
       </div>

    </div>
  )
}

export default DescJob
