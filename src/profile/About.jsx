import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconFileSadFilled, IconPencil } from "@tabler/icons-react";
import { updateUserProfile } from "../slices/ProfileSlice";
import Notification from "../signUpLogin/Notification";

const About = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [about, setAbout] = useState("");
  const [notification, setNotification] = useState("");

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // const handleEdit = async () => {
  //   if (edit) {
  //     try {
  //       const formData = new FormData();

  //        formData.append("about",about);
  //        const response = await updateUserProfile(user.profileId,formData);

  //       // setAbout(response.about); 
  //       setEdit(false); // exit edit mode
  //       setNotification({ msg: "About updated successfully", color: "green" });
  //       setTimeout(() => setNotification(""), 3000);
  //     } catch (err) {
  //       console.error("Failed to update about:", err);
  //       setNotification({ msg: "Failed to update about", color: "red" });
  //       setTimeout(() => setNotification(""), 3000);
  //     }
  //   } else {
  //     setEdit(true);
  //   }
  // };

    const handleEdit = async () => {
  if (edit) {
    try {
      const formData = new FormData();
      formData.append("about", about);

      // ✅ Correctly dispatch with object containing id & formData
      const response = await dispatch(
        updateUserProfile({ id: user.profileId, formData })
      ).unwrap();

      setEdit(false);
      setNotification({ msg: "About updated successfully", color: "green" });
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Failed to update about:", err);
      setNotification({ msg: "Failed to update about", color: "red" });
      setTimeout(() => setNotification(""), 3000);
    }
  } else {
    setEdit(true);
  }
};


  useEffect(() => {
    if (profile.about) {
      setAbout(profile.about);
    }
  }, [profile.about]);

  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        {notification && (
          <Notification
            msg={notification.msg}
            color={notification.color || "red"}
          />
        )}
      </div>
      <div>
        <div className="px-3 text-3xl font-bold text-mine-shaft-300 mt-10 flex justify-between">
          <div className="pb-2">About</div>

          <div className="cursor-pointer" onClick={handleEdit}>
            {edit ? (
              <IconFileSadFilled
                stroke={1.5}
                className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
              />
            ) : (
              <IconPencil
                stroke={1.5}
                className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
              />
            )}
          </div>
        </div>

        {edit ? (
          <div>
            <textarea
              className="w-full bg-transparent border border-gray-600 p-4 text-mine-shaft-200 text-lg focus-visible:none"
              placeholder="Edit about"
              minLength={200}
              maxLength={500}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        ) : (
          <div className="text-xl md-mx:text-lg text-mine-shaft-300 pt- text-justify">
            {about || "No information provided."}
          </div>
        )}
      </div>
    </>
  );
};

export default About;
