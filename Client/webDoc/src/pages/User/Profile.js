import React, { useEffect } from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import ProfileName from '../../components/Users/Profile/ProfileName'
import { getUser } from '../../Helpers/userHelper'


const Profile = () => {
  useEffect(()=>{
    getUser().then((user)=>{
      console.log(user,"|||");
    })
  },[])
  return (
    <>
        <NavBar/>
        <ProfileName/>
      
        
    </>
  )
}

export default Profile