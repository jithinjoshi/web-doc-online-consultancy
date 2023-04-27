import React, { useEffect, useState } from 'react'
import { getSingleDoctor } from '../../Helpers/userHelper';


const DoctorSlotBook = ({doctorId}) => {
    const [doctor, setDoctor] = useState([]);
    useEffect(() => {
        getSingleDoctor(doctorId).then((doctor) => {
            setDoctor(doctor?.data)
        }).catch((err) => {
            return err;
        })
    }, []);
    return (
        <>
            <div class="flex justify-center relative top-1/3 mt-10">
            <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                                <div class="relative flex gap-4">
                                    <img src={doctor?.image?.secure_url} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
                                    <div class="flex flex-col w-full">
                                        <div class="flex flex-row justify-between">
                                            <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">Dr.{`${doctor?.firstName} ${doctor?.lastName}`}</p>
                                        </div>
                                        <p class="text-gray-400 text-sm">{doctor?.department}</p>
                                    </div>
                                </div>
                                <p class="-mt-4 text-gray-500 w-96">{doctor?.about}</p>
                            </div>

            </div>
        </>
    )
}

export default DoctorSlotBook