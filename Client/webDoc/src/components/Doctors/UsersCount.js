import React from 'react'

const UsersCount = () => {
  return (
    <>
        <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">10</span>
                                                <h3 class="text-base font-normal text-gray-500">Patients</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5</span>
                                                <h3 class="text-base font-normal text-gray-500">Appointments</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">3</span>
                                                <h3 class="text-base font-normal text-gray-500">Appointments Today</h3>
                                            </div>
                                        </div>
                                    </div>

                                </div>
    </>
  )
}

export default UsersCount