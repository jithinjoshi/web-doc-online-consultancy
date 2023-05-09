import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from '../../../Redux/User/userSlice'
import { useSelector } from 'react-redux';
import Doctors from './Doctors';
import { addMessage, getAllAppointmentDoctors, getAllMessages } from '../../../Helpers/userHelper';
import ChatPage from './ChatPage';



const Chats = () => {
    const user = useSelector(selectUser);
    const [doctors, setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [chats, setChats] = useState()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (user) {
            getAllAppointmentDoctors((user._id)).then((doctors) => {
                setDoctors(doctors?.data);

            })
        }
    }, [user])

    useEffect(() => {
        addMessage({
            from: user?._id,
            to: selectedDoctor?.doctorId,
            message: chats
        }).then((response) => {
            return response;
        })
    }, [chats])

    useEffect(() => {
        getAllMessages({ from: user?._id, to: selectedDoctor?.doctorId }).then((response)=>{
            setMessages(response.data)
        })
    }, [selectedDoctor]);




    return (
        <div class="flex h-screen antialiased text-gray-800">
            <div class="flex flex-row h-full w-full overflow-x-hidden">
                <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <div class="flex flex-row items-center justify-center h-12 w-full">
                        <div
                            class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                ></path>
                            </svg>
                        </div>
                        <div class="ml-2 font-bold text-2xl">Chat</div>
                    </div>

                    <Doctors doctors={doctors} setSelectedDoctor={setSelectedDoctor} />
                </div>

                <ChatPage selectedDoctor={selectedDoctor} chats={chats} setChats={setChats} messages={messages} />


            </div>
        </div>
    )
}

export default Chats