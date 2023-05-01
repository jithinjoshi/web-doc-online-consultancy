import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Doctor/doctorSlice';
import { chatUser } from '../../../Helpers/doctorHelper';
import { Link } from 'react-router-dom';


const Users = ({users,setSelectedUser}) => {
    

    return (
        <div className="border-r border-gray-300 lg:col-span-1">
            

            <ul className="overflow-auto h-[32rem]">
                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                {
                    users.map((user) => {
                        return (
                            <li onClick={()=>setSelectedUser({username:user?.userId?.username,userId:user?.userId?._id})}>
                                <Link
                                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                                    <img className="object-cover w-10 h-10 rounded-full"
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="username" />
                                    <div className="w-full pb-2">
                                        <div className="flex justify-between">
                                            <span className="block ml-2 font-semibold text-gray-600">{user?.userId?.username}</span>
                                        </div>
                                    </div>
                                </Link>

                            </li>

                        )
                    })
                }

            </ul>
        </div>
    )
}

export default Users