

import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import WebSocketChat from './webSocketChat';
import { AuthContext } from '../../context/AuthContext';
import './chat.css'


const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";



export default function ChattingContent({token}) {
    const [messageContent, setMessageContent] = useState([]);
    const { id, username  } = useContext(AuthContext);



   
    
    useEffect(() => {
        const fetchMessage = async () => {
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(MESSAGELOAD_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                console.log(id)
               
                const messages = result.flatMap(messages => messages).filter(message =>
                    (parseInt(message.sender_id) === parseInt(id) && parseInt(message.receiver_id) === 1) ||
                    (parseInt(message.sender_id) === 1 && parseInt(message.receiver_id) === parseInt(id))
                );
                setMessageContent(messages);
              
                console.log("mess", messageContent);

            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };
        fetchMessage();
    }, [token]);


    console.log("messageContent", messageContent);
   
    return (
        <div className="maincontent1 border border-color-main-2 flex h-full w-full  rounded-lg overflow-hidden gap-8">
            
            <div className="h-full flex flex-col overflow-hidden gap-4 w-96">
               
                <div className="maincontent_right chatbox-body w-full h-full  overflow-auto">
                    
                <WebSocketChat  messages={messageContent}/>

                </div> 
            </div>
        </div>
    );
}