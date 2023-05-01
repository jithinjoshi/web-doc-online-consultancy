import React from 'react'
import Form from './Form'

const ProfileName = ({user}) => {
    return (
        <>
            <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6 flex flex-col md:flex-row">
                <div class="w-full h-full rounded border border-1 shadow border-gray-300 flex items-center ps-10">
                    <div className='relative'>
                        <img class="mb-3 w-32 h-32 rounded-full shadow-lg flex justify-start md:justify-center m-3 order-2 md:order-none md:ml-4" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="product designer" />
                        <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>

                    <h1 class="text-small font-medium flex sm:text-4xl sm:ms-9">{user?.username}</h1>
                </div>
            </div>


            <h1 className='text-center text-2xl font-bold underline'>Personal Information</h1>
            <Form user={user}/>
        </>
    )
}

export default ProfileName