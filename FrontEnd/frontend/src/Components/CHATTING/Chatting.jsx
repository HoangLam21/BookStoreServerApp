import React, { useEffect, useRef, useState, useContext } from 'react';
import ChattingContent from './ChattingContent'
import MessData from '../../Data/messData'
import UserData from '../../Data/userData'
import {MyInfoContext} from '../../Components/context/MyInfoContext'
export default function Chatting() {

  return (
    <div className='h-full w-full overflow-auto'>
      <ChattingContent />
    </div>
  )
}
