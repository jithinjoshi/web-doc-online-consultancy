import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Welcome from './Welcome'
import ChatInput from './ChatInput'
import { getAllMessages } from '../../../Helpers/doctorHelper'

const Chats = ({ selectedUser, chats, setChats, setSent, messages,scrollRef,uuidv4 }) => {



    return (
        selectedUser.username ?
            <div className="hidden lg:col-span-2 lg:block">
                <div div className="w-full" >
                    <ChatHeader selectedUser={selectedUser} />
                    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                        <ul className="space-y-2">
                            {
                                messages.map((message) => {
                                    return (
                                        <li className="flex justify-start">
                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow" ref={scrollRef} key={uuidv4()}>
                                                <span className="block">{message.fromSelf ? "You: " : ""}{message.message}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                            {/* <li className="flex justify-end">
                                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                    <span className="block">Hiiii</span>
                                </div>
                            </li>
                            <li className="flex justify-end">
                                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                    <span className="block">how are you?</span>
                                </div>
                            </li>
                            <li className="flex justify-start">
                                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                    <span className="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    </span>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    <ChatInput chats={chats} setChats={setChats} setSent={setSent} />
                </div >
            </div >
            :
            <Welcome />


    )
}

export default Chats