import React, { useEffect, useRef, useState } from "react";
import background from "../assets/background.avif";
import avatar from "../assets/avataar.jpg";
import {
  IconMapPin,
  IconPencil,
  IconFileSadFilled,
  IconCircleX,IconEdit,
  IconBriefcase
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import Storage from "../services/Storage";
// import { updateProfile, fetchUserProfile } from "../services/ProfileService";
import { updateUserProfile, fetchUserProfile } from "../slices/ProfileSlice";
import Notification from "../signUpLogin/Notification";
import SelectProfileInfo from "./SelectProfileInfo";
import { updateProfile } from "../services/ProfileService";

const Info = () => {
  const [edit, setEdit] = useState(false);
  const [isFile,setIsFile] = useState(false);
  const [notification, setNotification] = useState("");
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [fileObject, setFileObject] = useState(null);

   const name = Storage.getItems("user")?.name || "User";
  
const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({
  jobTitle: { label: "", value: "" },
  company: { label: "", value: "" },
  location: { label: "", value: "" },
  name: name
});

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.profileId) dispatch(fetchUserProfile(user.profileId));
  }, [user.profileId, dispatch]);

  useEffect(() => {
    if (profile.jobTitle || profile.company || profile.location) {
      setProfileData({
        jobTitle: { label: profile.jobTitle, value: profile.jobTitle },
        company: { label: profile.company, value: profile.company },
        location: { label: profile.location, value: profile.location },
        name:profile.name
      });
    }
  }, [profile]);

     const handleIconClick = () => {
       fileInputRef.current?.click();
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setFileObject(file); // store the actual File object

  const reader = new FileReader();
  reader.onloadend = () => {
    setSelectedImage(reader.result); // preview image
  };
  reader.readAsDataURL(file);
};


//    const handleEdit = async () => {
//     if (edit){
//   const formData = new FormData();
//   formData.append("jobTitle", profileData.jobTitle?.value || "");
// formData.append("company", profileData.company?.value || "");
// formData.append("location", profileData.location?.value || "");
//   if (fileObject) {
//     formData.append("image", fileObject); // correct: send File
//   }
//   try {
//     const updated = await updateProfile(user.profileId,formData); // use profileId
//     setProfileData({
//       jobTitle: { label: updated.jobTitle, value: updated.jobTitle },
//       company: { label: updated.company, value: updated.company },
//       location: { label: updated.location, value: updated.location },
//     });
//   }
//   catch (err) {
//     console.error("Update failed:", err);
//   }
// }
//   setEdit(!edit)
// };

     const handleEdit = async () => {
  if (edit) {
      const userObj = Storage.getItems("user") || {};
    Storage.setItems("user", { ...userObj, name });


    const formData = new FormData();
    formData.append("id", user.profileId);
    formData.append("jobTitle", profileData.jobTitle?.value || "");
    formData.append("company", profileData.company?.value || "");
    formData.append("location", profileData.location?.value || "");
    if (fileObject) {
      formData.append("image", fileObject);
    }

    try {
     const updated = await dispatch(updateUserProfile({ id: user.profileId, formData }));
      setProfileData({
        jobTitle: { label: updated.jobTitle, value: updated.jobTitle },
        company: { label: updated.company, value: updated.company },
        location: { label: updated.location, value: updated.location },
      });
    } catch (err) {
      console.error("Update failed:", err);
    }
  }
  setEdit(!edit);
};


  return (
    <div className="">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        {notification && (
          <Notification
            msg={notification.msg}
            color={notification.color || "red"}
          />
        )}
      </div>

      <div className="w-full relative">
        <img
          src={background}
          alt=""
          className="h-[200px] sm-mx:h-[150px] xsm-mx:h-[120px] w-full rounded-2xl object-cover"
        />

        {/* Avatar Container with Overlay */}
        <div className="h-48 w-48 absolute left-4 -bottom-1/3 lg-mx:h-44 xl-mx::w-44 bs-mx:h-40 bs-mx:w-40 bs-mx:top-16 sm-mx:h-32 sm-mx:w-32 sm-mx:top-18 xsm-mx:h-28 xsm-mx:w-28 xsm-mx:top-12">
          <div className="relative group h-full w-full">
            {/* Avatar Image */}
            <img
              src={selectedImage}
              className="h-full w-full rounded-full border-8 border-mine-shaft-950 object-contain"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <span className="text-white cursor-pointer" onClick={handleIconClick}><IconEdit /></span>{" "}
               <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between px-10 mt-16 text-mine-shaft-300">
        {edit ? (
          <div className="w-full">
            <SelectProfileInfo
              profileData={profileData}
              setProfileData={setProfileData}
            />
          </div>
        ) : (
          <div>
            <div className="text-4xl md-mx:text-2xl font-semibold">{name}</div>
            <div className="flex gap-2 text-xl items-center">
              <div className="text-2xl md-mx:text-xl font-semibold">
                {profile.jobTitle} &bull;
              </div>
              {profile.company}
            </div>
            <div className="flex gap-2 pt-2 text-xl items-center">
              <div className="text-xl">
                <IconMapPin
                  stroke={2}
                  className="h-8 w-8 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
                />
              </div>
              {profile.location}
            </div>
            <div className="text-2xl pt-2 flex gap-2">
              <div className="text-xl">
                <IconBriefcase
                  stroke={2}
                  className="h-8 w-8 text-bright-sun-300 rounded-full p-2 bg-mine-shaft-700"
                />
              </div>
              <div className="md-mx:text-lg">
              Experience: {profile.totalExp} yrs.
              </div>
            </div>
          </div>
        )}

        <div className="cursor-pointer">
          {edit ? (
            <div className="flex gap-2">
              <IconFileSadFilled
                stroke={1.5}
                className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
                onClick={handleEdit}
              />
              <IconCircleX
                onClick={() => setEdit(false)}
                className="text-red-600 h-8 w-8"
              />
            </div>
          ) : (
            <IconPencil
              stroke={1.5}
              className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
              onClick={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;

