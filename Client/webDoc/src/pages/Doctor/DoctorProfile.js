import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doctorProfile } from '../../Helpers/doctorHelper';
import Profile from '../../components/Doctor/Profile';
import SideBar from '../../components/Doctors/SideBar';


const DoctorsProfile = () => {
    let { id } = useParams();
    let [doctor, setDoctor] = useState([]);
    useEffect(() => {
        doctorProfile(id).then((doctor) => {
            setDoctor(doctor.data)
        }).catch((err) => {
            return err;
        })
    }, []);
    return (

        <>
            <div>
                <div class="flex overflow-hidden bg-white pt-16">
                    <SideBar/>
                    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" class="h-full w-full relative overflow-y-auto lg:ml-64">
                        <main>
                        
                            <div class="px-4">
                            <h2 className='text-2xl'>Profile</h2>
                                <Profile doctor={doctor} id={id}/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorsProfile

