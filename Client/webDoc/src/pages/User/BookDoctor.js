import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import { getSingleDoctor } from '../../Helpers/userHelper'
import DoctorSlotBook from '../../components/Users/DoctorSlotBook'
import Schedule from '../../components/Users/Schedule'
import TimeSlot from '../../components/Users/TimeSlot'
import Footer from '../../components/Users/Footer'

const BookDoctor = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState([]);
    useEffect(() => {
        getSingleDoctor(id).then((doctor) => {
            setDoctor(doctor?.data)
        }).catch((err) => {
            return err;
        })
    }, []);

    return (
        <>
            <NavBar />
            <DoctorSlotBook doctorId={id}/>
            <TimeSlot doctor={doctor} id={id}/>
            <Footer/>
        </>
    )
}

export default BookDoctor