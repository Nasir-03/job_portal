import React, { useEffect, useState } from "react";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-slider/assets/index.css";
import makeAnimated from "react-select/animated";
import SkillsInput from "./SkillsInput";
import { getJobById, postJob } from "../services/JobService";
import Notification from "../signUpLogin/Notification";
const animatedComponents = makeAnimated();
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectInput = ({id}) => {
  const job_title = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Data Engineer", label: "Data Engineer" },
    { value: "Front End", label: "Front End" },
    { value: "Back End", label: "Back End" },
    { value: "React Js", label: "React Js" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Ai Engineer", label: "Ai Engineer" },
  ];

  const company = [
    { value: "Amazon", label: "Amazon" },
    { value: "Flipkart", label: "Flipkart" },
    { value: "Google", label: "Google" },
    { value: "Microsoft", label: "Microsoft" },
    { value: "Dell", label: "Dell" },
    { value: "Asus", label: "Asus" },
    { value: "Cognizant", label: "Cognizant" },
    { value: "HCL", label: "HCL" },
    { value: "Capgemini", label: "Capgemini" },
  ];

  const job_type = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];

  const location = [
    { value: "Noida", label: "Noida" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Indore", label: "Indore" },
    { value: "Ranchi", label: "Ranchi" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Pune", label: "Pune" },
  ];

  const experience = [
    { value: "Fresher", label: "Fresher" },
    { value: "1-2 Years", label: "1-2 Years" },
    { value: "3-5 Years", label: "3-5 Years" },
    { value: "5+ Years", label: "5+ Years" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: "1px solid #b0b0b0",
      boxShadow: "none",
      padding: "2px",
      color: "#d1d5db",
      flexWrap: "wrap",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap",
      gap: "4px",
      alignItems: "center",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#4f4f4f",
      borderRadius: "10px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "black",
        color: "white",
      },
    }),
    option: (base) => ({
      ...base,
      color: "#b0b0b0",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#454545",
      width: "600px",
      zIndex: 20,
      // Removed padding that causes nested scrollbars
    }),
    // ✅ This handles the scrolling cleanly
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      padding: 0, // important: no internal padding to avoid nested scroll
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    input: (base) => ({
      ...base,
      color: "#d1d5db",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#d1d5db",
    }),
  };

  const [notification, setNotification] = useState("");

  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [skills, setSkills] = useState([]);
  const [aboutJob, setAboutJob] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [number, setNumber] = useState("");

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handlePost = async () => {
    const data = {
      jobTitle: selectedJobTitle?.value,
      company: selectedCompany?.value,
      experience: selectedExperience?.value,
      jobType: selectedJobType?.value,
      location: selectedLocation?.value,
      packagedOffer: number,
      skillsRequired: skills,
      about: aboutJob,
      description: jobDescription,
      // postTime: new Date().toISOString(),
      applicants: [],
      postedBy:user.profileId,
      jobStatus: "ACTIVE",
    };
    try {
      const response = await postJob(data);
      console.log("Success", response);

      if (response) {
         setNotification({
          msg: "Job posted successfully",
          color: "green",
        });
        navigate(`/posted-job/${response.id}`)
        
      }
    } catch (err) {
      console.error("Error posting job:", err);
       setNotification({
        msg: "Failed to post job",
        color: "red",
      });
      return;
    }
  };

   const handleDraft = async () => {
    const data = {
      jobTitle: selectedJobTitle?.value,
      company: selectedCompany?.value,
      experience: selectedExperience?.value,
      jobType: selectedJobType?.value,
      location: selectedLocation?.value,
      packagedOffer: number,
      skillsRequired: skills,
      about: aboutJob,
      description: jobDescription,
      // postTime: new Date().toISOString(),
      applicants: [],
      postedBy:user.profileId,
      jobStatus: "DRAFT",
    };
    try {
      const response = await postJob(data);
      console.log("Success", response);

      if (response) {
         setNotification({
          msg: "Job Drafted successfully",
          color: "green",
        });
        setTimeout(() =>{
          setNotification("")
          navigate(`/posted-job/${response.id}`)
        }, 3000);
      }
    } catch (err) {
      console.error("Error posting job:", err);
       setNotification({
        msg: "Failed to post job",
        color: "red",
      });
      return;
    }
  };


  useEffect(()=>{
    window.scrollTo(0,0);
    if (id !== 0) {
      getJobById(id).then((res) =>{
        console.log("result is ",res)
      }).catch((err)=>{
        console.error(err);
      })
    }
  },[id])

  return (
    <div>
       {notification && (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
    <Notification msg={notification.msg} color={notification.color} />
  </div>
)}
      <div className="flex w-full gap-10 sm-mx:flex-col sm-mx:gap-0">
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Job Title <span className="text-red-500">*</span>
          </label>
          <Select
            options={job_title}
            isMulti={false}
            components={animatedComponents}
            value={selectedJobTitle}
            onChange={(selected) => setSelectedJobTitle(selected)}
            placeholder="Select job Title"
            styles={customStyles}
            className="w-full"
          />
        </div>

        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            company <span className="text-red-500">*</span>
          </label>
          <Select
            options={company}
            isMulti={false}
            components={animatedComponents}
            value={selectedCompany}
            onChange={(selected) => setSelectedCompany(selected)}
            placeholder="Select company"
            styles={customStyles}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex w-full gap-10 sm-mx:flex-col sm-mx:gap-0">
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Experience <span className="text-red-500">*</span>
          </label>
          <Select
            options={experience}
            isMulti={false}
            components={animatedComponents}
            value={selectedExperience}
            onChange={(selected) => setSelectedExperience(selected)}
            placeholder="Select job Title"
            styles={customStyles}
            className="w-full"
          />
        </div>

        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Job Type <span className="text-red-500">*</span>
          </label>
          <Select
            options={job_type}
            isMulti={false}
            components={animatedComponents}
            value={selectedJobType}
            onChange={(selected) => setSelectedJobType(selected)}
            placeholder="Select job Title"
            styles={customStyles}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex w-full gap-10 sm-mx:flex-col">
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Location <span className="text-red-500">*</span>
          </label>
          <Select
            options={location}
            isMulti={false}
            components={animatedComponents}
            value={selectedLocation}
            onChange={(selected) => setSelectedLocation(selected)}
            placeholder="Select location"
            styles={customStyles}
            className="w-full border"
          />
        </div>

        <div className="w-full mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Salary{" "}
            <span className="text-red-500">
              [Expected salary range between 1 lpa to 300 lpa]
            </span>
          </label>

          <input
            type="number"
            placeholder="Enter number"
            min={1}
            max={300}
            value={number}
            className="bg-transparent w-full p-1 text-mine-shaft-300 border border-gray-600"
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val >= 1 && val <= 300) {
                setNumber(val);
              } else if (!e.target.value) {
                setNumber(""); // allow empty string for reset
              }
            }}
          />
        </div>
      </div>
      <div>
        <SkillsInput skills={skills} setSkills={setSkills} />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-4">
          About job <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={2}
          placeholder="About job"
          className="bg-transparent w-full p-2 text-mine-shaft-300 border border-gray-600 rounded focus:outline-none focus:ring-2"
          value={aboutJob}
          onChange={(e) => setAboutJob(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Enter job description"
          className="bg-transparent w-full p-2 text-mine-shaft-300 border border-gray-600 rounded focus:outline-none focus:ring-2 "
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div
        className="flex gap-6 mt-6 [&>button]:text-bright-sun-400 [&>button]:px-3 
      [&>button]:py-2 [&>button]:border [&>button:hover]:text-bright-sun-600"
      >
        <button onClick={handlePost}>Publsih Job</button>
        <button onClick={handleDraft}>Save as a Draft</button>
      </div>
    </div>
  );
};

export default SelectInput;
