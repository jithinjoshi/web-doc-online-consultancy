import React from 'react'

const SelectedUser = ({userData}) => {
    return (
        <>
        <div class="bg-white user-info-header px-5 py-3">
            <div class="flex justify-between">
                <div class="flex items-center">
                    <img className='rounded-full w-14 h-14' src={userData?.image ? userData.image?.secure_url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} width="40" alt='selected user' />
                    <h3 class="text-gray-400 tex-md pl-4">{userData?.firstName} {userData?.lastName}</h3>
                </div>
                <div>
                    <i class="fa fa-message text-violet-300"></i>

                    <i class="fa fa-video text-gray-200 ml-3"></i>

                    <i class="fa fa-phone text-gray-200 ml-3"></i>
                </div>
            </div>
           
        </div>
        <hr style={{width:'85%', border:'0.1px solid #ececec'}}/>
        </>
    )
}

export default SelectedUser