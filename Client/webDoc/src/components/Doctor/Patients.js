import React from 'react'

const Patients = ({ appointmentData }) => {
    return (
        <div class="flex flex-col ms-28">

            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">

                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <h2 className='text-xl'>Patients</h2>
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <thead class="bg-gray-200 border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        No:
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Patient Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointmentData?.map((appointment, index) => {
                                        return (
                                            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {appointment?.userId?.username}
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {appointment?.userId?.email}
                                                </td>
                                            </tr>

                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients