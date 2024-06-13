

import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import WebSocketChat from './webSocketChatBook';
import { AuthContext } from '../../context/AuthContext';
import './chat.css'


const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";



export default function ChatBook({autoMessage}) {
    
   
    return (
        <div className="maincontent1 border border-color-main-2 flex h-full w-full  rounded-lg overflow-hidden gap-8">
            
            <div className="h-full flex flex-col overflow-hidden gap-4 w-96">
               
                <div className="maincontent_right chatbox-body w-full h-full  overflow-auto">
                    
                <WebSocketChat autoMessage={autoMessage}/>

                </div> 
            </div>
        </div>
    );
}