import React from 'react'
import { selectUser } from '../../Redux/Doctor/doctorSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkConversationExistance, createConversation, getMyAppointments } from '../../Helpers/doctorHelper';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Appointments = () => {
    const user = useSelector(selectUser);
    const [myAppointments, setMyAppointments] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (user?._id) {
            getMyAppointments(user?._id).then((user) => {
                setMyAppointments(user?.data)

            })
        }

    }, [user])

    const createChatHandler = async (userId)=>{
        const credentials = {
            senderId:userId,
            recieverId: user?._id
        }

       const isExist = await checkConversationExistance(credentials);
        
       if(isExist?.data?.success){
        const create = await createConversation(credentials);

       }
       navigate('/doctor/chat');


    }

    //get current time
    const now = Date.now(); // Current timestamp
const momentObj = moment(now); // Create a Moment object
const formattedTime = momentObj.format('h:mm a'); // Format the time as "10:30 am"
console.log(formattedTime);


    return (
        <>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            NO:
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Username
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Mobile
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Date
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myAppointments.map((appointments, index) => {
                                            return (
                                                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {appointments?.userId?.username}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {appointments?.userId?.email}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {appointments?.userId?.mobile}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {appointments?.date.split('T')[0]}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {appointments?.time}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <button onClick={()=>createChatHandler(appointments?.userId?._id)} className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                            Chat
                                                        </button>
                                                        <Link to={`/room/${appointments?.userId?._id}`} className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ms-4'>
                                                            create room
                                                        </Link>
                                                    </td>
                                                    
                                                    
                                                </tr>

                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointments