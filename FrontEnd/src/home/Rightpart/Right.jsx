import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation.js'
import NoChatSelected from './NoChatSelected'

function Right() {
  const {selectedConversation,setSelectedConversation} = useConversation()
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation]);
  return (
  <div className='w-full h-screen bg-slate-900 text-gray-300'>
   <div>
    {!selectedConversation?(<NoChatSelected/>):(
      <>
       <Chatuser/>
       <div className="overflow-y-auto scrollbar-hide" style={{maxHeight:'calc(92vh - 9vh)'}}>
       <Messages/>
       </div>
       <Typesend/>
      </>
    )}
    </div>
   </div>
  )
}

export default Right

