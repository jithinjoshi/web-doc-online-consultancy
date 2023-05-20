import React from 'react'
import LeaveDatePicker from '../../components/Doctor/LeaveDatePicker'
import SideBar from '../../components/Doctor/SideBar'
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/Doctor/doctorSlice';


const Leave = () => {
    const user = useSelector(selectUser);
  return (
    <>

    <div className='font-poppins antialiased overflow-x-hidden'>
      <div
        id="view"
        class="h-full w-screen flex flex-row"
        x-data="{ sidenav: true }"
      >
        <SideBar user={user} />
        <div>
          
          {/* <Patients appointmentData={appointmentData} /> */}
        </div>

        <div className='text-2xl ms-2'>Leave Application</div>
        
        <div className="items-center h-screen m-10" placeholder='select leave Date'>
        <h2>Select Leave Dates</h2>
      <LeaveDatePicker user={user?._id}/>
    </div>
      </div>

    </div>

    
    </>
  )
}

export default Leave