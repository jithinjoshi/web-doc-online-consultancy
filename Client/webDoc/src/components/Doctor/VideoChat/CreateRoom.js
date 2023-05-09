// import React from 'react'
// import { Toaster } from 'react-hot-toast'

// const CreateRoom = () => {
//   return (
//     <>
//         <div className='ph '>
//             <div class="flex w-full max-w-md flex-col space-y-8 sm:w-full ">
//                 <div class="flex flex-col items-center justify-center text-center space-y-2">
//                 <Toaster position='top-center' reverseOrder={false}/>
//                     <div class="font-semibold text-3xl">
//                         <p>webDoc</p>
//                     </div>
//                     <div class="flex flex-row text-sm font-medium text-gray-400">
//                         <p>Enter Your Mobile Number</p>
//                     </div>
//                 </div>

//                 <div>
//                     <div class="flex flex-col space-y-8 ">
            
//                         <div class="flex flex-col space-y-5">
//                             <div id='recaptcha-container'></div>
//                             <div>
//                                 <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
//                                     Send OTP
//                                 </button>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default CreateRoom


import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CreateRoom = () => {
    const {userId} = useParams(); 
    const navigate = useNavigate();
    function generateRandomString() {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const groups = [
          { length: 3, delimiter: '-' },
          { length: 4, delimiter: '' },
          { length: 3, delimiter: '-' },
        ];
        
        let result = '';
        for (const group of groups) {
          for (let i = 0; i < group.length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
          }
          result += group.delimiter;
        }

        navigate(`/room/${result}/${userId}`);
        
        
      }

  return (
    <button onClick={generateRandomString}>CreateRoom</button>
  )
}

export default CreateRoom