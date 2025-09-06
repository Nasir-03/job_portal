import React from 'react'
import SelectInput from './SelectInput'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PostJob = () => {
  const {id} = useParams();
  return (
    <div className='w-4/5 mx-auto pt-10'>
        
       <div className='text-3xl font-semibold text-mine-shaft-300'>
           post a job
       </div>
       <div className='pt-4'>
        <SelectInput id={id}/>
       </div>
    </div>
  )
}

export default PostJob
