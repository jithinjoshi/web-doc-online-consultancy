import React from 'react'

const SingleDoctor = ({selectedDoctor}) => {
  return (
    <>
        <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full"
                            src={selectedDoctor?.doctorImage} alt="username" />
                        <span className="block ml-2 font-bold text-gray-600">{selectedDoctor?.doctorName}</span>
                    </div>
    </>
  )
}

export default SingleDoctor