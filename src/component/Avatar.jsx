import React from 'react';
import avataar from '../assets/avataar.jpg';

const Avatar = () => {
  return (
    <div className='w-8 h-8 border-2 bg-blue-500 rounded-full overflow-hidden'>
      <img src={avataar} alt="avatar" className='w-full h-full object-cover' />
    </div>
  );
};

export default Avatar;
