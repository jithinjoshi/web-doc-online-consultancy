import "./appliedDoctors.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import DoctorRequest from "../../../components/Admin/DoctorRequests/DoctorRequests"
import {doctorRequests} from "../../../Helpers/adminHelper"

import { useEffect, useState } from "react"

const AppliedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    doctorRequests().then((data) => {
        setDoctors(data?.data);
        
    }).catch((err) => {
      return err;
    })
}, []);


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DoctorRequest doctors={doctors} setDoctors={setDoctors}/>
      </div>
    </div>
  )
}

export default AppliedDoctors