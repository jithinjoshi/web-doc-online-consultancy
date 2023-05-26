import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { chatUserData } from '../../../Redux/Doctor/chatSlice';
import { getSingleDoctor } from '../../../Helpers/userHelper';


const Users = ({ data, currentUserId, online }) => {

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userId = data?.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            try {
                const user = await getSingleDoctor(userId);
                
                setUserData(user?.data);
            } catch (error) {
                return error;

            }

        }
        getUserData();
    }, [])

    return (
        <div class="user-list overflow-y-auto sm:h-screen bg-white">
            <div class="flex hover:bg-slate-100 transition px-5 py-3 hover:cursor-pointer">
                <div class="pr-4">
                    <img className='rounded-full w-14 h-14' src={userData?.image ? userData?.image?.secure_url :"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt='profile' width="50" />
                </div>
                <div>
                    <h3 class="text-violet-500 tex-md">{userData?.firstName} {userData?.lastName}</h3>
                    <p class="text-sm text-gray-400 font-light overflow-hidden h-5">{online ?  'online' : 'offline'}</p>
                </div>
            </div>
            <hr/>


        </div>
    )
}

export default Users