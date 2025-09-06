import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ vertical = false }) => {
  const user = useSelector((state) => state.user);
  const id = user?.profileId;

  const accountType = user?.accountType;

  const linkClass = ({ isActive }) =>
    isActive
      ? 'border-b-4 border-yellow-400 pb-1 text-yellow-400'
      : 'hover:border-b-4 hover:transition pb-1 transition 0.2s-ease';

  return (
    <div
      className={`flex ${vertical ? 'flex-col items-start gap-4' : 'flex-row items-center gap-5'} text-2xl`}
    >
      <NavLink to="/find-job" className={linkClass} onClick={() => setMenuOpen?.(false)}>Find Jobs</NavLink>
      <NavLink to="/find-talent" className={linkClass} onClick={() => setMenuOpen?.(false)}>Find Talent</NavLink>
     
      {accountType === 'EMPLOYER' && (
           <NavLink to="/post-jobs/0" className={linkClass} onClick={() => setMenuOpen?.(false)}>Post Jobs</NavLink>
      )}
      
      {accountType === 'EMPLOYER' && (
        <NavLink to={`/posted-job/${id}`} className={linkClass} onClick={() => setMenuOpen?.(false)}>Posted Job</NavLink>
      )}

     {accountType === 'EMPLOYER' && (
         <NavLink to="/job-history" className={linkClass} onClick={() => setMenuOpen?.(false)}>Job History</NavLink>
     )}
      
    </div>
  );
};

export default NavLinks;
