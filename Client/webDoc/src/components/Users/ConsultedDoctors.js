import React, { useEffect, useState } from 'react'
import { Stethoscope, IndianRupee } from 'lucide-react';
import { getAppointedDoctors } from '../../Helpers/userHelper';
import { Link } from 'react-router-dom';

const ConsultedDoctors = () => {
    const [doctors, setDoctors] = useState([])
    useEffect(() => {
        getAppointedDoctors().then((doctors) => {
            setDoctors(doctors?.data)
        })
    }, [])

    return (
        <>
            <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
                <h2 className="text-3xl font-bold">Consulted Doctors</h2>
                {doctors.length > 0 ? (
                    <>
                        <ul className="flex flex-col divide-y divide-gray-200">
                            {doctors?.map((doctor, index) => (
                                <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                    <div className="flex w-full space-x-2 sm:space-x-4">
                                        <img
                                            className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                                            src={doctor?.image?.secure_url}
                                            alt='doc-pic'
                                        />
                                        <div className="flex w-full flex-col justify-between pb-4">
                                            <div className="flex w-full justify-between space-x-2 pb-2">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{`${doctor?.firstName} ${doctor?.lastName}`}</h3>
                                                    <div className="flex items-center space-x-2 px-2 py-1">
                                                        <Stethoscope size={16} />
                                                        <p className="text-sm">{doctor?.department}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2 px-2 py-1">
                                                        <IndianRupee size={16} />
                                                        <p className="text-sm">{doctor?.fees}</p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <Link
                                                        to={`/prescriptions/${doctor?._id}`}
                                                        type="button"
                                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                    >
                                                        prescriptions
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* <div className="flex justify-center mt-4">
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md mr-2"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div> */}
                    </>
                ) : (
                    <section className="py-4 overflow-hidden">
                        <div className="container px-4 mx-auto">
                            <img
                                className="mx-auto w-28"
                                src="https://media.istockphoto.com/id/1317104251/vector/calendar-grid-with-red-cross-mark-symbol.jpg?s=612x612&w=0&k=20&c=bmTGgOPuIDroHRh_CpLXo4aZINhUGsL1HFRo2BVlltU="
                                alt=""
                            />
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="font-heading mb-3 text-2xl font-semibold">No Appointments are available</h2>
                                <p className="mb-7 text-neutral-500">
                                    Please schedule an appointment with your convenient doctor and cure your diseases.
                                </p>
                                <Link
                                    to="#"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    Take Appointment
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

export default ConsultedDoctors