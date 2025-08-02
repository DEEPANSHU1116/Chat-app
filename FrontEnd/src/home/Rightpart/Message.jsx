import React from 'react'

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user.id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createAt = new Date(message.createdAt);
  const formattedTime = createAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();
  return (
    <div>
      <div className='p-4'>
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className='chat-footer'>{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
