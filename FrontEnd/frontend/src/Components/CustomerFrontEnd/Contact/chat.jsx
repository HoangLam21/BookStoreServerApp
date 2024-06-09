



import React, { useState, useEffect, useRef, useContext } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import WebSocketChat from './webSocketChat';
import io from 'socket.io-client';
import './chat.css'
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from "../../context/UserContext";



const SOCKET_SERVER_URL = "http://167.172.69.8:8010/BookStore/";
const MESSAGEADD_URL = "http://167.172.69.8:8010/BookStore/message/add";
const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";

const MESSAGEALL_URL = 'http://167.172.69.8:8010/BookStore/message/all';


export default function ChattingContent() {
    const [searchMess, setSearchMess] = useState('');
    const socket = useRef(null);
    const [messagelistdata, setMessageListData] = useState([]);
    const { fullname,avatar,login2, logout2} = useContext(UserContext)


    
    const { token, id, login, logout } = useContext(AuthContext);


    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(SOCKET_SERVER_URL);
            ws.onopen = () => {
                console.log('WebSocket connection established.');
                socket.current = ws; 
            };
            ws.onclose = () => {
                console.log('WebSocket connection closed.');
            };
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connectWebSocket(); 
    }, []);


    useEffect(() => {
        localStorage.setItem('token', token);

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(MESSAGEALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setMessageListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        localStorage.setItem('token', token);

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(MESSAGEALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setMessageListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    }, [])

    const uniqueUsers = messagelistdata.filter((item, index, self) => 
        index === self.findIndex((t) => t.receiver_id === item.receiver_id)
    );

    const filteredData = uniqueUsers.filter((item) =>
        item.receiver_name && item.receiver_name.toLowerCase().includes(searchMess.toLowerCase())
    );

    

    const Avatar = ({ avaSRC }) => (
        <div className="userava img w-10 h-10 rounded-full">
            <img src={`data:image/jpeg;base64, ${avaSRC}`} alt="" style={{ borderRadius: '50%' }} />
        </div>
    );

    const [receiverId, setReceiverId] = useState(null);
    const [receiverName, setReceiverName] = useState('');
    const [receiverAvatar, setReceiverAvatar] = useState('');

    const handleReceiverSelection = (receiver) => {
        setReceiverId(receiver.receiver_id);
        setReceiverName(receiver.receiver_name);
        setReceiverAvatar(receiver.receiver_avatar);
    };

    return (
        <div className="maincontent flex border border-[#a89b8f] rounded-md">
            <div className="maincontent_left ">
                
                
            </div>
            <div className="maincontent_right w-96 h-96">
                <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
                    
                </div>
                <div className="chatbox-body w-full h-5/6 overflow-auto">
                    <WebSocketChat
                        senderId={15}
                        receiverId={1}
                        senderName={fullname}
                        senderAvatar={avatar}
                    />
                </div>
            </div>
        </div>
    );
};
