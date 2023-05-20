import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/Doctor/doctorSlice';
import SideBar from '../../components/Doctor/SideBar';
import { doctorProfile, getMyAppointments, getTotalPayments } from '../../Helpers/doctorHelper';
import DoctorMain from '../../components/Doctor/DoctorMain';
import Patients from '../../components/Doctor/Patients';
import Doctor from '../../components/Doctors/Doctor'

const DoctorHome = () => {
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState();
  const [appointmentData,setAppointmentData] = useState([])
  const user = useSelector(selectUser);

  useEffect(() => {
    getMyAppointments(user?._id).then((appointments) => {
      setAppointmentData(appointments?.data)
      setAppointments(appointments?.data?.length)
      console.log(appointmentData, "appointments");
    })
  }, [user]);

  useEffect(() => {
    getTotalPayments(user?._id).then((payment) => {
      setPayment(payment?.data[0]?.total);

    })
  }, [user])
  return (
    // <div className='font-poppins antialiased overflow-x-hidden'>
    //   <div
    //     id="view"
    //     class="h-full w-screen flex flex-row"
    //     x-data="{ sidenav: true }"
    //   >
    //     <SideBar user={user} />
    //     <div>
    //       <DoctorMain appointments={appointments} payment={payment}/>
    //       {/* <Patients appointmentData={appointmentData} /> */}
    //     </div>
    //   </div>

    // </div>
    <Doctor appointments={appointments} payment={payment}/>
  )
}

export default DoctorHome