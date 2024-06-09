import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketChat = () => {
    const stompClientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const username = "camlansuc"; 

    // useEffect(() => {
    //     const connect = () => {
    //         const socket = new SockJS('http://167.172.69.8:8010/BookStore/ws');
    //         stompClientRef.current = Stomp.over(socket);

    //         stompClientRef.current.connect({}, (frame) => {
    //             console.log('Connected: ' + frame);
    //             setConnected(true);

    //             stompClientRef.current.subscribe('/topic/public', (message) => {
    //                 showMessage(JSON.parse(message.body));
    //             }, 7000);

    //             stompClientRef.current.subscribe('/queue/' + username, (message) => {
    //                 showMessage(JSON.parse(message.body));
    //             }, 7000);
    //             setTimeout(function() {
    //                 stompClientRef.current.subscribe('/topic/public', (message) => {
    //                     showMessage(JSON.parse(message.body));
    //                 });
    //              }, 5000);

    //         }, (error) => {
    //             console.error('Error: ' + error);
    //             setConnected(false);
    //             // Attempt reconnection after a delay
    //             setTimeout(connect, 10000);
    //         });

    //     };

    //     connect();
    // }, []);

    const showMessage = (message) => {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('flex', 'gap-4', 'mb-8', 'justify-end');

        const avatarElement = document.createElement('img');
        avatarElement.classList.add('w-8', 'h-8', 'rounded-full');
        avatarElement.src = message.sender_avatar;
        avatarElement.alt = 'Sender Avatar';

        const contentElement = document.createElement('div');
        contentElement.classList.add('mess-content', 'justify-end', 'items-end', 'bg-border--color', 'text-primary--color', 'rounded-l-xl', 'rounded-b-xl', 'p-2', 'flex', 'flex-col', 'gap-1', 'w-fit');
        
        const senderInfo = document.createElement('div');
        senderInfo.classList.add('sender-info', 'text-sm', 'font-semibold');
        const senderName = document.createElement('span');
        senderName.textContent = message.sender_name;
        senderInfo.appendChild(senderName);

        const messageContent = document.createElement('p');
        messageContent.classList.add('rounded-b-3xl', 'p-2', 'pl-3');
        messageContent.textContent = message.message_content;
        contentElement.appendChild(senderInfo);
        contentElement.appendChild(messageContent);

        const timeElement = document.createElement('span');
        timeElement.classList.add('msg_time', 'text-xs', 'text-header--lightcolor', 'pl-1');
        timeElement.textContent = new Date(message.createAt).toLocaleTimeString();
        contentElement.appendChild(timeElement);

        messageElement.appendChild(contentElement);
        messageElement.appendChild(avatarElement);

        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    const sendMessage = () => {
        if (messageContent && stompClientRef.current && connected) {
            const messageRequest = {
                sender_id: 1,
                sender_name: "Tái Châu Quế Lầu",
                sender_avatar: "https://i.pinimg.com/564x/85/ac/ef/85acef01d0403c8222a10068ae534087.jpg",
                receiver_id: 16,
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
            <div id="chat" className="flex items-center gap-4 p-4 pb-0 border-t border-gray-300">
                <input 
                    type="text" 
                    id="message" 
                    value={messageContent}
                    placeholder="Type your message here..." 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg" 
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} disabled={!connected} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketChat;
