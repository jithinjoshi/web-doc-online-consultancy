import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Users/NavBar/NavBar'
import Banner from '../../components/Users/Banner'
import MainDoctors from '../../components/Users/MainDoctors'
import MainDepartments from '../../components/Users/MainDepartments'
import Footer from '../../components/Users/Footer'
import { getAllDepartments, getAllDoctors } from '../../Helpers/userHelper'




const LandingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    //get All doctors

    useEffect(() => {
        getAllDoctors().then((doctors) => {
            setDoctors(doctors)
        }).catch((err) => {
            return err;
        });

        getAllDepartments().then((departments) => {
            setDepartments(departments)
        })

    }, [])

    return (
        <>
            <Navbar />
            <Banner />
            <MainDoctors doctors={doctors.slice(0, 4)} />
            <MainDepartments departments={departments} />
            <Footer />
        </>

    )
}

export default LandingPage