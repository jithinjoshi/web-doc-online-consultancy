import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShimmerPostList } from "react-shimmer-effects";
import NoDataFound from './NoDataFound';

const ListOfDoctors = ({ doctors }) => {
    const history = useNavigate();
    return (
        <>
            {
                doctors.length > 0 ?
                    <div class="min-h-screen flex justify-center items-center py-20">
                        <div class="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                            {
                                doctors.map((doctor) => {

                                    return (

                                        <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                            <div class="relative">
                                                <img class="w-full h-64 rounded-xl" src={doctor?.image?.secure_url} alt="Colors" />
                                            </div>
                                            <h3 class="m-2 text-xl font-bold text-indigo-600">{`${doctor?.firstName} ${doctor?.lastName}`}</h3>
                                            <h5 class="m-2 text-gray-800 text-lg font-bold cursor-pointer">{doctor?.department}</h5>
                                            <div class="my-4">
                                                <div class="flex space-x-1 items-center">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </span>
                                                    <b>{`Available on ${doctor?.startTime} to ${doctor?.endTime}`}</b>
                                                </div>
                                                <div class="flex space-x-1 items-center">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </span>
                                                    <p>Fees: <span className='font-bold'>₹{doctor?.fees}</span></p>
                                                </div>
                                                <Link to={`/appointment/${doctor?._id}`}><Button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Book Now</Button></Link>

                                            </div>
                                        </div>
                                    )
                                })

                            }

                        </div>
                    </div>
                    :
                    <NoDataFound />
            }
        </>
    )
}

export default ListOfDoctors