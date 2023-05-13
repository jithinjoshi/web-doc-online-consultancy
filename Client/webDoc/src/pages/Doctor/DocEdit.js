import React from 'react'
import NavBar from '../../components/Doctors/NavBar.js'
import SideBar from '../../components/Doctors/SideBar.js'
import EditProfile from '../../components/Doctors/EditProfile'
import Footer from '../../components/Doctors/Footer.js'


const DocEdit = () => {
  return (
    <>
            <div>
                <NavBar/>
                <div class="flex overflow-hidden bg-white pt-16">
                    <SideBar />
                    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                        <main className=" flex flex-auto">
                            <div class="pt-6 px-4 justify-center">
                            <h2 className='text-xl'>Edit Profile</h2>
                            <EditProfile/>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
  )
}

export default DocEdit