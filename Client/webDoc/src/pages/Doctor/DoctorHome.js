import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../Redux/Doctor/doctorSlice';
import {getDoctor, getMonthlyReport, getMyAppointments, getPatients, getTotalPayments, } from '../../Helpers/doctorHelper';
import Doctor from '../../components/Doctors/Doctor'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { remove } from 'react-cookie';

const DoctorHome = () => {
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState();
  const [appointmentData,setAppointmentData] = useState([]);
  const [patients,setPatients] = useState([]);
  const user = useSelector(selectUser);
  const [cookies, removeCookie] = useCookies([]);
  const [doctor, setDoctor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyAppointments().then((appointments) => {
      setAppointmentData(appointments?.data)
      setAppointments(appointments?.data?.appointments?.length)
    })
  }, [user]);

  useEffect(() => {
    getTotalPayments(user?._id).then((payment) => {
      setPayment(payment?.data[0]?.total);

    })
  }, [user]);

  useEffect(()=>{
    getPatients(user?._id).then((patient)=>{
      setPatients(patient?.data);
    })
  },[user])

    const [data,setData] = useState();
    useEffect(()=>{
        getMonthlyReport(user?._id).then((data)=>{
        })

    },[])

    const Logout = () => {
      removeCookie("token"); // Remove the "token" cookie using removeCookie
      dispatch(logout());
      navigate("/doctor/signin");
    };

    useEffect(() => {
      const verifyCookie = async () => {
        const token = cookies.token;
    
        if (!token || token === 'undefined') {
          dispatch(logout()); // Clear the Redux store
          navigate('/doctor/signin');
        } else {
          const doctor = await getDoctor();
          setDoctor(doctor);
    
          if (!doctor) {
            remove("token"); // Remove the "token" cookie
            dispatch(logout()); // Clear the Redux store
            navigate("/doctor/signin");
          }
        }
      };
    
      verifyCookie();
    }, [cookies, navigate, dispatch]);
    


  return (
    <Doctor appointments={appointments} payment={payment} patients={patients} userId={user?._id} Logout={Logout}/>
  )
}

export default DoctorHome