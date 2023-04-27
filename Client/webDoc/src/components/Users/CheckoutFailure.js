import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutFailure = () => {
  return (
    <div class="h-screen flex  justify-center">
            <div class="bg-white p-6 mt-9  md:mx-auto">
                <svg viewBox="0 0 24 24" class="text-red-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.482,16.518a1,1,0,0,1-1.414,0L12,13.414l-5.068,5.068a1,1,0,0,1-1.414,0l-.708-.708a1,1,0,0,1,0-1.414L10.586,12,5.518,6.932a1,1,0,0,1,1.414-1.414L12,10.586l5.068-5.068a1,1,0,0,1,1.414,1.414L13.414,12Z" />
                </svg>
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!!</h3>
                    <p class="text-gray-600 my-2">Your Payment was failed due some issues</p>
                    <p> please Try again!!  </p>
                    <div class="py-10 text-center">
                        <Link to='/doctors' class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CheckoutFailure