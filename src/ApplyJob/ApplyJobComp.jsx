import React, { useState } from "react";
import Border from "../component/Border";
import TextArea from "../component/TextArea";
import { useNavigate } from "react-router-dom";
import ApplyJobForm from "./ApplyJobForm";
import { timeAgo } from "../Data/Data";

const ApplyJobComp = (props) => {
    const navigate = useNavigate();

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

    const handlePrev = ()=> {
        setPreview(!preview)
        window.scrollTo({top:0, behavior:'smooth'})
    }

    const handleSubmit = ()=> {
        setSubmit(true);
        navigate("/find-job")
    }

  return (
    
      <div className="w-2/3 mx-auto pt-5">
        <div className="flex items-center gap-6 mb-3">
          <div className="bg-mine-shaft-700 rounded-xl">
            <img
              src= {companyImage[props.company?.toLowerCase()]}
              alt=""
              className="h-20 w-20 px-2 object-contain"
            />
          </div>
          <div className="text-mine-shaft-300">
            <div className="font-bold text-xl">{props.jobTitle}</div>
            <div className="text-lg">
              {props.company} &#8226; {timeAgo(props.postTime)} &#8226; {props.applicants
? props.applicants.length : 0} applicants
            </div>
          </div>
        </div>
        <Border />

         <div>
          <ApplyJobForm />
         </div>
      </div>
    
  );
};

export default ApplyJobComp;
