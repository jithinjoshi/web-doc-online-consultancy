import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import DoctorSlotBook from '../../components/Users/DoctorSlotBook'
import Pay from '../../components/Users/PaymentBefore'
import { useParams } from 'react-router-dom'
import { getSingleDoctor } from '../../Helpers/userHelper'
import { useSelector } from 'react-redux'


const PayBefore = () => {
  const { id } = useParams();
  const [doctor,setDoctor] = useState([]);
  useEffect(() => {
    getSingleDoctor(id).then((doctor) => {
      setDoctor(doctor?.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <DoctorSlotBook doctorId={id} />
      <Pay doctor={doctor}/>
    </>
  )
}

export default PayBefore