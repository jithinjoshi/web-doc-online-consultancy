import React from 'react'
import SideBar from '../../components/Doctors/SideBar'
import SelectSchedule from '../../components/Doctors/SelectShedule'

const DocScheduleTime = () => {
  return (
    <>
    <div>
        <div class="flex overflow-hidden bg-white pt-1">
            <SideBar/>
            <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" class="h-full w-full relative overflow-y-auto lg:ml-64">
                <main>
                    <div class=" px-4">
                        <SelectSchedule/>
                    </div>
                </main>
            </div>
        </div>
    </div>
</>
  )
}

export default DocScheduleTime