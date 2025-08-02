import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const {selectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext()
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId)? 'Online' : 'Offline';
  }
  return (
    <div>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-2 top-2"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
       <div className='h-[11vh] flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300'>
            <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === 'Online' ? "online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h1 className='font-bold text-xl'>{selectedConversation.fullname}</h1>
                <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
            </div>
        </div>
    </div>
  )
}

export default Chatuser
