import React, { useState } from "react";
import TextArea from "../component/TextArea";
import { applyJob } from "../services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../signUpLogin/Notification";

const ApplyJobForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [url, setUrl] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { id: jobId } = useParams();

  const handlePrev = () => {
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const data = {
      applicantId: user.profileId,
      name: name,
      // email,email,
      webSite: url,
      phone: phone,
      coverLetter: message,
    };
    try {
      const response = await applyJob(jobId, data);
      if (response.code === 208) {
    setNotification({ msg: response.message, color: "red" });
  } else {
    setNotification({ msg: "Applied successfully", color: "green" });
  }
      console.log("success", response);
       setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setNotification({
        msg: error.response?.data?.message || error.message,
        color: "red",
      });
       setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
      {notification && (
         <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
              <Notification msg={notification.msg} color={notification.color} />
         </div>
      )}

      <div className="flex flex-col gap-5 w-full">
        <div className="text-2xl text-mine-shaft-300 font-bold mt-5">
          Submit your Application
        </div>

        <div className="grid grid-cols-2 gap-6 mt-5 w-full">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-mine-shaft-100 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="bg-mine-shaft-900 border border-mine-shaft-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-bright-sun-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={preview}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-mine-shaft-100 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="bg-mine-shaft-900 border border-mine-shaft-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-bright-sun-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={preview}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-mine-shaft-100 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="bg-mine-shaft-900 border border-mine-shaft-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-bright-sun-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly={preview}
            />
          </div>

          {/* Personal Website */}
          <div className="flex flex-col gap-2">
            <label className="text-mine-shaft-100 font-medium">
              Personal Website <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="Enter Url"
              className=" bg-mine-shaft-900 border border-mine-shaft-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-bright-sun-300"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              readOnly={preview}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mine-shaft-100 font-medium">
            Attach your cv<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            placeholder="your cv"
            className="bg-mine-shaft-900 border border-mine-shaft-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-bright-sun-300"
            readOnly={preview}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-mine-shaft-300 text-lg pb-2">
            Enter message here.
          </label>
          <textarea
            className="w-full h-32 p-3 bg-transparent border text-mine-shaft-300 text-xl border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message here..."
          />
        </div>
        {!preview ? (
          <button
            onClick={handlePrev}
            className="bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15 p-2 hover:text-bright-sun-200 "
          >
            Preview
          </button>
        ) : (
          <div className="w-full flex gap-5">
            <button
              onClick={handlePrev}
              className="w-1/2 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15 p-2 hover:text-bright-sun-200 "
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="w-1/2 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15 p-2 hover:text-bright-sun-200 "
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyJobForm;
