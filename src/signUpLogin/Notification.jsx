import React from 'react'

const Notification = ({msg, color}) => {
    const colorList = {
        red:'border-red-500 text-red-500 bg-red-100',
        green:'border-green-500 text-green-500 bg-green-100',
        yellow:'border-yellow-500 text-yellow-700 bg-yellow-100',
    }
 
    const colorClass = colorList[color];

  return (
    <div>
      <div className={`border px-6 py-4 rounded-3xl ${colorClass}`}>
        {msg}
      </div>
    </div>
  )
}

export default Notification
