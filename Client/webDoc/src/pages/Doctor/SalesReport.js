import React from 'react'
import NavBar from '../../components/Doctors/NavBar'
import SideBar from '../../components/Doctors/SideBar'
import SalesReports from '../../components/Doctors/SalesReport'
import Footer from '../../components/Doctors/Footer'

const SalesReport = () => {
    return (
        <>
            <div>
                <div class="flex overflow-hidden bg-white pt-16">
                    <SideBar />
                    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" class="h-full w-full relative overflow-y-auto lg:ml-64">
                        <main>
                            <div class="pt-16 px-4">
                                <SalesReports />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesReport