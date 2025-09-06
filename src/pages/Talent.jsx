import React from 'react'
import Searching from '../findJobs/Searching'
import TalentSearch from '../Talent/TalentSearch'
import Card from '../Talent/Card'
import Certification from '../Talent/Certification'

const Talent = () => {
  return (
    <div className='bg-mine-shaft-950 mb-2'>
      <TalentSearch />
      <Card columns={3}/>
    </div>
  )
}

export default Talent
