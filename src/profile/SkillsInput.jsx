import React, { useState } from "react";

const SkillsInput = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!skills.includes(input.trim())) {
        setSkills([...skills, input.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-white text-sm font-semibold">
        Skills <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-wrap items-center gap-2 px-2 py-2 border border-gray-600 rounded bg-mine-shaft-900 text-white">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-mine-shaft-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="text-white hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Enter skill"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SkillsInput;
