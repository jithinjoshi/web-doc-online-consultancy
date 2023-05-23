import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Doctors/SideBar'
import PrescriptionForm from '../../components/Doctors/Prescription'
import { useParams } from 'react-router-dom'
import { getSingleAppointment } from '../../Helpers/doctorHelper'

const Prescription = () => {
    const {userId} = useParams();
  return (
    <>
            <div>
                <div class="flex overflow-hidden bg-white pt-16">
                    <SideBar/>
                    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" class="h-full w-full relative overflow-y-auto lg:ml-64">
                        <main>
                            <div class=" px-4">
                                <PrescriptionForm userId={userId}/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Prescription