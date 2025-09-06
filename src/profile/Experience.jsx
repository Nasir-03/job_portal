import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { IconPencil, IconFileSadFilled } from "@tabler/icons-react";
import Notification from "../signUpLogin/Notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Selects from "./Selects";
import { updateUserProfile } from "../slices/ProfileSlice";

const Experience = () => {
  const [data, setData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formOpenIndex, setFormOpenIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [originalExperience, setOriginalExperience] = useState(null);
  const user = useSelector((state) => state.user);

  const disptach = useDispatch();

  const companyLogos = {
    microsoft: "/companies/microsoft.webp",
    google: "/companies/google.webp",
    amazon: "/companies/amazon.webp",
    netflix: "/companies/netflix.webp",
    meta: "/companies/meta.webp",
    oracle: "/companies/oracle.webp",
    spotify: "/companies/spotify.webp",
    pinterest: "/companies/pinterest.webp",
    walmart: "/companies/walmart.webp",
    figma: "/companies/figma.webp",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(user.profileId);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [user.profileId]);

  const handleChange = (index, field, value) => {
    const updated = [...data.experiences];
    updated[index][field] = value;
    setData({ ...data, experiences: updated });
  };

  const handleEditClick = (index) => {
    setFormOpenIndex(index);
    setOriginalExperience(JSON.parse(JSON.stringify(data.experiences[index])));
  };

  //   const handleDelete = async (index) => {
  //     const updatedExperiences = data.experiences.filter((_, i) => i !== index);
  //     const formData = new FormData()
  //     formData.append("experiences",updatedExperiences)
  //      try{

  //      const response = await disptach(
  //   updateUserProfile({
  //     id: user.profileId,
  //     formData
  //   })
  // );

  //       setData(response);
  //       setNotification({ msg: "Experience deleted successfully", color: "green" });
  //     } catch (err) {
  //       console.error("Delete failed:", err);
  //       setNotification({ msg: "Failed to delete", color: "red" });
  //     }
  //     setTimeout(() => setNotification(""), 3000);
  //     setFormOpenIndex(null);
  //     setEditingIndex(null);
  //   };

  const handleDelete = async (index) => {
    const updatedExperiences = data.experiences.filter((_, i) => i !== index);

    const formData = new FormData();
    formData.append(
      "experiences",
      new Blob([JSON.stringify(updatedExperiences)], {
        type: "application/json",
      })
    );

    // preserve other profile fields if backend requires them
    // if (data.jobTitle) formData.append("jobTitle", data.jobTitle);
    // if (data.company) formData.append("company", data.company);
    // if (data.location) formData.append("location", data.location);
    // if (data.about) formData.append("about", data.about);
    // if (data.imageFile) formData.append("image", data.imageFile);

    try {
      await disptach(
        updateUserProfile({
          id: user.profileId,
          formData,
        })
      );

      setData((prev) => ({
        ...prev,
        experiences: updatedExperiences,
      }));

      setNotification({
        msg: "Experience deleted successfully",
        color: "green",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      setNotification({ msg: "Failed to delete", color: "red" });
    }

    setTimeout(() => setNotification(""), 3000);
    setFormOpenIndex(null);
    setEditingIndex(null);
  };

  const handleSave = async () => {
    const updatedExperiences = [...data.experiences];
    const current = updatedExperiences[formOpenIndex];

    if (
      !current.title?.trim() ||
      !current.company?.trim() ||
      !current.location?.trim() ||
      !current.description?.trim() ||
      !current.startDate
    ) {
      setNotification({ msg: "Fields cannot be empty", color: "red" });
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "experiences",
        new Blob([JSON.stringify(updatedExperiences)], {
          type: "application/json",
        })
      );

      if (data.jobTitle) formData.append("jobTitle", data.jobTitle);
      if (data.company) formData.append("company", data.company);
      if (data.location) formData.append("location", data.location);
      if (data.about) formData.append("about", data.about);
      if (data.imageFile) formData.append("image", data.imageFile);

      // 🔹 Dispatch to backend
      await disptach(
        updateUserProfile({
          id: user.profileId,
          formData,
        })
      );

      // 🔹 Immediately update UI
      setData((prev) => ({
        ...prev,
        experiences: updatedExperiences,
      }));

      setNotification({ msg: "Experience saved", color: "green" });
      setEditingIndex(null);
      setFormOpenIndex(null);
      setOriginalExperience(null);
    } catch (err) {
      console.error("Save failed:", err);
      setNotification({ msg: "Failed to update", color: "red" });
    }
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddExperience = () => {
    if (formOpenIndex !== null) {
      setNotification({
        msg: "Please save the current entry first",
        color: "yellow",
      });
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    const newExperience = {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: null,
      endDate: null,
    };
    const updatedExperiences = [...(data.experiences || []), newExperience];
    setData({ ...data, experiences: updatedExperiences });
    setFormOpenIndex(updatedExperiences.length - 1);
  };

  return (
    <div className="pt-10">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        {notification && (
          <Notification
            msg={notification.msg}
            color={notification.color || "red"}
          />
        )}
      </div>

      <div className="mb-5 text-mine-shaft-300 text-3xl md-mx:text-2xl font-bold flex justify-between items-center xs-mx:gap-5">
        <span>Experience</span>
        <button
          onClick={handleAddExperience}
          className="text-green-500 border text-xl md-mx:text-lg xs-mx:text-sm border-green-800 px-4 py-2  md-mx:px-1 md-mx:py-1 rounded hover:bg-green-900 hover:text-white"
        >
          + Add Experience
        </button>
      </div>

      {data.experiences?.map((experience, index) => (
        <div key={index} className="mb-10 relative">
          <div className="border-b border-mine-shaft-300 mt-10 px-2" />

          {/* Top Right Icon */}
          <div className="absolute right-[0%] top-[-20%] pb-10 px-5 mt-10">
            {formOpenIndex === index ? (
              <IconFileSadFilled
                stroke={1.5}
                className="h-8 w-8 text-green-400 hover:text-green-700 cursor-pointer"
                onClick={handleSave}
              />
            ) : (
              <IconPencil
                stroke={1.5}
                className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700 cursor-pointer"
                onClick={() => {
                  setEditingIndex(index);
                  setFormOpenIndex(null);
                }}
              />
            )}
          </div>

          {/* View Mode */}
          {formOpenIndex !== index && (
            <div className="flex flex-col mt-10">
              <div className="flex md-mx:flex-col justify-between items-start">
                <div className="flex items-start gap-6 md-mx:justify-between w-full">
                  <div className="bg-mine-shaft-700 rounded-xl shrink-0">
                    <img
                      src={
                        companyLogos[experience.company?.toLowerCase()] ||
                        "/companies/figma.webp"
                      }
                      alt={experience.company}
                      className="h-16 w-16 md-mx:h-12 md-mx:w-12 object-contain rounded-xl"
                    />
                  </div>

                  <div className="text-mine-shaft-300 text-right">
                    <div className="font-bold text-xl sm-mx:text-lg">
                      {experience.title}
                    </div>
                    <div>
                      {experience.company} &#8226; {experience.location}
                    </div>
                  </div>
                </div>

                <div className="text-mine-shaft-300 font-semibold whitespace-nowrap">
                  {experience.startDate &&
                    new Date(experience.startDate).toLocaleDateString()}{" "}
                  -{" "}
                  {experience.endDate
                    ? new Date(experience.endDate).toLocaleDateString()
                    : "Present"}
                </div>
              </div>
              <div className="text-mine-shaft-300 text-sm text-justify pt-5">
                {experience.description}
              </div>
            </div>
          )}

          {/* Edit Mode */}
          {formOpenIndex === index && (
            <div className="flex flex-col gap-4 mt-10 text-mine-shaft-300">
              <Selects
                data={data.experiences}
                setData={(newData) =>
                  setData({ ...data, experiences: newData })
                }
                index={index}
              />
              <textarea
                value={experience.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="border border-gray-600 bg-transparent p-2 rounded"
              />
              <div className="flex gap-4">
                <DatePicker
                  selected={
                    experience.startDate ? new Date(experience.startDate) : null
                  }
                  onChange={(date) => handleChange(index, "startDate", date)}
                  className="bg-gray-300 text-yellow-500 p-2 border border-yellow-700 rounded"
                />
                <DatePicker
                  selected={
                    experience.endDate ? new Date(experience.endDate) : null
                  }
                  onChange={(date) => handleChange(index, "endDate", date)}
                  className="bg-gray-300 text-yellow-500 p-2 border border-yellow-700 rounded"
                />
              </div>
            </div>
          )}

          {/* Bottom Buttons */}
          {editingIndex === index && formOpenIndex !== index && (
            <div className="flex gap-4 mt-4 ml-2">
              <button
                className="text-bright-sun-600 border border-bright-sun-700 px-4 py-2 rounded"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500 border border-red-800 px-4 py-2 rounded"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Experience;
