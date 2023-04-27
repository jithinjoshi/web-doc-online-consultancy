import React, { useState } from 'react'
import Side from './Side';
import Profile from '../Profile/ProfileName'

const SideBar = () => {
    return (

        <div class="w-full h-full">
            <dh-component>
                <div class="flex flex-no-wrap">
                    <Side />
                    <Profile/>
                </div>


            </dh-component>
        </div>
    )
}

export default SideBar