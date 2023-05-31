import React, { useEffect, useState } from 'react'
import { chatUser, getsingleUser } from '../../../Helpers/doctorHelper';
import { useDispatch } from 'react-redux';
import { chatUserData } from '../../../Redux/Doctor/chatSlice';


const Users = ({ data, currentUserId, online }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userId = data?.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            try {
                const user = await getsingleUser(userId);
                setUserData(user?.data);
                dispatch(chatUserData(user?.data))
            } catch (error) {
                return error;

            }

        }
        getUserData();
    }, [])

    return (
        <div class="user-list bg-white">
            <div class="flex hover:bg-slate-100 transition px-5 py-3 hover:cursor-pointer">
                <div class="pr-4">
                    <img src={userData?.image ? userData?.image : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt='profile' width="50" />
                </div>
                <div>
                    <h3 class="text-violet-500 tex-md">{userData?.username}</h3>
                    <p class="text-sm text-gray-400 font-light overflow-hidden h-5">{online ? 'online' : 'offline'}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Users