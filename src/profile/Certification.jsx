import React from 'react'

const Certification = () => {
  return (
    <div className=''>
       <div className="border-b border-mine-shaft-300 mt-10 px-2"> </div>
       <div className="text-3xl font-bold text-mine-shaft-300 mt-10">
          Certification
        </div>

        <div className='pt-3 flex justify-between'>
            <div className='flex flex-wrap'>
                <div className='bg-mine-shaft-700 rounded-xl'>
                    <img src='/companies/oracle.webp' className='h-16 w-16 p-2'/>
                </div>
                <div className="text-mine-shaft-300 px-3">
            <div className="font-bold text-xl">Google professional cloud architecture</div>
            <div>Microsoft</div>
          </div>
            </div>
            <div className='text-mine-shaft-300 text-sm'>
                <div>issued AUG 2023</div>
                <div>ID:CB7279CG</div>
            </div>
        </div>
    </div>
  )
}

export default Certification
