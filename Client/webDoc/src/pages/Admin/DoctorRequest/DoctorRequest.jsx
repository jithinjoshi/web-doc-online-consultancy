import React from 'react'
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import ViewDoctorRequest from '../../../components/Admin/ViewDoctorRequest/ViewDoctorRequest'

const DoctorRequest = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ViewDoctorRequest/>
      </div>
    </div>
  )
}

export default DoctorRequest

