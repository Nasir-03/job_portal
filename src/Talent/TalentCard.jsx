import React, { useEffect, useState } from 'react'
import { getAllJobs } from '../services/JobService';

const TalentCard = () => {
  const [talentProfile,setTalentProfile] = useState([]);

  useEffect(()=>{
    const fetchJobs = async ()=>{
      try{
      const response = await getAllJobs();
      setTalentProfile(response);
      }catch(err){
        console.error(err);
      }
    }
    fetchJobs()
  },[])
  return (
    <div>
       <div className="mt-16 w-full">
            <div className="text-mine-shaft-300 text-4xl font-bold p-6">Not at</div>
            {/* <div className="w-full grid grid-cols-`${columns}` gap-6 bg-mine-shaft-900  [&>div:hover]:border border-bright-sun-400"> */}
            <div
              className={`w-full bg-mine-shaft-950 gap-10 grid [&>div:hover]:border border-bright-sun-400 ${
                columns === 1
                  ? "grid-cols-1"
                  : columns === 2
                  ? "grid-cols-2"
                  : columns === 3
                  ? "grid-cols-3"
                  : "grid-cols-4"
              }`}
            >
              {talentProfile?.map((items, index) => index < 4 && id != items.id &&(
                <div key={index}>
                  <div className="bg-mine-shaft-900 rounded-xl flex flex-col gap-3 p-2">
                    <div className="flex items-center justify-evenly">
                      <div className="bg-mine-shaft-700  rounded-full">
                        <img src={avatar} alt="" className="w-16 h-16 rounded-full" />
                      </div>
                      <div className="text-mine-shaft-300">
                        <div className="text-xl font-semibold">{items.jobTitle}</div>
                        <div className="text-sm">{items.company}</div>
                      </div>
                      <div>
                        <IconHeart stroke={2} className="text-white" />
                      </div>
                    </div>
      
                    <div className="flex gap-2 flex-wrap px-4">
                      {items.skills?.map((skill, index) => (
                        <div
                          key={index}
                          className="py-1 px-2 text-bright-sun-300 bg-mine-shaft-900 rounded-xl text-xs"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
      
                    <div className="text-sm text-mine-shaft-300 text-justify px-2 line-clamp-3">
                       {items.about}
                    </div>
                    {/* Divider */}
                    <div className="px-2">
                      <div className="border-b border-mine-shaft-300 mt-2 px-2">
                        {" "}
                      </div>
                    </div>
      
                    {invited ? (
                      <div className="flex gap-2">
                        <IconClockHour4 stroke={2} className="text-mine-shaft-300" />{" "}
                        interview: August 22, 2025 10:00 Am
                      </div>
                    ) : (
                      <div className="flex justify-between p-2">
                        <div className="text-xl text-mine-shaft-200">
                          &#8377; 32 Lpa
                        </div>
                        <div className="flex gap-2 items-center">
                          <div>
                            <IconClockHour4
                              stroke={2}
                              className="text-mine-shaft-300"
                            />
                          </div>
                          <div className="text-mine-shaft-200 text-sm">
                            {" "}
                            Posted 12 days ago
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="px-2">
                      <div className="border-b border-mine-shaft-300 mt-2"></div>
                    </div>
      
                    <div className="flex w-full justify-between gap-3 px-2 text-mine-shaft-300">
                      <div className="w-1/2 flex">
                        {invited === "invited" ? (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                          >
                            Accept
                          </button>
                        ) : (
                          <Link to={`/talent-profile/${items.id}`} className="w-1/2">
                            <button className="w-full border border-bright-sun-300 px-2 py-1 text-xl">
                              Profile
                            </button>
                          </Link>
                        )}
                      </div>
      
                      <div className="w-1/2 flex">
                        {posted === "scheduled" ? (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                          >
                            Schedule
                            <IconCalendarWeek stroke={2} />
                          </button>
                        ) : invited === "invited" ? (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                          >
                            Reject
                            {/* <IconCalendarWeek stroke={2} /> */}
                          </button>
                        ) : (
                          <button className="w-full border border-bright-sun-300 px-2 py-1 text-xl">
                            Message
                          </button>
                        )}
                      </div>
      
                      {isModalOpen && (
                        <ScheduleModal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-center mt-8 text-mine-shaft-300 text-lg">
                Hello from here
              </div>
            </div>
          </div>
    </div>
  )
}

export default TalentCard

