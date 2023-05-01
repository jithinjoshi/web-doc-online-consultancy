import React from 'react'

const ChatHeader = ({selectedUser}) => {
    console.log(selectedUser,"????");
    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="username" />
            <span className="block ml-2 font-bold text-gray-600">{selectedUser.username}</span>
        </div>
    )
}

export default ChatHeader