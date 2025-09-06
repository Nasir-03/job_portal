import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
  { value: "Figma", label: "Figma" },
  { value: "Google", label: "Google" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "Meta", label: "Meta" },
  { value: "Oracle", label: "Oracle" },
  { value: "Netflix", label: "Netflix" },
  { value: "Spotify", label: "Spotify" },
  { value: "Walmart", label: "Walmart" },
  { value: "Pinterest", label: "Pinterest" },
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

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     backgroundColor: "transparent",
//     border: "1px solid #b0b0b0",
//     boxShadow: "none",
//     padding: "2px",
//     color: "#d1d5db",
//     flexWrap: "wrap",
//   }),
//   valueContainer: (base) => ({
//     ...base,
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "4px",
//     alignItems: "center",
//   }),
//   multiValue: (base) => ({
//     ...base,
//     backgroundColor: "#4f4f4f",
//     borderRadius: "10px",
//     padding: "2px 4px",
//   }),
//   multiValueLabel: (base) => ({
//     ...base,
//     color: "white",
//     fontSize: "0.875rem",
//   }),
//   multiValueRemove: (base) => ({
//     ...base,
//     color: "white",
//     cursor: "pointer",
//     ":hover": {
//       backgroundColor: "black",
//       color: "white",
//     },
//   }),
//   option: (base) => ({
//     ...base,
//     color: "#b0b0b0",
//     cursor: "pointer",
//   }),
//   menu: (base) => ({
//     ...base,
//     backgroundColor: "#454545",
//     width: "600px",
//     zIndex: 20,
//     maxHeight: "150px",
//     overflowY: "auto",
//     padding: 10,
//   }),
//   placeholder: (base) => ({
//     ...base,
//     color: "#9ca3af",
//   }),
//   input: (base) => ({
//     ...base,
//     color: "#d1d5db",
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: "#d1d5db",
//   }),
// };

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




const Selects = ({ data, setData, index }) => {
  const handleChange = (selected, field) => {
    const newData = [...data];
    newData[index][field] = selected.value;
    setData(newData);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        options={job_title}
        value={
          data[index].title
            ? { label: data[index].title, value: data[index].title }
            : null
        }
        onChange={(selected) => handleChange(selected, "title")}
        placeholder="Job Title"
        styles={customStyles}
        components={animatedComponents}
      />

      <Select
        options={company}
        value={
          data[index].company
            ? { label: data[index].company, value: data[index].company }
            : null
        }
        onChange={(selected) => handleChange(selected, "company")}
        placeholder="Company"
        styles={customStyles}
        components={animatedComponents}
      />

      <Select
        options={location}
        value={
          data[index].location
            ? { label: data[index].location, value: data[index].location }
            : null
        }
        onChange={(selected) => handleChange(selected, "location")}
        placeholder="Location"
        styles={customStyles}
        components={animatedComponents}
      />
    </div>
  );
};

export default Selects;
