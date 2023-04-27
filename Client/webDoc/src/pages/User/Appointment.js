import React from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import DoctorSlotBook from '../../components/Users/DoctorSlotBook'
import BookingUserDetails from '../../components/Users/BookingUserDetails'
import { useParams } from 'react-router-dom'

const Appointment = () => {
  const {id}= useParams();

  return (
    <>
        <NavBar/>
        <DoctorSlotBook doctorId={id}/>
        <BookingUserDetails doctorId={id}/>
    </>
  )
}

export default Appointment