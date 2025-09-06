import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/background.avif'
import avatar from '../assets/avataar.jpg'
import { IconMapPin } from '@tabler/icons-react'
import Border from '../component/Border'
import CompanyTabs from './CompanyTabs'


const CompanyProfile = () => {
    const navigate = useNavigate()

  return (
    
    <div>
           <button className='px-2 py-1 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15'
           onClick={()=>navigate(-1)}>
            Back
           </button>

           <div className='mt-5'>
              <div className="w-full relative">
                      <img
                        src={background}
                        alt=""
                        className="h-[200px] w-full rounded-2xl object-cover"
                      />
                      <img
                        src='/companies/google.webp'
                        className="h-36 w-36 bg-mine-shaft-950 rounded-3xl -bottom-1/3 absolute left-5 border-8 border-mine-shaft-950 object-contain"
                      />
                    </div>
              
                    <div className="flex justify-between px-10 mt-16 text-mine-shaft-300">
                      <div>
                        <div className="text-3xl font-semibold">Google</div>
                        {/* <div className="text-xl">Software Engineer &#8226; Google</div> */}
                        <div className="flex gap-2">
                          <div className="text-xl">
                            <IconMapPin
                              stroke={2}
                              className="h-8 w-8 text-mine-shaft-300 rounded-full p-2 bg-mine-shaft-700"
                            />
                          </div>
                          New york, United State
                        </div>
                      </div>
                      <div>
                        <button className="px-4 py-2 text-mine-shaft-300 border border-bright-sun-400 text-xl rounded-xl">
                          Message
                        </button>
                      </div>
                    </div>
                    <Border />
           </div>
           <CompanyTabs />
    </div>
  )
}

export default CompanyProfile
