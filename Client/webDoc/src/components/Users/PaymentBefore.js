import React from 'react'
import { Link } from 'react-router-dom'
import { selectUser } from '../../Redux/User/userSlice'
import { useSelector } from 'react-redux';
import PayButton from './PayButton';
import { selectPaymentDetails } from '../../Redux/User/Paymentslice';

const PaymentBefore = ({doctor}) => {
    const user = useSelector(selectUser);
    const payment = useSelector(selectPaymentDetails);
    const paymentItems = {
        name: "Online Doctor consultancy",
        price: doctor?.fees,
        doctor: doctor?.firstName + doctor?.lastName,
        userId: user?._id,
        doctorImage: doctor?.image?.secure_url,
        doctorDepartment: doctor?.department,
        doctorId: doctor?._id,
        date:payment?.date,
        time:payment?.time
    }

    return (
        <>
            <div className='mt-2 sm:mt-3'>
                <div class='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
                    <div class='max-w-md mx-auto'>
                        <div class='p-4 sm:p-6'>
                            <div class='flex flex-row'>
                                <span>Doctor Consultation Fees </span><p class='text-[17px] font-bold text-[#0FB478]'> ₹ {doctor?.fees}</p>
                            </div>
                            {/* <p class='text-[#7C7C80] font-[15px] mt-6'>Appointed Time : <span className='font-bold'>04:00 PM</span></p> */}

                            <Link class='block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-blue-600 rounded-[14px] hover:bg-blue-800 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80 text-white'>
                                <PayButton items={paymentItems}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentBefore