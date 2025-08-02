import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

function Typesend() {
  const [message,setMessage] = useState("");
  const {loading,sendMessages} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };
  return (
   <form onSubmit={handleSubmit}>
     <div className='flex space-x-1 md:h-[8vh] h-[10vh] bg-gray-800'>
        <div className='w-[70%] mx-4 items-center flex justify-center'>
            <input type="text" 
            placeholder="Type here" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 bg-gray-900 rounded-xl outline-none px-4 py-2 w-full" />
        </div>
        <button>
            <IoSend className='text-3xl hover:text-blue-500'/>
        </button>
    </div>
   </form>
  )
}

export default Typesend
