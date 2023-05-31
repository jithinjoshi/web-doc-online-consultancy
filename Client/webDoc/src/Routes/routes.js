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
import BookDoctor from "../pages/User/BookDoctor";
import CheckoutSuccess from "../pages/User/CheckoutSuccess";
import CheckoutFailure from "../pages/User/CheckoutFailure";
import OtpLogin from "../components/Users/OtpLogin/OtpLogin";
import PhoneNumber from "../components/Users/PhoneNumber/PhoneNumber";
import EmailVerification from "../pages/User/EmailVerification";
import ResetPassword from "../pages/User/ResetPassword";
import UpdateDoctor from "../pages/Admin/UpdateDoctor/UpdateDoctor";
import Appointment from "../pages/User/Appointment";
import PayBefore from "../pages/User/PayBefore";
import Profile from "../pages/User/Profile";

import ErrorPage from '../components/ErrorPage'
import ApplyForDoctor from "../pages/User/ApplyForDoctor";
import Appointments from "../pages/User/Appointments";
import DoctorChat from "../pages/Doctor/DoctorChat";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import Chats from "../pages/User/userChat";
import Video from "../pages/User/VideoChat/Video";
import CreateRoom from "../components/Doctors/VideoChat/CreateRoom";
import DocEdit from "../pages/Doctor/DocEdit";
import Notifications from "../pages/Admin/Notifications/Notifications";
import DoctorRequest from "../pages/Admin/DoctorRequest/DoctorRequest";
import ApplyDoctor from "../pages/Doctor/ApplyDoctor";
import DoctorSignup from "../pages/Doctor/DoctorSignup";
import AppliedDoctors from "../pages/Admin/AppliedDoctors/AppliedDoctors";

import Transactions from "../pages/Admin/Transactions/Transactions";
import SalesReport from "../pages/Doctor/SalesReport";
import PatientsOfDoctor from "../pages/Doctor/Patients"
import Prescription from "../pages/Doctor/Prescription";
import ListOfPrescriptions from "../pages/Doctor/ListOfPrescriptions";
import UpdatePrescription from "../pages/Doctor/UpdatePrescription";
import ConsultedDoctors from "../pages/User/AppointedDoctors";
import PrescriptionDetails from "../pages/User/Prescription"
import SelectSchedule from "../components/Doctors/SelectShedule";
import DocScheduleTime from "../pages/Doctor/DocScheduleTime";





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
    {
        path:'/admin/notifications',
        element:<Notifications/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-request/:id',
        element:<DoctorRequest/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-requests',
        element:<AppliedDoctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/transactions',
        element:<Transactions/>,
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
        path:'/prescriptions/:doctorId',
        element:<PrescriptionDetails/>
    },
    {
        path:'/apply-doctor',
        element:<ApplyForDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointments',
        element:<Appointments/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/chats',
        element:<Chats/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointed-doctors',
        element:<ConsultedDoctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/room/:userId',
        element:<Video/>
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
        path:'/doctor/chat',
        element:<DoctorChat/>
    },
    {
        path:'/doctor/appointments',
        element:<DoctorAppointments/>
    },
    {
        path:'/doctor/create-room/:userId',
        element:<CreateRoom/>
    },
    {
        path:'/doctor/editProfile',
        element:<DocEdit/>
    },
    {
        path:'/doctor/apply-doctor',
        element:<ApplyDoctor/>,
    },
    {
        path:'/doctor/signup/:id',
        element:<DoctorSignup/>
    },
    {
        path:'/doctor/salesreport',
        element:<SalesReport/>
    },
    {
        path:'/doctor/patients',
        element:<PatientsOfDoctor/>
    },
    {
        path:'/doctor/prescription/:userId',
        element:<Prescription/>
    },
    {
        path:'/doctor/prescriptionList/:userId',
        element:<ListOfPrescriptions/>
    },
    {
        path:'/doctor/updatePrescription/:prescriptionId',
        element:<UpdatePrescription/>
    },
    {
        path:'/doctor/select-schedule',
        element:<DocScheduleTime/>
    }
    
])