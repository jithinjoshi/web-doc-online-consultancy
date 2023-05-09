import React, { useState } from 'react'


const ChatInput = ({ chats, setChats }) => {
    const [msg, setMsg] = useState();


    const submitHandler = ((e) => {
        e.preventDefault();
        setChats(msg)
        setMsg("");

    })
    return (
        <form onSubmit={submitHandler}>
            <div
                class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >


                <div class="flex-grow ml-4">
                    <div class="relative w-full">
                        <input
                            type="text"
                            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            onChange={(e) => setMsg(e.target.value)} value={msg}
                        />
                    </div>
                </div>
                <div class="ml-4">
                    <button type='submit'
                        class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span>Send</span>
                        <span class="ml-2">
                            <svg
                                class="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </form>
    )
}

export default ChatInput