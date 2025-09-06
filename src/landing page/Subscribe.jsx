import React from 'react'

const Subscribe = () => {
  return (
    <div className='w-[85%] mt-16 flex items-center bs-mx:flex-col h-auto bg-mine-shaft-900 justify-between m-auto rounded-lg px-14'>
        <div className="text-4xl xl-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl lg-mx:text-2xl w-2/5 mt-10 mb-6 text-mine-shaft-100 bs-mx:w-full bs-mx:text-center font-bold leading-snug">
        Never Wants to Miss Any <span className="text-bright-sun-400 text-center">Job News?</span>
      </div>

<div className="bg-custom-gray-300 px-6 py-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 shadow-md max-w-md w-full lg-mx:w-3/5 lg-mx:px-4 lg-mx:py-2 bs-mx:mt-0 bs-mx:mb-10 bs-mx:w-full">
  <input
    type="email"
    placeholder="Your@Email.com"
    className="flex-1 px-4 py-2 rounded-md bg-transparent focus:outline-none text-white font-semibold text-lg xs-mx:w-full xs-mx:text-sm"
  />
  <button className="px-6 py-2 bg-bright-sun-400 text-sm lg-mx:text-xs lg-mx:px-2 text-white font-semibold rounded-md hover:bg-bright-sun-500 transition duration-300 w-full sm:w-auto">
    Subscribe
  </button>
</div>


    </div>
  )
}

export default Subscribe
