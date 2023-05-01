import React, { useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ChatInput = ({ chats, setChats }) => {
    const [showEmojiPicker, setShowImojiPicker] = useState(false);
    const [msg, setMsg] = useState();

    const handleEmojiPickerHideAndShow = () => {
        setShowImojiPicker(!showEmojiPicker)
    }

    const handleEmojiSelect = (emoji) => {
        let message = msg;
        message = message += emoji.native;
        setMsg(message)
        // Do something with the selected emoji, such as updating state or sending it to a server
    };

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
                        <button
                            class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                            <svg onClick={handleEmojiPickerHideAndShow}
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
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            {showEmojiPicker && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
                        </button>
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