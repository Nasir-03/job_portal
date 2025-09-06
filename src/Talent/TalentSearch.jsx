import React, { useState } from "react";
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconBrandWordpress,
} from "@tabler/icons-react";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-slider/assets/index.css";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";
import { updateFilter } from "../slices/FilterSlice";
const animatedComponents = makeAnimated();

const TalentSearch = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [from, setFrom] = useState(25000);
  const [to, setTo] = useState(30000);
  const [range, setRange] = useState([25000, 300000]);

  const dispatch = useDispatch();

  const handleSelect = (key,select) => {
    dispatch(updateFilter(
      {[key] : select.map((s) => s.value)}
    ))
  }

  const name = [
    { value: "Jorge Wood", label: "Jorge Wood" },
    { value: "Nasir Equbal", label: "Nasir Equbal" },
    { value: "Rohit Patel", label: "Rohit Patel" },
    { value: "Kapil Agnihotri", label: "Kapil Agnihotri" },
    { value: "Ayush", label: "Ayush" },
    { value: "Md. Arbaz", label: "Md. Arbaz" },
    { value: "Abdul pathan", label: "Abdul pathan" },
  ];

  const location = [
    { value: "Delhi", label: "Delhi" },
    { value: "Pune", label: "Pune" },
    { value: "Indore", label: "Indore" },
    { value: "Banglore", label: "Banglore" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bhopal", label: "Bhopal" },
  ];

  const job_title = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Java Developer", label: "Java Developer" },
    { value: "Front End", label: "Front End" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "Cyber Sceurity", label: "Cyber Sceurity" },
    { value: "AI Engineer", label: "AI Engineer" },
  ];

  const skill = [
    {value:"Java", label : "Java"},
    {value:"Python", label : "python"},
    {value:"C++", label : "C++"},
    {value:"React js", label : "React js"},
    {value:"Tailwind", label : "Tailwind"},
    {value:"CSS", label : "CSS"},
    {value:"HTML", label : "HTML"},
    {value:"DSA", label : "DSA"},
  ]

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "2px",
      color: "#d1d5db",
      flexWrap: "wrap", // ✅ wrap chips left to right
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap", // ✅ ensure multiValue wraps correctly
      gap: "4px",
      alignItems: "center",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#4f4f4f",
      borderRadius: "10px",
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      // text:"white",
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
        backgroundColor: "black", // red-700 hover remove
        color: "white",
      },
    }),
    option: (base, state) => ({
      ...base,
      // backgroundColor: state.isFocused ? "#374151" : "#1f2937",
      color: "#b0b0b0",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#454545",
      zIndex: 20,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    input: (base) => ({
      ...base,
      color: "#d1d5db",
    }),
  };

  return (
    // <div className="pt-10 flex items-center px-5">
    //   <div className="w-1/5 flex items-center px-2 gap-2 bg-transparent rounded">
    //     <div>
    //       <IconSearch
    //         stroke={2}
    //         className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
    //       />
    //     </div>

    //     <Select
    //       options={name}
    //       isMulti
    //       components={animatedComponents}
    //       placeholder="Talent Name"
    //       styles={customStyles}
    //       className="w-full"
    //     />
    //   </div>

    //   <div className="w-1/5 flex items-center px-2 gap-2 bg-transparent rounded">
    //     <div>
    //       <IconMapPin
    //         stroke={2}
    //         className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
    //       />
    //     </div>

    //     <Select
    //       options={job_title}
    //       isMulti
    //       components={animatedComponents}
    //       placeholder="job title"
    //       styles={customStyles}
    //       className="w-full"
    //       onChange={(selected) => handleSelect("job_title", selected)}
    //     />
    //   </div>

    //   <div className="w-1/5 flex items-center px-2 gap-2 bg-transparent rounded">
    //     <div>
    //       <IconMapPin
    //         stroke={2}
    //         className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
    //       />
    //     </div>

    //     <Select
    //       options={location}
    //       isMulti
    //       components={animatedComponents}
    //       placeholder="location"
    //       styles={customStyles}
    //       className="w-full"
    //       onChange={(selected) => handleSelect("location", selected)}
    //     />
    //   </div>

    //   <div className="w-1/5 flex items-center px-2 gap-2 bg-transparent rounded">
    //     <div>
    //       <IconBrandWordpress
    //         stroke={2}
    //         className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
    //       />
    //     </div>
    //     <Select
    //       options={skill}
    //       isMulti
    //       components={animatedComponents}
    //       placeholder="skills"
    //       styles={customStyles}
    //       className="w-full"
    //       onChange={(selected) => handleSelect("skills", selected)}
    //     />
    //   </div>

    //   <div className="w-1/5 font-semibold text-lg items-center">
    //     <div className="text-mine-shaft-300 pb-2 flex justify-between">
    //       <div>Salary</div>
    //       <div>&#8377;4lpa - &#8377;10lpa</div>
    //     </div>
    //     <div className="w-full bg-bright-sun-600 h-2 rounded-lg"></div>
    //   </div>
    // </div>

   
    <div className="pt-10 px-5 pb-6 bg-mine-shaft-950 border-b border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Job Role */}
            <div className="flex items-center px-2 gap-2 bg-transparent rounded">
              <IconSearch
                stroke={2}
                className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
              />
              <Select
                options={name}
                isMulti
                components={animatedComponents}
                placeholder="Talent Name"
                styles={customStyles}
                className="w-full"
                onChange={(selected) => handleChange("job_role", selected)}
              />
            </div>
    
            <div className="flex items-center px-2 gap-2 bg-transparent rounded">
              <IconMapPin
                stroke={2}
                className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
              />
              <Select
                options={job_title}
                isMulti
                components={animatedComponents}
                placeholder="Job_Title"
                styles={customStyles}
                className="w-full"
                onChange={(selected) => handleSelect("job_title", selected)}
              />
            </div>
    
            {/* Experience */}
            <div className="flex items-center px-2 gap-2 bg-transparent rounded">
              <IconBriefcase
                stroke={2}
                className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
              />
              <Select
                options={location}
                isMulti
                components={animatedComponents}
                placeholder="Location"
                styles={customStyles}
                className="w-full"
                onChange={(selected) => handleSelect("location", selected)}
              />
            </div>
    
            {/* Skills */}
            <div className="flex items-center px-2 gap-2 bg-transparent rounded">
              <IconBrandWordpress
                stroke={2}
                className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
              />
              <Select
                options={skill}
                isMulti
                components={animatedComponents}
                placeholder="Skills"
                styles={customStyles}
                className="w-full"
                onChange={(selected) => handleSelect("skills", selected)}
              />
            </div>
    
            {/* Salary Range */}
            <div className="flex flex-col justify-center">
              <div className="text-mine-shaft-300 pb-2">Salary range</div>
              <div className="w-full bg-bright-sun-600 h-2 rounded-lg"></div>
            </div>
          </div>
        </div>
  );
};

export default TalentSearch;
