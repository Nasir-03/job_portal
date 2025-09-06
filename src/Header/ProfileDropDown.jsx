import { IconMessageCircle, IconPhoto, IconUserCircle, IconTransfer, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { IconFileText, IconMoon, IconLogout2 } from '@tabler/icons-react';
import Border from '../component/Border';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../slices/UserSlice';
import { removeJwt } from '../slices/JwtSlice';

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
    navigate("/")
  }

  return (
    <div className='bg-mine-shaft-950 border border-gray-600 w-48 px-3 py-3  '>
      <div>
      <div>
        <Link to='/profile' className='flex items-center h-10 gap-4'>
        <IconUserCircle/>
        Profile
        </Link>
      </div>
      <div className='flex items-center h-10 gap-4 cursor-pointer' >
        <IconMessageCircle />
        Message
      </div>
      <div className='flex items-center h-10 gap-4 cursor-pointer'>
        <IconFileText stroke={1.5} />
        resume
      </div>
      <div className='flex items-center h-10 gap-4 cursor-pointer'>
        <IconMoon stroke={1.5}/>
        Dark Mode
      </div>
      </div>
      <Border />
      <div className='flex flex-col gap-2 mt-2'>
      <div className='text-red-400 flex gap-2 cursor-pointer' onClick={handleLogOut}>
        <IconLogout2 />Logout
      </div>
      </div>
    </div>
  )
}

export default ProfileDropDown
