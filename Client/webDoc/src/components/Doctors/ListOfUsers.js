import React, { useEffect, useState } from 'react'
import { getPatients } from '../../Helpers/doctorHelper'
import { Link, useNavigate } from 'react-router-dom'

const ListOfUsers = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([])
    useEffect(() => {
        getPatients().then((patients) => {
            setPatients(patients?.data);
        }).catch((err)=>{
            navigate('/doctor/signin'); 
        })

    }, [])
   
    return (
        <>
            <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">Patients</h3>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200">
                        {
                            patients?.map((patient, index) => {
                                return (
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center space-x-4">
                                            {/* <div class="flex-shrink-0">
                                                <img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                            </div> */}
                                            <div class="flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate">
                                                    {patient?.username}
                                                </p>
                                                <p class="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">{patient?.email}</a>
                                                </p>
                                            </div>


                                            <div class="flex-shrink-0">
                                                <Link to={`/doctor/prescriptionList/${patient?._id}`} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Prescripitons</Link>
                                            </div>





                                        </div>
                                    </li>

                                )
                            })
                        }

                    </ul>
                </div>
            </div >
        </>
    )
}

export default ListOfUsers