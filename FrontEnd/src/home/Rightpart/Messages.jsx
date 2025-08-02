import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js'
import Loading from '../../components/Loading.jsx'
import useGetSocketMessage from '../../context/useGetSocketMessage.js';

function Messages() {
  const {loading, messages} = useGetMessage();
  useGetSocketMessage(); 
  
  const [minHeight, setMinHeight] = useState('calc(92vh - 11vh)');
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 1024) {
        setMinHeight('calc(92vh - 13vh)');
      } else {
        setMinHeight('calc(92vh - 11vh)');
      }
    };

    // Update height on initial render and on window resize
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const lastMsgRef = useRef()
  useEffect(() => {
    setTimeout(() =>{
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },100);
  }, [messages])

  return (
    <div className='overflow-y-auto scrollbar-hide' style={{minHeight: minHeight}}>
     {loading ? (
        <Loading/>
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div  key={message._id} ref={lastMsgRef}>
             <Message message={message} />
          </div>
           
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  )
}

export default Messages
