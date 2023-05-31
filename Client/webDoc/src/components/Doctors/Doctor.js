import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import UsersCount from './UsersCount'
import Footer from './Footer'
import MonthlyReport from './MonthlyReport'
import WeeklyReport from './WeeklyReport'
import YearlyReport from './YearlyReport'
import DailyReport from './DailyReport'

const Doctor = ({appointments,payment,patients,userId,Logout}) => {
    return (
        <>
            <div>
                <NavBar Logout={Logout}/>
                <div class="flex overflow-hidden bg-white pt-16">
                    <SideBar />
                    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                        <main>
                            <div class="pt-6 px-4">

                                <UsersCount appointments={appointments} payment={payment} patients={patients}/>
                                <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                                    <MonthlyReport userId = {userId}/>
                                    <WeeklyReport/>
                                    <YearlyReport/>
                                    <DailyReport/>

                                </div>
                            </div>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doctor