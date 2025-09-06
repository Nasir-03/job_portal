import React, { useEffect, useState } from 'react';
import {
  IconBookmark,
  IconMapPin,
  IconBriefcase,
  IconCoinFilled,
  IconBrandWordpress
} from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import Border from '../component/Border';
import { getJobById } from '../services/JobService';
import { timeAgo } from '../Data/Data';
import { useSelector } from 'react-redux';

const JobDesc = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const [isApplied,setIsApplied] = useState(false)
  const [applicant,setApplicant] = useState(0);

  const user = useSelector((state) => state.user)

    const companyImage = 
       {
          microsoft: '/companies/microsoft.webp',
          amazon: '/companies/amazon.webp',
           netflix: '/companies/netflix.webp',
          google: '/companies/google.webp',
          spotify: '/companies/spotify.webp',
          figma: '/companies/figma.webp',
           meta: '/companies/meta.webp',
           pinterest: '/companies/pinterest.webp',
           oracle: '/companies/oracle.webp',
           walmart: '/companies/walmart.webp',
           flipkart: '/companies/flipkart.png',
       }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response);
      } catch (err) {
        console.error("Error fetching job details:", err);
      }
    };
    fetchJob();
  }, [id]);


  // useEffect(() => {
  //   if (job){
  //         if (job.applicants?.filter((applicant) => applicant.applicantId === user.profileId).length>0){
  //           setIsApplied(true)
  //           setApplicant(...job.applicants)
  //           console.log(isApplied);
            
  //         }else{
  //           setIsApplied(false)
  //         }
  //   }
  // },[job])


   useEffect(() => {
  if (job) {
    if (job.applicants?.some(applicant => applicant.applicantId === user.profileId)) {
      setIsApplied(true);
    } else {
      setIsApplied(false);
    }
    setApplicant(job.applicants?.length || 0);
  }
}, [job, user.profileId]);



  if (!job) return <div className="text-white p-5">Loading job details...</div>;

  return (
    <div className="bg-mine-shaft-950 p-5 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="bg-mine-shaft-700 rounded-xl">
            <img src={companyImage[job.company?.toLowerCase()] || '/companies/amazon.webp'}
              className="h-16 w-20 xs-mx:h-12 xs-mx:w-16 object-contain px-2"/>
          </div>
          <div className="text-mine-shaft-300">
            <div className="font-bold text-xl">{job.jobTitle}</div>
            {/* <div>{job.company} &#8226; {timeAgo(job.postTime)} &#8226; {job.applicants.length>0 ? job.applicants.length: 0} Applicant</div> */}
             <div>
  {job.company} &#8226; {timeAgo(job.postTime)} &#8226; {applicant} Applicant{applicant !== 1 ? 's' : ''}
</div>

          </div>
        </div>



        <div className="text-bright-sun-500 font-semibold flex flex-col items-center gap-3">
         {isApplied ? <div>
            <button className="border px-2 py-2 bg-green-600 text-mine-shaft-300 rounded-lg text-sm bg-opacity-15">
              Applied
            </button>
         </div>
         :
         <Link to={`/apply-job/${id}`}>
            <button className="border px-2 py-2 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-sm bg-opacity-15">
              Apply
            </button>
          </Link> }
          <IconBookmark stroke={1.5} className="h-8 w-8" />
        </div>



      </div>

      <Border />

      {/* Job Details */}
      <div className="pt-10 grid grid-cols-4 gap-6 place-items-center xs-mx:grid-cols-2">
        {[
          { icon: <IconMapPin />, title: 'Location', value: job.location || 'N/A' },
          { icon: <IconBriefcase />, title: 'Experience', value: job.experience || 'N/A' },
          { icon: <IconCoinFilled />, title: 'Salary', value: `${job.packagedOffer} LPA` },
          { icon: <IconBrandWordpress />, title: 'Job Type', value: job.jobType || 'N/A' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-gold-glow">{React.cloneElement(item.icon, { stroke: 1.5, className: 'w-10 h-10 text-bright-sun-200 rounded-full' })}</div>
            <div className="text-mine-shaft-300 text-center">
              <div className="font-semibold text-xl">{item.title}</div>
              <div className="text-sm">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <Border />

      {/* Skills */}
      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5 xs-mx:text-xl">Required Skills</div>
        <div className="pt-2 pb-2 flex flex-wrap gap-3 px-5 items-center">
          {(job.skillsRequired || []).map((skill, i) => (
            <div key={i} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Border />

      {/* About Job */}
      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5 xs-mx:text-xl">About Job</div>
        <div className="text-mine-shaft-200 text-justify font-semibold">
          {job.description|| 'No job description available.'}
        </div>
      </div>

      {/* Responsibilities */}
      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5 xs-mx:text-xl">Responsibilities</div>
        <ul className="list-disc list-inside space-y-1 marker:text-bright-sun-400 text-mine-shaft-300 leading-loose">
          {(job.responsibilities || []).map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      {/* Qualifications */}
      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5 xs-mx:text-xl">Qualifications and Skill Sets</div>
        <ul className="list-disc list-inside space-y-1 marker:text-bright-sun-400 text-mine-shaft-300 leading-loose">
          {(job.qualifications || []).map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </div>

      <Border />

      {/* About Company */}
      <div className="pt-5">
        <div className="text-3xl text-mine-shaft-300 font-bold pb-5 xs-mx:text-xl">About Company</div>
        <div className="flex justify-between items-center xs-mx:gap-5">
          <div className="flex items-center gap-6 xs-mx:gap-5">
            <div className="bg-mine-shaft-700 rounded-xl">
              <img src={companyImage[job.company?.toLowerCase()] || '/companies/amazon.webp'}
              alt="" className="h-16 w-20 xs-mx:h-12 xs-mx:w-16 object-contain px-2" />
            </div>
            <div className="text-mine-shaft-300">
              <div className="font-bold text-xl">{job.company || 'Company Name'}</div>
              <div>{job.employees || '10k+ Employees'}</div>
            </div>
          </div>
          <div>
            <Link to="/company">
              <button className="px-2 py-1 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15">Company Page</button>
            </Link>
          </div>
        </div>
        <div className="text-mine-shaft-300 text-justify pt-5 font-semibold">
          {job.description || 'No company details available.'}
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
