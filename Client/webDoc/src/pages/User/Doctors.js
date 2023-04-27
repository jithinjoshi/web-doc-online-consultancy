import React, { useEffect, useState } from 'react'
import { getAllDoctors } from '../../Helpers/userHelper';
import Banner from '../../components/Users/Banner';
import FindPage from '../../components/Users/FindDoctors/FindPage'
import ListOfDoctors from '../../components/Users/ListOfDoctors';
import Footer from '../../components/Users/Footer';
import NavBar from '../../components/Users/NavBar/NavBar';




const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getAllDoctors().then((doctors) => {
            setDoctors(doctors);
        })
    }, []);


    return (
        <>
            <NavBar/>
            <Banner/>
            <FindPage/>
            <Footer/>


        </>

    )
}

export default Doctors