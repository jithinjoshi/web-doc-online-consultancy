import React from 'react'

const Doctors = ({ doctors, setSelectedDoctor }) => {
    return (
        <div class="flex flex-col mt-8">
            <div class="flex flex-row items-center justify-between text-xs">
                <span class="font-bold">Active Conversations</span>
                {/* <span
              class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >4</span 
            >*/}
            </div>
            {
                doctors.map((doctor) => {
                    return (
                        <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto" onClick={()=>setSelectedDoctor({doctorId:doctor?.doctorId,doctorName:doctor?.doctorName,doctorImage:doctor?.doctorImage})}>
                            <button
                                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                            >
                                <img src={doctor?.doctorImage}
                                    class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                />
                                <div class="ml-2 text-sm font-semibold">{doctor?.doctorName}</div>
                            </button>
                        </div>

                    )
                })
            }


        </div>
    )
}

export default Doctors