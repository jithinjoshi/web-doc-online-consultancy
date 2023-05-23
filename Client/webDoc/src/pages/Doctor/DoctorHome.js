import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/Doctor/doctorSlice';
import SideBar from '../../components/Doctor/SideBar';
import { doctorProfile, getDoctor, getMonthlyReport, getMyAppointments, getPatients, getTotalPayments, } from '../../Helpers/doctorHelper';
import DoctorMain from '../../components/Doctor/DoctorMain';
import Patients from '../../components/Doctor/Patients';
import Doctor from '../../components/Doctors/Doctor'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const DoctorHome = () => {
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState();
  const [appointmentData,setAppointmentData] = useState([]);
  const [patients,setPatients] = useState([]);
  const user = useSelector(selectUser);
  const [cookies, removeCookie] = useCookies([]);
  const [doctor, setDoctor] = useState("");
  const navigate = useNavigate();

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
  }, [user]);

  useEffect(()=>{
    getPatients(user?._id).then((patient)=>{
      console.log(patient);
      setPatients(patient?.data);
    })
  },[user])

    const [data,setData] = useState();
    useEffect(()=>{
        getMonthlyReport(user?._id).then((data)=>{
            console.log(data);
        })

    },[])

    const Logout = () => {
      removeCookie("token");
      navigate("/doctor/signin");
    };

    useEffect(() => {
      const verifyCookie = async () => {
        console.log(cookies,"LLLL")
        if (typeof cookies.token === 'undefined' || cookies.token === 'undefined') {
          navigate('/doctor/signin');
        
          const doctor = await getDoctor();
          setDoctor(doctor);
        
          if (!doctor) {
            removeCookie("token");
            navigate("/doctor/signin");
          }
        }
      };
    
      verifyCookie();
    }, [cookies, navigate, removeCookie]);


  return (
    <Doctor appointments={appointments} payment={payment} patients={patients} userId={user?._id} Logout={Logout}/>
  )
}

export default DoctorHome