// // ScheduleModal.jsx
// import React, { useState } from 'react';

// const ScheduleModal = ({ onClose }) => {
//   const today = new Date().toISOString().split('T')[0];
//   const [date,setDate] = useState('')
//   const [time,setTime] = useState('')

//   const handleSubmit = ()=> {
//     onClose
//     console.log("date ",date);
//     console.log("time ",time);
    
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-mine-shaft-900 p-6 rounded-lg w-[90%] max-w-md text-white relative">
//        <button onClick={onClose} className="absolute right-3 top-3 text-xl font-bold">
//           &times;
//         </button>
//         <div className="text-2xl mb-4 font-semibold">Schedule Interview</div>

//         <label className="block text-sm mb-1">Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e)=>setDate(e.target.value)}
//           className="w-full bg-mine-shaft-800 border border-bright-sun-300 p-2 mb-4 rounded-md"
//           min={today}
//         />

//         <label className="block text-sm mb-1">Time</label>
//         <input
//           type="time"
//           value={time}
//           onChange={(e)=>setTime(e.target.value)}
//           className="w-full bg-mine-shaft-800 border border-bright-sun-300 p-2 rounded-md"
//        />
//         <div className='pt-5'>
//         <button onClick={handleSubmit} className='p-3 text-bright-sun-300 bg-mine-shaft-950 w-full text-lg'>Scheduled</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScheduleModal;










import React, { useState } from "react";

const ScheduleModal = ({ onClose, onSchedule, applicant }) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select date and time!");
      return;
    }

    // 🔥 send back selected date, time & applicant
    onSchedule({ applicant, date, time });

    onClose(); // close modal after scheduling
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-mine-shaft-900 p-6 rounded-lg w-[90%] max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl font-bold"
        >
          &times;
        </button>
        <div className="text-2xl mb-4 font-semibold">Schedule Interview</div>

        <label className="block text-sm mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-mine-shaft-800 border border-bright-sun-300 p-2 mb-4 rounded-md"
          min={today}
        />

        <label className="block text-sm mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-mine-shaft-800 border border-bright-sun-300 p-2 rounded-md"
        />

        <div className="pt-5">
          <button
            onClick={handleSubmit}
            className="p-3 text-bright-sun-300 bg-mine-shaft-950 w-full text-lg"
          >
            Scheduled
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
