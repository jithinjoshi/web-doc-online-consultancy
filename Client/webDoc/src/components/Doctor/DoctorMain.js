import React from 'react'

const DoctorMain = ({appointments,payment}) => {

    return (
        <div className=''>
            <div class="flex w-full justify-center my-5 -mx-2 ms-36">
                <div class="w-80 lg:w-80 p-2">
                    <div class="flex items-center flex-row w-full bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
                        <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="object-scale-down transition duration-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-around flex-grow ml-5 text-white">
                            <div class="text-xs whitespace-nowrap">
                                Total Patients
                            </div>
                            <div class="">
                                {appointments}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-80 md:w-1/3 lg:w-80 p-2 ">
                    <div class="flex items-center flex-row w-full bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
                        <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" class="object-scale-down transition duration-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 0v3m0-3h3m-3 0H9a3 3 0 00-3 3v8a3 3 0 003 3h6a3 3 0 003-3v-8a3 3 0 00-3-3h-3zm0 0v6"/>
</svg>
                        </div>
                        <div class="flex flex-col justify-around flex-grow ml-5 text-white">
                            <div class="text-xs whitespace-nowrap">
                                Total Appointments
                            </div>
                            <div class="">
                                {appointments}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-80 md:w-1/3 lg:w-1/3 p-2">
                    <div class="flex items-center flex-row w-full bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
                        <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="object-scale-down transition duration-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-around flex-grow ml-5 text-white">
                            <div class="text-xs whitespace-nowrap">
                                Total Income
                            </div>
                            <div class="">
                                {payment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoctorMain