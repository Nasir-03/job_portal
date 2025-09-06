import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Profile from "./Profile";
import Card from "./Card";
import { getAllProfiles, getUserProfile } from "../services/ProfileService";

const TalentProfilePage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [talentProfile, setTalentProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(id);
        setProfileData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await getAllProfiles();
        setTalentProfile(res);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="bg-mine-shaft-950 pt-4">
      <div className="px-6">
        <Link to="/find-talent">
          <button className="text-xl border text-mine-shaft-300 px-4 py-2 border-bright-sun-400">
            back
          </button>
        </Link>
      </div>
      <div className="flex gap-10 mt-10 px-5 lg-mx:flex-col ">
       <div className="w-[75%] lg-mx:w-full">
        <Profile profileData={profileData} />
        </div>
        <div className="flex flex-col w-[25%] -mt-20 lg-mx:w-full lg-mx:mt-0">
          <Card columns={1} talentProfile={talentProfile}/>
        </div>
      </div>
    </div>
  );
};

export default TalentProfilePage;
