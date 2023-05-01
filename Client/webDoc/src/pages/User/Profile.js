import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import ProfileName from '../../components/Users/Profile/ProfileName'
import { getUser, getUserData } from '../../Helpers/userHelper'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/User/userSlice'


const Profile = () => {
  const userDetails = useSelector(selectUser);
  const [user,setUser] = useState([])
  useEffect(()=>{
    if(userDetails){
      getUserData(userDetails?._id).then((user)=>{
        setUser(user?.data)
      })
    }
    
    
  },[userDetails])

  

  return (
    <>
        <NavBar/>
        <ProfileName user={user}/>
      
        
    </>
  )
}

export default Profile