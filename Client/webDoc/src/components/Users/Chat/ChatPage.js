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
                                        {/* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>I'm ok what about you?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>Lorem ipsum dolor sit amet !</div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                    <div
                                                        class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                    >
                                                        Seen
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Perspiciatis, in.
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div class="flex flex-row items-center">
                                                        <button
                                                            class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                                                        >
                                                            <svg
                                                                class="w-6 h-6 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                ></path>
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                        <div class="flex flex-row items-center space-x-px ml-4">
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-12 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-6 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-5 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-3 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <ChatInput chats={chats} setChats={setChats} />
                        </div>
                    </div>
                    :
                    <div>welocme</div>
            }
        </>

    )
}

export default ChatPage