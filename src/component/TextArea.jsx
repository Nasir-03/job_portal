import React, { useState } from 'react'

const TextArea = () => {
    const [message,setMessage] = useState();

  return (
    <div className='flex flex-col'>
      <label className='text-mine-shaft-300 text-lg pb-2'>Enter message here.</label>
      <textarea className='w-full h-32 p-3 bg-transparent border text-mine-shaft-300 text-xl border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
       value={message} onChange={(e)=>setMessage(e.target.value)} 
       placeholder='Enter message here...'/>
    </div>
  )
}

export default TextArea
