import React, { useState } from "react";
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconBrandWordpress,
} from "@tabler/icons-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";
import { updateFilter } from "../slices/FilterSlice";

const animatedComponents = makeAnimated();

const Searching = () => {
  const dispatch = useDispatch();
  const [range, setRange] = useState([25000, 300000]);

  const handleChange = (key, selected) => {
    dispatch(updateFilter({ [key]: selected?.map((s) => s.value) || [] }));
  };

  const job_role = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Data Engineer", label: "Data Engineer" },
    { value: "Front End", label: "Front End" },
    { value: "Back End", label: "Back End" },
    { value: "React Js", label: "React Js" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Ai Engineer", label: "Ai Engineer" },
  ];

  const location = [
    { value: "Delhi", label: "Delhi" },
    { value: "Pune", label: "Pune" },
    { value: "Indore", label: "Indore" },
    { value: "Banglore", label: "Banglore" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bhopal", label: "Bhopal" },
  ];

  const Experience = [
    { value: "Entry Level", label: "Entry Level" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Expert", label: "Expert" },
  ];

  const skills = [
    { value: "Java", label: "Java" },
    { value: "DSA", label: "DSA" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "2px",
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
      display: "flex",
      alignItems: "center",
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
    <div className="pt-10 px-5 pb-6 bg-mine-shaft-950 border-b border-gray-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Job Role */}
        <div className="flex items-center px-2 gap-2 bg-transparent rounded">
          <IconSearch
            stroke={2}
            className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
          />
          <Select
            options={job_role}
            isMulti
            components={animatedComponents}
            placeholder="Select job roles"
            styles={customStyles}
            className="w-full"
            onChange={(selected) => handleChange("job_role", selected)}
          />
        </div>

        {/* Location */}
        <div className="flex items-center px-2 gap-2 bg-transparent rounded">
          <IconMapPin
            stroke={2}
            className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
          />
          <Select
            options={location}
            isMulti
            components={animatedComponents}
            placeholder="Select location"
            styles={customStyles}
            className="w-full"
            onChange={(selected) => handleChange("location", selected)}
          />
        </div>

        {/* Experience */}
        <div className="flex items-center px-2 gap-2 bg-transparent rounded">
          <IconBriefcase
            stroke={2}
            className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
          />
          <Select
            options={Experience}
            isMulti
            components={animatedComponents}
            placeholder="Experience"
            styles={customStyles}
            className="w-full"
            onChange={(selected) => handleChange("experience", selected)}
          />
        </div>

        {/* Skills */}
        <div className="flex items-center px-2 gap-2 bg-transparent rounded">
          <IconBrandWordpress
            stroke={2}
            className="h-10 w-10 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
          />
          <Select
            options={skills}
            isMulti
            components={animatedComponents}
            placeholder="Skills"
            styles={customStyles}
            className="w-full"
            onChange={(selected) => handleChange("skills", selected)}
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

export default Searching;
