import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/User/userSlice'
import { Link } from 'react-router-dom'

const BookingUserDetails = ({doctorId}) => {
    const user = useSelector(selectUser)
    const [forMe,setForMe] = useState(true);
    const [fullName,setFullName] = useState();
    const [email,setEmail] = useState();
    const [symptom,setSymptom] = useState();
    const [about,setAbout] = useState();

    const [othersFullName,setOthersFullName] = useState("");
    const [othersEmail,setOthersEmail] = useState();
    return (
        <>
            <div class="flex items-center justify-center p-12">
            
                <div class="mx-auto w-full max-w-[550px]">
                    <form method="POST">
                    <h1 className='mb-3 text-2xl font-bold'>Patient Details</h1>

                        <div class="mb-5">
                            <label
                                for="name"
                                class="mb-3 block text-base font-normal text-[#07074D]"
                            >
                                This in-clinic appointment is for:
                            </label>

                            <div class="flex items-center pl-4 border border-gray-200 rounded">
                                <input checked id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" onClick={()=>setForMe(true)}/>
                                    <label for="bordered-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">{user?.username}</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded">
                                <input id="bordered-radio-2" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" onClick={()=>setForMe(false)}/>
                                    <label for="bordered-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">Someone Else</label>
                            </div>

                        </div>

                        <div class="mb-5">
                            <label
                                for="name"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                value={forMe ?  user?.username: othersFullName}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="email"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                value={forMe ?  user?.email: othersFullName}
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="subject"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Symptoms
                            </label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="Enter your symptom"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div class="mb-5">
                            <label
                                for="message"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                About your desease
                            </label>
                            <textarea
                                rows="4"
                                name="message"
                                id="message"
                                placeholder="Type your message"
                                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            ></textarea>
                        </div>
                        <div>
                            <Link to={`/pay/${doctorId}`}
                                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                            >
                                Submit
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BookingUserDetails