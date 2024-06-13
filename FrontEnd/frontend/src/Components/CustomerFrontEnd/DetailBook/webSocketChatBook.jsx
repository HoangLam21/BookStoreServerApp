import React, { useEffect, useRef, useState, useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { AuthContext } from '../../context/AuthContext';
import { CusUserContext } from "../../context/CusUserContext";
import logo from "../../Assets/Beige And Blue Minimal Modern Book Store Logo (1).png";

const WebSocketChat = ({ autoMessage }) => {
    const stompClientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const { id, username } = useContext(AuthContext);
    const { fullname, avatar } = useContext(CusUserContext);

    useEffect(() => {
        const connect = () => {
            const socket = new SockJS('http://167.172.69.8:8010/BookStore/ws');
            stompClientRef.current = Stomp.over(socket);

            stompClientRef.current.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                
                setTimeout(()=>{

                    stompClientRef.current.subscribe('/topic/public', (message) => {
                        showMessage(JSON.parse(message.body));
                    });

                },1000)

                setTimeout(()=>{

                    stompClientRef.current.subscribe('/queue/' + username, (message) => {
                        showMessage(JSON.parse(message.body));
                    });

                },1000)
               

                setConnected(true);
                

                // Send auto message if provided
                if (autoMessage) {
                    const messageRequest = {
                        sender_id: id,
                        sender_name: fullname,
                        receiver_id: 1,
                        message_content: autoMessage,
                        createAt: new Date().toISOString()
                    };
                    stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(messageRequest));
                    showMessage(messageRequest);
                }
            }, (error) => {
                console.error('Error: ' + error);
                setConnected(false);
                setTimeout(connect, 10000); // Reconnect after a delay
            });
        };

        connect();
    }, [autoMessage, id, username, fullname]);

    

    const showMessage = (message) => {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        const isOwnMessage = parseInt(message.sender_id) === parseInt(id);
        const messageAlignment = isOwnMessage ? 'justify-end' : 'justify-start';
        const contentAlignment = isOwnMessage ? 'bg-color-main' : 'bg-gray-100';

        messageElement.classList.add('flex', 'gap-4', 'mb-8', messageAlignment);

        const avatarElement = document.createElement('img');
        avatarElement.classList.add('w-8', 'h-8', 'rounded-full');
        avatarElement.src = isOwnMessage ? `data:image/png;base64,${avatar}` : logo;
        avatarElement.alt = 'Sender Avatar';

        const contentElement = document.createElement('div');
        contentElement.classList.add('mess-content', 'p-2', 'rounded-lg', 'flex', 'flex-col', 'gap-1', 'w-fit', 'max-w-xs', contentAlignment);

        contentElement.style.backgroundColor = isOwnMessage ? 'color-main' : '#EEECE9';

        const senderInfo = document.createElement('div');
        senderInfo.classList.add('sender-info', 'text-sm', 'font-semibold');
        senderInfo.style.textAlign = isOwnMessage ? 'end' : 'start';

        const senderName = document.createElement('span');
        senderName.textContent = message.sender_name;
        senderName.style.color = isOwnMessage ? 'white' : 'color-main';
        senderInfo.appendChild(senderName);

        const messageContent = document.createElement('p');
        messageContent.classList.add('rounded-b-3xl', 'p-2', 'pl-3');
        messageContent.textContent = message.message_content;
        messageContent.style.color = isOwnMessage ? 'white' : 'color-main';

        contentElement.appendChild(senderInfo);
        contentElement.appendChild(messageContent);

        const timeElement = document.createElement('span');
        timeElement.classList.add('msg_time', 'text-xs', 'pl-1');
        timeElement.textContent = new Date(message.createAt).toLocaleTimeString();
        timeElement.style.color = isOwnMessage ? 'white' : 'color-main';

        contentElement.appendChild(timeElement);

        if (isOwnMessage) {
            messageElement.appendChild(contentElement);
            messageElement.appendChild(avatarElement);
        } else {
            messageElement.appendChild(avatarElement);
            messageElement.appendChild(contentElement);
        }

        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    const sendMessage = () => {
        if (messageContent && stompClientRef.current && connected) {
            const messageRequest = {
                sender_id: id,
                sender_name: fullname,
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
            <div id="messages" className="flex flex-col flex-1 overflow-auto p-2"></div>
            <div id="chat" className="flex items-center gap-4 p-2 pb-0 border-t border-color-main-2">
                <input 
                    type="text" 
                    id="message" 
                    value={messageContent}
                    placeholder="Type your message here..." 
                    className="flex-1 px-4 py-2 mb-2 border border-color-main-2 rounded-l-lg font-garamond text-xl" 
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} disabled={!connected} className="px-4 py-2 h-11 mb-2 bg-blue-500 font-garamond text-white font-semibold bg-color-main-2 rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketChat;