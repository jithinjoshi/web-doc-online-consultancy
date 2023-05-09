import React from 'react'
import SingleDoctor from './SingleDoctor'
import ChatInput from './ChatInput'

const ChatPage = ({ selectedDoctor, chats, setChats, messages }) => {
    return (
        <>
            {
                selectedDoctor?.doctorId ?
                    <div class="flex flex-col flex-auto h-full p-6">
                        <SingleDoctor selectedDoctor={selectedDoctor} />
                        <div
                            class="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4"
                        >
                            <div class="flex flex-col h-full overflow-x-auto mb-4">
                                <div class="flex flex-col h-full">
                                    <div class="grid grid-cols-12 gap-y-2">
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            {
                                                messages.map((message) => {
                                                    return (
                                                        <div class="flex flex-row items-center">
                                                            {/* <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div> */}
                                                            <div
                                                                class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                            >
                                                                <li className="flex justify-start">
                                                                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                                        <span className="block">{message.fromSelf ? "You: " : ""}{message.message}</span>
                                                                    </div>
                                                                </li>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <ChatInput chats={chats} setChats={setChats} />`
                        </div>
                    </div>
                    :
                    <div>welocme</div>
            }
        </>

    )
}

export default ChatPage