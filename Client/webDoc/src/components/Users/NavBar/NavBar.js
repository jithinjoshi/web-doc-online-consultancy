import React, { useEffect, useState } from 'react'
import './NavBar.css'
import $ from 'jquery';
import { Link } from 'react-router-dom'
import { logout, selectUser } from '../../../Redux/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import MenuIcon from '@mui/icons-material/Menu';
import { getUser, refreshToken } from '../../../Helpers/userHelper';

const NavBar = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  $(document).ready(function () {
    $(".nav-toggler").each(function (_, navToggler) {
      var target = $(navToggler).data("target");
      $(navToggler).off("click").on("click", function (e) {
        e.stopPropagation(); // stop event from bubbling up and closing the menu
        $(target).slideToggle(); // toggle the visibility of the target element
      });
      $(target).off("click").on("click", function (e) {
        e.stopPropagation(); // stop event from bubbling up and closing the menu
      });
      $(document).off("click").on("click", function () {
        $(target).slideUp(); // hide the target element when clicking outside of it
      });
    });
  });


  const handleLogout = () => {
    console.log('Logging out...');
  };



  return (
    <>
      <nav className="flex items-center bg-white p-3 flex-wrap border">
        <Link to="/" className="p-2 mr-4 inline-flex items-center">
          <span className="text-xl text-blue-500 font-bold uppercase tracking-wide">WebDoc</span>
        </Link>
        <button
          className="text-black inline-flex p-3 hover:bg-blue-500 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
          data-target="#navigation"
        >
          <MenuIcon />
        </button>
        <div
          className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
          id="navigation"
        >
          <div
            className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
          >
            <Link
              to='/'

              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white"
            >
              <span>Home</span>
            </Link>
            <Link
              to='/doctors'
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white"
            >
              <span>Our Doctors</span>
            </Link>

            {user && (
              <Link to="/profile" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white">Profile</Link>
              
            )}
            {user ? (
              <div onClick={handleLogout}>
                <button className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white'>Logout</button>
              </div>

            ) : (
              <>
                <Link to='/signup' className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white">sign up</Link>
                <Link to='/signin' className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center hover:bg-blue-500 hover:text-white">sign in</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar