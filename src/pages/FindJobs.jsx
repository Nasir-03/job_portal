import React from 'react'
import Searching from '../findJobs/Searching'
import Recommended from '../findJobs/Recommended'

const FindJobs = () => {
  return (
    <div className='bg-mine-shaft-950 font-poppins overflow-x-hidden rec min-h-[100vh]'>
       <Searching />
       <Recommended />
    </div>
  )
}

export default FindJobs