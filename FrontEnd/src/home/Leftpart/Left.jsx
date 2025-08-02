import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

function Left() {
  return (
       <div className='w-full h-screen bg-black text-gray-300'>
        <Search/>
        <div className="overflow-y-auto scrollbar-hide" style={{minHeight:'calc(84vh - 13vh)'}}>
      <Users/>
      </div>
        <Logout/>
       </div>   
  )
}

export default Left
