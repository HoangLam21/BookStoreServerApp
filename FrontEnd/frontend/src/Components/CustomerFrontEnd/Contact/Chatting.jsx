import React from 'react'
import ChattingContent from './contact'
import UserData from './userData'

export default function Chatting() {
  return (
    <div className='h-full w-full overflow-auto'>
      <ChattingContent  user={UserData} />
    </div>
  )
}