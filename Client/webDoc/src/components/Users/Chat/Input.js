import React from 'react'
import { FiSend } from 'react-icons/fi';

const Input = () => {
  return (
    <div className="bg-gray-100 fixed bottom-0 w-2/3 pl-4 mb-3 flex flex-row justify-between items-center">
      <input
        className="w-full bg-gray-100 pt-3 mb-3 focus:outline-none font-light"
        placeholder="Write a message"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-full mr-3">
        <FiSend size={24} color="white" />
      </button>
    </div>
  )
}

export default Input