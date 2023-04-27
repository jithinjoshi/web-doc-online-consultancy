import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Admin/login/Login";
import Home from "../pages/Admin/home/Home";
import Single from "../pages/Admin/single/Single";
import Doctors from "../pages/Admin/doctors/Doctors";
import AddDoctor from '../pages/Admin/addDoctors/AddDoctor'
import Departments from "../pages/Admin/Departments/Departments";
import Patients from "../pages/Admin/Patients/Patients";
import LandingPage from "../pages/User/LandingPage";
import Signup from "../pages/User/Signup";
import Signin from "../pages/User/Signin";
import ListOfDoctors from '../pages/User/Doctors'
import DoctorSignin from "../pages/Doctor/DoctorSignin";
import DoctorsProfile from "../pages/Doctor/DoctorProfile";
import DoctorsEdit from "../pages/Doctor/DoctorsEdit";
import DoctorHome from "../pages/Doctor/DoctorHome";
import Doctorschedule from "../pages/Doctor/Doctorschedule";
import BookDoctor from "../pages/User/BookDoctor";
import CheckoutSuccess from "../pages/User/CheckoutSuccess";
import CheckoutFailure from "../pages/User/CheckoutFailure";
import OtpLogin from "../components/User/OtpLogin/OtpLogin";
import PhoneNumber from "../components/User/PhoneNumber/PhoneNumber";
import EmailVerification from "../pages/User/EmailVerification";
import ResetPassword from "../pages/User/ResetPassword";
import UpdateDoctor from "../pages/Admin/UpdateDoctor/UpdateDoctor";
import Appointment from "../pages/User/Appointment";
import PayBefore from "../pages/User/PayBefore";
import Profile from "../pages/User/Profile";

import ErrorPage from '../components/ErrorPage'
import ApplyForDoctor from "../pages/User/ApplyForDoctor";



// import BookDoctor from "../pages/User/BookDoctor";


export const router = createBrowserRouter([
    {
        path:'/admin',
        element:<Home/>,
        
    },
    {
        path:'/admin/login',
        element:<Login/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users',
        element:<Patients/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users/:userId',
        element:<Single/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctors',
        element:<Doctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/addDoctor',
        element:<AddDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/departments',
        element:<Departments/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/update-doctor/:id',
        element:<UpdateDoctor/>,
        errorElement:<ErrorPage/>
    },
    //user
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/signup',
        element:<Signup/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/signin',
        element:<Signin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/otp',
        element:<OtpLogin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/doctors',
        element:<ListOfDoctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointment/:id',
        element:<BookDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/confirm-appointment/:id',
        element:<Appointment/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/pay/:id',
        element:<PayBefore/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/checkout-success',
        element:<CheckoutSuccess/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/checkout-failure',
        element:<CheckoutFailure/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/phone',
        element:<PhoneNumber/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/forgot-password',
        element:<EmailVerification/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/reset-password/:userId/:token',
        element:<ResetPassword/>,
        errorElement:<ErrorPage/>

    },
    {
        path:'/profile',
        element:<Profile/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/apply-doctor',
        element:<ApplyForDoctor/>,
        errorElement:<ErrorPage/>
    },

    //doctors
    {
        path:'/doctor/signin',
        element:<DoctorSignin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/doctor/',
        element:<DoctorHome/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/doctor/profile/:id",
        element:<DoctorsProfile/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/doctor/edit/:id",
        element:<DoctorsEdit/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/doctor/schedule/:id",
        element:<Doctorschedule/>,
        errorElement:<ErrorPage/>
    }
    
])