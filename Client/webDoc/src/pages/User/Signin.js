import React from 'react'
import NavBar from '../../components/Users/NavBar/NavBar'
import Login from '../../components/Users/Signin'
import Footer from '../../components/Users/Footer'



const Signin = () => {
  return (
    <>
        <NavBar/>
        <div className='mt-5 mb-5 sm:mb-6'>
        <Login/>
        </div>
        
        <Footer/>
    </>
  )
}

export default Signin