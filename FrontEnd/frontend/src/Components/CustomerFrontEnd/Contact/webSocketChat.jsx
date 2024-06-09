

import React, { useEffect, useRef, useState,useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { AuthContext } from '../../context/AuthContext';
import {CusUserContext} from '../../context/CusUserContext'


const WebSocketChat = ({ senderId, receiverId, senderName, senderAvatar }) => {
    const stompClientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const username = "camlansuc"; 
    const { token, id, login, logout } = useContext(AuthContext);
    const { login2, logout2} = useContext(CusUserContext)



    useEffect(() => {
        const connect = () => {
            const socket = new SockJS('http://167.172.69.8:8010/BookStore/ws');
            stompClientRef.current = Stomp.over(socket);

            stompClientRef.current.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                setConnected(true);

                stompClientRef.current.subscribe('/topic/public', (message) => {
                    showMessage(JSON.parse(message.body));
                });

                stompClientRef.current.subscribe('/queue/' + username, (message) => {
                    showMessage(JSON.parse(message.body));
                });

            }, (error) => {
                console.error('Error: ' + error);
                setConnected(false);
                setTimeout(connect, 10000);
            });

        };

        connect();
    }, []);

    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (messageContent && stompClientRef.current && connected) {
            const messageRequest = {
                sender_id: id,
                sender_name: senderName,
                sender_avatar: senderAvatar,
                receiver_id: 1,
                message_content: messageContent,
                createAt: new Date().toISOString()
            };
            stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(messageRequest));
            setMessageContent("");
            showMessage(messageRequest);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div id="messages" className="flex flex-col flex-1 overflow-auto p-2">
                {messages.map((message, index) => (
                    <div key={index} className={`flex gap-4 mb-8 ${message.sender_id === senderId ? 'justify-end' : 'justify-start'}`}>
                        <img className="w-8 h-8 rounded-full" src={message.sender_avatar} alt="Sender Avatar" />
                        <div className="mess-content bg-border--color text-primary--color rounded-l-xl rounded-b-xl p-2 flex flex-col gap-1 w-fit">
                            <div className="sender-info text-sm font-semibold">{message.sender_name}</div>
                            <p className="rounded-b-3xl p-2 pl-3">{message.message_content}</p>
                            <span className="msg_time text-xs text-header--lightcolor pl-1">{new Date(message.createAt).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div id="chat" className="flex items-center gap-4 p-4 pb-0 border-t border-color-main-2">
                <input 
                    type="text" 
                    id="message" 
                    value={messageContent}
                    placeholder="Type your message here..." 
                    className="flex-1 px-4 py-2 border font-garamond border-color-main-2 rounded-l-lg" 
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} disabled={!connected} className="px-4 py-2 bg-color-main-2 text-white font-garamond font-semibold rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketChat;
