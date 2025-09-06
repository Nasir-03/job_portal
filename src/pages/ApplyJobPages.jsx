import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApplyJobComp from '../ApplyJob/ApplyJobComp';
import { getJobById } from '../services/JobService';

const ApplyJobPages = () => {
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response);
      } catch (err) {
        console.log("Error occured here... ",err);
      }
    };

    fetchJob();
  }, [id]);

  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 pt-10 px-5'>
      <button
        className='px-2 py-1 bg-bright-sun-300 text-bright-sun-400 rounded-lg text-xl bg-opacity-15'
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {job && job.id && <ApplyJobComp {...job} />}
    </div>
  );
};

export default ApplyJobPages;
