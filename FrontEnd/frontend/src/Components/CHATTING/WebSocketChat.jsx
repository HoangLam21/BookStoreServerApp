
import React, { useEffect, useRef, useState, useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import logo from "../Assets/Beige And Blue Minimal Modern Book Store Logo (1).png";
import { MyInfoContext } from '../../Components/context/MyInfoContext';
const WebSocketChat = ({ receiver_id, receiver_avatar, messageContentList = [] }) => {
    const stompClientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const subscribedRef = useRef({ public: false, private: false });
    const [messageContent, setMessageContent] = useState('');
    const username = "admin"; 
    const { id, fullname, avatar } = useContext(MyInfoContext);

    useEffect(() => {
        console.log(username)
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
                

               
                // setTimeout(function() {
                //     stompClientRef.current.subscribe('/topic/public', (message) => {
                //         showMessage(JSON.parse(message.body));
                //     });
                //  });
                setConnected(true);


            }, (error) => {
                console.error('Error: ' + error);
                setConnected(false);
                // Attempt reconnection after a delay
                // setTimeout(connect, 10000);
            });

        };

        connect();
    }, []);
    
    useEffect(() => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        messageContentList.forEach(message => showMessage(message));
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messageContentList]);

   

    const showMessage = (message) => {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        
        const isOwnMessage = parseInt(message.sender_id) === parseInt(id);


        const messageAlignment = isOwnMessage ? 'justify-end' : 'justify-start';
        const contentAlignment = isOwnMessage ? 'bg-blue-100' : 'bg-gray-100';
    
        messageElement.classList.add('flex', 'gap-4', 'mb-8', messageAlignment);
        
    
        const avatarElement = document.createElement('img');
        avatarElement.classList.add('w-8', 'h-8', 'rounded-full');
        avatarElement.src = isOwnMessage ? `data:image/png;base64,${avatar}` : `data:image/png;base64,${receiver_avatar}`;
        avatarElement.alt = 'Sender Avatar';

    
        const contentElement = document.createElement('div');
        contentElement.classList.add('mess-content', 'p-2', 'rounded-lg', 'flex', 'flex-col', 'gap-1', 'w-fit', 'max-w-xs', contentAlignment);
        contentElement.style.backgroundColor = '#EEECE9';
    
        const senderInfo = document.createElement('div');
        senderInfo.classList.add('sender-info', 'text-sm', 'font-semibold');
        senderInfo.style.textAlign = isOwnMessage ? 'end' : 'start';
        const senderName = document.createElement('span');
        senderName.textContent = message.sender_name;
        senderInfo.appendChild(senderName);
    
        const messageContent = document.createElement('p');
        messageContent.classList.add('rounded-b-3xl', 'p-2', 'pl-3');
        messageContent.textContent = message.message_content;
        contentElement.appendChild(senderInfo);
        contentElement.appendChild(messageContent);
    
        const timeElement = document.createElement('span');
        timeElement.classList.add('msg_time', 'text-xs', 'text-gray-500', 'pl-1');
        timeElement.textContent = new Date(message.createAt).toLocaleTimeString();
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
                //receiver_avatar: receiver_avatar,
                receiver_id: receiver_id,
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

