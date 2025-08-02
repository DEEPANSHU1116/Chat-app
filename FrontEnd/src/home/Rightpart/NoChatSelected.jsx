import React from 'react'
import { useAuth } from '../../context/Authprovider.jsx'
import { CiMenuFries } from "react-icons/ci";

function NoChatSelected() {
    const [authUser] = useAuth()
  return (
  <>
  <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-2 top-2"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
  <div className='flex h-screen items-center justify-center'> 
    <h1 className='text-center text-gray-300'>
        Welcome <span className='font-semibold text-xl text-white'>{authUser.user.fullname}</span>
        <br />
        No Chat Selected, please start conversation by selecting anyone to your contacts.
    </h1>
  </div>
  </div>
  </>
  )
}

export default NoChatSelected
