import React, { useState, useEffect } from 'react';
import { IconPencil, IconFileSadFilled, IconCircleLetterX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../slices/ProfileSlice';
import Notification from '../signUpLogin/Notification';

const Skill = () => {
  const [edit, setEdit] = useState(false);
  const [skillItems, setSkillItems] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [notification, setNotification] = useState('');

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Load skills from profile
  useEffect(() => {
    if (Array.isArray(profile.skills)) {
      setSkillItems(profile.skills);
    }
  }, [profile.skills]);

  // Toggle edit mode
  const toggleSkillEdit = () => setEdit((prev) => !prev);

// const saveSkills = async () => {
//   if (edit) {
//     // Add any pending skill from the input field
//     const trimmed = newSkill.trim();
//     let updatedSkills = [...skillItems];

//     if (trimmed && !updatedSkills.includes(trimmed)) {
//       updatedSkills.push(trimmed);

//       setNotification({ msg: "Skill added successfully", color: "green" });
//       setTimeout(() => setNotification(""), 3000);
//     }

//     try {
//       const formData = new FormData()
//       formData.append("skills",skillItems);

//       const response = await dispatch(updateUserProfile(user.profileId ,formData)).unwrap();
//       console.log('Skills updated:', response);

//       setSkillItems(updatedSkills); // Update UI
//       setNewSkill("");              // Clear input
//       setEdit(false);              // Exit edit mode
//     } catch (err) {
//       console.error('Error updating skills:', err);
//     }
//   }
// };


  // Remove a skill by index
  

  const saveSkills = async () => {
  if (edit) {
    const trimmed = newSkill.trim();
    let updatedSkills = [...skillItems];

    if (trimmed && !updatedSkills.includes(trimmed)) {
      updatedSkills.push(trimmed);
    }

    try {
      const formData = new FormData();
      updatedSkills.forEach(skill => formData.append("skills", skill)); // Backend expects "skill" list

      const response = await dispatch(updateUserProfile({
        id: user.profileId,
        formData
      })).unwrap();

      setSkillItems(updatedSkills);
      setNewSkill("");
      setEdit(false);

      setNotification({ msg: "Skills updated successfully", color: "green" });
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Error updating skills:", err);
    }
  }
};

  
  
  const handleSkillRemove = (index) => {
    setSkillItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new skill
  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skillItems.includes(trimmed)) {
      setSkillItems((prev) => [...prev, trimmed]);
      setNewSkill('');
      setNotification({ msg: "Skill added successfully", color: "green" });
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                  {notification && (
                    <Notification msg={notification.msg} color={notification.color || "red"} />
                    )}   
                    </div> 
      <div className="flex justify-between px-5 text-3xl font-bold text-mine-shaft-300 mt-10">
        <div>Skills</div>
        <div className="cursor-pointer">
          {edit ? (
            <IconFileSadFilled
              stroke={1.5}
              className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
              onClick={saveSkills}
            />
          ) : (
            <IconPencil
              stroke={1.5}
              className="h-8 w-8 text-bright-sun-400 hover:text-bright-sun-700"
              onClick={toggleSkillEdit}
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-3 px-5 items-center">
        {skillItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-2 items-center cursor-pointer bg-bright-sun-300 group text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
          >
            {item}
            {edit && (
              <IconCircleLetterX
                stroke={2}
                className="text-red-700 hidden group-hover:block"
                onClick={() => handleSkillRemove(index)}
              />
            )}
          </div>
        ))}

        {edit && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="Add skill"
              className="bg-transparent border border-gray-500 px-3 py-1 rounded-lg text-mine-shaft-100 outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Skill;
