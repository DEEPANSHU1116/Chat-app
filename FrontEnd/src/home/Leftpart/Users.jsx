import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/useGetAllUsers';

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  return (
    <div>
      <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Messages</h1>
      <div className='overflow-y-auto scrollbar-hide py-2' style={{maxHeight:"calc(84vh - 10vh)"}}>
        {allUsers.map((user,index)=>(
          <User key={index} user={user} />
        ))}
      </div> 
    </div>
  )
}

export default Users
