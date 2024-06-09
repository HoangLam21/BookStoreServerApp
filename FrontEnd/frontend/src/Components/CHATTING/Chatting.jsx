import React from 'react'
import ChattingContent from './ChattingContent'
import MessData from '../../Data/messData'
import UserData from '../../Data/userData'

export default function Chatting() {
  return (
    <div className='h-full w-full overflow-auto'>
      <ChattingContent messdata={MessData} user={UserData} />
    </div>
  )
}
