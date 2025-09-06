import React, { useEffect, useState } from "react";
import {
  IconClockHour4,
  IconHeart,
  IconCalendarWeek,
} from "@tabler/icons-react";
import avatar from "../assets/avataar.jpg";
import { Link, useParams } from "react-router-dom";
import ScheduleModal from "../postedJob/ScheduleModal ";
import { getAllProfiles } from "../services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../slices/FilterSlice";

const Card = ({ columns = 4, posted, invited }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [talentProfile, setTalentProfile] = useState([]);
  const [filterTalents, setFilterTalents] = useState([]);

  const { id } = useParams();
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // ✅ fetch profiles
  useEffect(() => {
    dispatch(resetFilter());
    const fetchProfiles = async () => {
      try {
        const response = await getAllProfiles();
        setTalentProfile(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfiles();
  }, [id]);

  // ✅ apply filters
  useEffect(() => {
    let filtered = [...talentProfile];

    if (filter.job_title && filter.job_title.length > 0) {
      filtered = filtered.filter((t) => filter.job_title.includes(t.jobTitle));
    }

    if (filter.location && filter.location.length > 0) {
      filtered = filtered.filter((t) => filter.location.includes(t.location));
    }

    if (filter.skills && filter.skills.length > 0) {
      filtered = filtered.filter((t) =>
        t.skills?.some((s) => filter.skills.includes(s))
      );
    }

    setFilterTalents(filtered);
  }, [filter, talentProfile]);

  return (
    <div className="w-full">
      <div className="text-mine-shaft-300 text-4xl sm-mx:text-2xl font-bold p-6">
        Talents
      </div>

      <div
        className={`w-full min-h-[500px] bg-mine-shaft-950 gap-10 grid [&>div:hover]:border border-bright-sun-400 ${
          columns === 1
            ? "grid-cols-1 lg-mx:grid-cols-2 md-mx:grid-cols-1"
            : columns === 2
            ? "grid-cols-2"
            : "grid-cols-3 bs-mx:grid-cols-2 sm-mx:grid-cols-1"
        }`}
      >
        {filterTalents?.map(
          (items, index) =>
            items.id !== id && (
              <div key={index} className="flex flex-col h-full">
                <div className="bg-mine-shaft-900 rounded-xl flex flex-col gap-3 p-2 flex-1">
                  <div className="flex items-center justify-evenly">
                    <div className="bg-mine-shaft-700 rounded-full">
                      <img
                        src={avatar}
                        alt=""
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="text-mine-shaft-300">
                      <div className="text-xl font-semibold">
                        {items.jobTitle}
                      </div>
                      <div className="text-sm">{items.company}</div>
                    </div>
                    <div>
                      <IconHeart stroke={2} className="text-white" />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap px-4">
                    {items.skills?.map((skill, i) => (
                      <div
                        key={i}
                        className="py-1 px-2 text-bright-sun-300 bg-mine-shaft-900 rounded-xl text-xs"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-mine-shaft-300 text-justify px-2 line-clamp-3">
                    {items.about}
                  </div>

                  <div className="px-2">
                    <div className="border-b border-mine-shaft-300 mt-2 px-2"></div>
                  </div>

                  {invited ? (
                    <div className="flex gap-2">
                      <IconClockHour4
                        stroke={2}
                        className="text-mine-shaft-300"
                      />
                      interview: August 22, 2025 10:00 Am
                    </div>
                  ) : (
                    <div className="flex justify-between p-2">
                      <div className="text-lg text-mine-shaft-300">
                        Exp: {items.totalExp ? items.totalExp : 1} years.
                      </div>
                      <div className="flex gap-2 items-center">
                        <IconClockHour4
                          stroke={2}
                          className="text-mine-shaft-300"
                        />
                        <div className="text-mine-shaft-200 text-sm">
                          Posted 12 days ago
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="px-2">
                    <div className="border-b border-mine-shaft-300 mt-2"></div>
                  </div>

                  {/* <div className="flex w-full justify-between gap-3 px-2 text-mine-shaft-300">
                    <div className="w-1/2 flex">
                      {invited === "invited" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                        >
                          Accept
                        </button>
                      ) : (
                        <Link to={`/talent-profile/${items.id}`} className="w-1/2">
                          <button className="w-full border border-bright-sun-300 px-2 py-1 text-xl">
                            Profile
                          </button>
                        </Link>
                      )}
                    </div>

                    <div className="w-1/2 flex">
                      {posted === "scheduled" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                        >
                          Schedule
                          <IconCalendarWeek stroke={2} />
                        </button>
                      ) : invited === "invited" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-xl flex items-center justify-center gap-x-2"
                        >
                          Reject
                        </button>
                      ) : (
                        <button className="w-full border border-bright-sun-300 px-2 py-1 text-xl">
                          Message
                        </button>
                      )}
                    </div> */}

                  <div className="flex flex-col sm:flex-row w-full justify-between gap-3 px-2 text-mine-shaft-300">
                    {/* Left Button */}
                    <div className="flex-1 flex">
                      {invited === "invited" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm flex items-center justify-center gap-x-2"
                        >
                          Accept
                        </button>
                      ) : (
                        <Link
                          to={`/talent-profile/${items.id}`}
                          className="flex-1"
                        >
                          <button className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm">
                            Profile
                          </button>
                        </Link>
                      )}
                    </div>

                    {/* Right Button */}
                    <div className="flex-1 flex">
                      {posted === "scheduled" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm flex items-center justify-center gap-x-2"
                        >
                          Schedule
                          <IconCalendarWeek stroke={2} />
                        </button>
                      ) : invited === "invited" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm flex items-center justify-center gap-x-2"
                        >
                          Reject
                        </button>
                      ) : (
                        <button className="w-full border border-bright-sun-300 px-2 py-1 text-lg sm:text-sm">
                          Message
                        </button>
                      )}
                    </div>

                    {isModalOpen && (
                      <ScheduleModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Card;
