import React from 'react'

const UsersCount = ({appointments,payment,patients}) => {
  return (
    <>
        <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{patients?.length}</span>
                                                <h3 class="text-base font-normal text-gray-500">Patients</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{appointments}</span>
                                                <h3 class="text-base font-normal text-gray-500">Appointments</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{payment}</span>
                                                <h3 class="text-base font-normal text-gray-500">Earnings</h3>
                                            </div>
                                        </div>
                                    </div>

                                    

                                </div>
    </>
  )
}

export default UsersCount