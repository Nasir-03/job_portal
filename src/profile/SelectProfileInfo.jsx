import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Storage from "../services/Storage";

const animatedComponents = makeAnimated();

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

const location = [
  { value: "Noida", label: "Noida" },
  { value: "Delhi", label: "Delhi" },
  { value: "Bengluru", label: "Bengluru" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Indore", label: "Indore" },
  { value: "Ranchi", label: "Ranchi" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Pune", label: "Pune" },
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
  option: (base) => ({
    ...base,
    color: "#b0b0b0",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#454545",
    zIndex: 20,
    maxHeight: "150px",
    overflowY: "auto",
    padding: 10,
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

const SelectProfileInfo = ({ profileData, setProfileData }) => {
  const handleNameChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      name: e.target.value, // <-- string
    }));
  };

  const handleChange = (selected, field) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Edit Name"
        className="bg-transparent border-none"
        value={profileData.name} // now string
        onChange={handleNameChange}
      />

      <Select
        options={job_title}
        value={profileData.jobTitle}
        onChange={(selected) => handleChange(selected, "jobTitle")}
        placeholder="Job Title"
        styles={customStyles}
        components={animatedComponents}
      />

      <Select
        options={company}
        value={profileData.company}
        onChange={(selected) => handleChange(selected, "company")}
        placeholder="Company"
        styles={customStyles}
        components={animatedComponents}
      />

      <Select
        options={location}
        value={profileData.location}
        onChange={(selected) => handleChange(selected, "location")}
        placeholder="Location"
        styles={customStyles}
        components={animatedComponents}
      />
    </div>
  );
};

export default SelectProfileInfo;
