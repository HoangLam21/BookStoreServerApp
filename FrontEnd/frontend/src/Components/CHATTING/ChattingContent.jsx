// import React, { Fragment} from 'react'
// import { Transition, Menu } from '@headlessui/react';
// import { IoSearchOutline } from "react-icons/io5";
// import messData from '../../Data/messData';
// import { CiMenuKebab } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
// import { FaBan } from "react-icons/fa";
// import { IoIosAttach } from "react-icons/io";
// import { FaMicrophone } from "react-icons/fa";
// import { IoIosSend } from "react-icons/io";
// import { useState } from 'react';

// export default function ChattingContent({messdata,user}) { 
    
//     const[searchMess, getSearchMess] = useState('');
    
//     const Avatar = ({ avaSRC }) => {
//         return (
//             <div className="userava img w-10 h-10 rounded-full ">
//                 <img src={avaSRC} alt="" style={{ borderRadius: '50%' }}/> 
//             </div>
//         );
//     }

//     const handleSearchMess = (event) => {
//         const value = event.target.value;
//         getSearchMess(value);
//     }

//     const filteredData = messdata.filter((item) =>
//     item.name.toLowerCase().includes(searchMess.toLowerCase()));

   

//   return (
//     <div className="maincontent flex h-full w-full overflow-hidden gap-8">
//                     <div className="maincontent_left sm:flex sm:flex-col sm:gap-4 sm:w-2/5 w-16 gap-4 flex flex-col">
//                         <div className="list-chat-search relative flex items-center w-full">
//                             <input type="text" value={searchMess} placeholder="Tìm kiếm" className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" onChange={handleSearchMess}/>
//                             <span className='text-xl absolute right-3 '><IoSearchOutline/></span>
//                         </div>
//                         <div className="list-chat flex flex-col overflow-y-auto">
//                             <div className="list-chat-history flex flex-col overflow-y-auto ">

//                                 <ul className="contacts ">
//                                     <li className="active_listchat ">
//                                         {filteredData.map((mess)=>(
//                                             <div className="contacts_item flex sm:gap-3 sm:w-full h-20 sm:items-center hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer w-11 ">
//                                             <Avatar avaSRC={mess.avatar}/>
//                                             <div className="sm:contacts_item_content sm:unread sm:flex-1 sm:flex sm:flex-col whitespace-nowrap overflow-hidden hidden ">
//                                                 <span className="user_inf font-medium">{mess.name}</span>
//                                                 <span className='text-xs'>{mess.address}</span>
//                                             </div>
//                                             <div className='sm:w-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-1 hidden '>
//                                                 <div className="numbermess unread  bg-primary--color w-4 h-4 rounded-full ">
//                                                     <div className="numbermessnow flex justify-center items-center text-xs text-white--color">{mess.numbermess}</div>
//                                                 </div>
//                                                 <div className='w-full text-sm flex items-center justify-center'>{mess.timeoff} phut</div>
//                                             </div>
                                            
//                                         </div>
//                                         ))}
            
//                                     </li>
                                    
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="maincontent_right md:w-3/5 h-full flex flex-col overflow-hidden gap-4 w-80">
//                         <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
//                             <div className='flex gap-4'>
//                                 <Avatar avaSRC={user.avatar}/>
//                                     <div className="chatbox-userinf flex flex-col">
//                                         <span className="user_inf">Oohsehun</span>
//                                         <span>+84 12345678</span>
//                                     </div>
//                             </div>
                            
//                             <Menu as="div" className="relative  ">
//                                 <div>
//                                     <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
//                                         <span id="action_menu_btn"><CiMenuKebab/></span>
//                                     </Menu.Button>
//                                 </div>
//                                 <Transition
//                                     as={Fragment}
//                                     enter="transition ease-out duration-100"
//                                     enterFrom="transform opacity-0 scale-95"
//                                     enterTo="transform opacity-100 scale-100"
//                                     leave="transition ease-in duration-75"
//                                     leaveFrom="transform opacity-100 scale-100"
//                                     leaveTo="transform opacity-0 scale-95"
//                                 >
//                                     <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-0.5 bg-white--color ring-1 ring-black ring-opacity-5 focus:outline-none text-primary--color text-xs">
//                                     <Menu.Item>
//                                         <div className="flex px-4 py-2 flex gap-4  hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer">
//                                             <span><FaPlus/></span>
//                                             <span>Thêm vào nhóm</span>
//                                         </div>
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         <div className="flex px-4 py-2 flex gap-4  hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer">
//                                             <span><FaBan/></span>
//                                             <span>Chặn</span>
//                                         </div>
//                                     </Menu.Item>
//                                     </Menu.Items>
//                                 </Transition>
//                             </Menu>
//                        </div>
//                        <div className="chatbox-body w-full h-5/6 overflow-auto">
//                             <div className="body-content">
//                                 <div className="message_user_mess flex gap-4">
//                                     <Avatar avaSRC={user.avatar}/>
//                                     <div className="mess-content flex flex-col gap-1 ">
//                                         <p className=' bg-border--color text-primary--color rounded-r-3xl rounded-b-3xl p-2'>Xin chao</p>
// 									    <span className="msg_time text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>

//                                     </div>
                            
//                                 </div>
    
//                                 <div className="message_admin_mess flex w-full justify-end pr-4 py-2">
//                                     <div className="mess-content flex flex-col w-2/4 gap-1">
//                                         <span className=' bg-primary--color text-white--color rounded-l-3xl rounded-b-3xl p-2'>Cam on ban da quan tam den cua hang sach cua chung toi
//                                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus velit autem modi consequatur, at explicabo dicta,
//                                         maiores nobis maxime exercitationem quam totam nesciunt nemo quidem magnam voluptas, dolor impedit!</span>
// 									    <span className="msg_time_send text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>
                                    
//                                     </div>
//                                 </div>

//                                 <div className="message_user_mess flex gap-4">
//                                     <Avatar avaSRC={user.avatar}/>
//                                     <div className="mess-content flex flex-col gap-1 ">
//                                         <p className=' bg-border--color text-primary--color rounded-r-3xl rounded-b-3xl p-2'>Xin chao</p>
// 									    <span className="msg_time text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>

//                                     </div>
                            
//                                 </div>
    
//                                 <div className="message_admin_mess flex w-full justify-end pr-4 py-2">
//                                     <div className="mess-content flex flex-col w-2/4 gap-1">
//                                         <span className=' bg-primary--color text-white--color rounded-l-3xl rounded-b-3xl p-2'>Cam on ban da quan tam den cua hang sach cua chung toi
//                                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus velit autem modi consequatur, at explicabo dicta,
//                                         maiores nobis maxime exercitationem quam totam nesciunt nemo quidem magnam voluptas, dolor impedit!</span>
// 									    <span className="msg_time_send text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>
                                    
//                                     </div>
//                                 </div>
//                             </div>
                              
//                        </div>
//                        <div className="chatbox-footer w-fulljustify-center items-center flex text-primary--color">
//                             <div className="input-group-text flex-1 flex items-center justify-end relative">
//                                 <textarea type="text" placeholder="" className="search-input w-full h-12 relative border  border-border--lightcolor pl-2 pr-16 pt-3  rounded-lg"/>
//                                 <span className='absolute right-4 text-lg cursor-pointer'><FaMicrophone/></span>
//                                 <span className='absolute right-10 text-lg cursor-pointer'><IoIosAttach/></span>
//                             </div>
//                             <div className="input-group-send w-10">
//                                 <span className='text-3xl cursor-pointer'><IoIosSend/></span>
//                             </div>
//                        </div>
//                     </div> 
//                 </div>  
//   )
// }

import React, { useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import WebSocketChat from './WebSocketChat';
import io from 'socket.io-client';
const SOCKET_SERVER_URL = "http://167.172.69.8:8010/BookStore/";
const MESSAGEADD_URL = "http://167.172.69.8:8010/BookStore/message/add";
const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";

const MESSAGEALL_URL = 'http://167.172.69.8:8010/BookStore/message/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzY3MTk2NywiaWF0IjoxNzE3NjYxMTY3LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ0FOQ0xFX09SREVSIENSRUFURV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfRklORCBHRVRfQ1VTVE9NRVJfSU5GT1MgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfREVMRVRFIElNUE9SVF9XT1JLX1VQREFURSBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.BeebnrEP8FI7pbjJ4fOSesqGorO2QZTR0TnYz85TWNM';


export default function ChattingContent({ messdata, user }) {
    const [searchMess, setSearchMess] = useState('');
    const [loadmessages, setLoadMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const socket = useRef(null);
    const [messagelistdata, setMessageListData] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);

    const handleClickCustomer = (customer) => {
        // Xác định người nhận tương ứng với khách hàng được chọn
        const receiverId = customer.receiver_id;
    
        // Lọc tin nhắn giữa admin và người nhận tương ứng
        const messages = loadmessages.filter(message => 
            (message.sender_id === 1 && message.receiver_id === receiverId) ||
            (message.sender_id === receiverId && message.receiver_id === 1)
        );
    
        // Cập nhật state với tin nhắn giữa admin và người nhận được chọn
        setSelectedMessages(messages);
    };

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(SOCKET_SERVER_URL);
            ws.onopen = () => {
                console.log('WebSocket connection established.');
                socket.current = ws; // Store WebSocket instance in ref
            };
            ws.onclose = () => {
                console.log('WebSocket connection closed.');
            };
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connectWebSocket(); // Call WebSocket connection function
    }, []);

    const handleSendMessage = async () => {
        
        if (messageContent.trim() !== '') {
            const message = {
                sender_id: 1,
                receiver_id: selectedMessages,
                message_content: messageContent
            };
    
            try {
                // Connect to the WebSocket server
                await connectWebSocket();
    
                // Send message after the connection is established
                socket.current.emit('sendMessage', message);
    
                // Save the message via API
                await saveMessage(message);
    
                // Clear the message content
                setMessageContent('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    const saveMessage = async (message) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(MESSAGEADD_URL, message, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Message added:', response.data);
        } catch (error) {
            console.error('Error adding message:', error);
            throw error;
        }
    };
    const connectWebSocket = async () => {
        return new Promise((resolve, reject) => {
            if (socket.current && socket.current.connected) {
                resolve();
            } else {
                console.log('Connecting to WebSocket...');
                socket.current = io(SOCKET_SERVER_URL);
                socket.current.on('connect', () => {
                    console.log('WebSocket connected');
                    resolve();
                });
                socket.current.on('error', (error) => {
                    console.error('WebSocket connection error:', error);
                    reject(error);
                });
            }
        });
    };
    
    useEffect (() =>{

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(MESSAGEALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setMessageListData(result);
                console.log(result);
            }catch(error){
                console.error('Error fetching user data:', error);
                if(error.response?.data){
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    },[]);

   


    useEffect (() =>{

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(MESSAGEALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setMessageListData(result);
                console.log(result);
            }catch(error){
                console.error('Error fetching user data:', error);
                if(error.response?.data){
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    },[])

    const filteredData = messagelistdata.filter((item) =>
        item.receiver_name && item.receiver_name.toLowerCase().includes(searchMess.toLowerCase())
    );
    const handleSearchMess = (event) => {
        setSearchMess(event.target.value);
    };
    const Avatar = ({ avaSRC }) => (
        <div className="userava img w-10 h-10 rounded-full">
            <img src={`data:image/jpeg;base64, ${avaSRC}`} alt="" style={{ borderRadius: '50%' }} />
        </div>
    );
    return (
        <div className="maincontent flex h-full w-full overflow-hidden gap-8">
            <div className="maincontent_left sm:flex sm:flex-col sm:gap-4 sm:w-2/5 w-16 gap-4 flex flex-col">
                <div className="list-chat-search relative flex items-center w-full">
                    <input
                        type="text"
                        value={searchMess}
                        placeholder="Tìm kiếm"
                        className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10"
                        onChange={handleSearchMess}
                    />
                    <span className='text-xl absolute right-3'><IoSearchOutline /></span>
                </div>
                <div className="list-chat flex flex-col overflow-y-auto">
                    <div className="list-chat-history flex flex-col overflow-y-auto">
                        <ul className="contacts">
                        {filteredData
                            .filter((mess, index, self) => self.findIndex((m) => m.receiver_id === mess.receiver_id) === index)
                            .map((mess) => {
                                const createdAt = new Date(mess.createAt);
                                const now = new Date();
                                const timeDifference = Math.round((now - createdAt) / (1000 * 60));
                                console.log(mess.createdAt);
                                return (
                                    <div key={mess.receiver_id} onClick={() => handleClickCustomer(mess)} className="contacts_item flex sm:gap-3 sm:w-full h-20 sm:items-center hover:bg-backgroud--lightcolor cursor-pointer w-11">
                                        <Avatar avaSRC={mess.receiver_avatar} />
                                        <div className="sm:contacts_item_content sm:unread sm:flex-1 sm:flex sm:flex-col whitespace-nowrap overflow-hidden hidden">
                                            <span className="user_inf font-medium">{mess.receiver_name}</span>
                                            <span className='text-xs'>{mess.message_content}</span>
                                        </div>
                                        <div className='sm:w-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-1 hidden'>
                                            <div className="numbermess unread bg-primary--color w-4 h-4 rounded-full">
                                                <div className="numbermessnow flex justify-center items-center text-xs text-white--color">{1}</div>
                                            </div>
                                            <div className='w-full text-sm flex items-center justify-center'>{timeDifference} phút</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="maincontent_right md:w-3/5 h-full flex flex-col overflow-hidden gap-4 w-80">
                <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
                    <div className='flex gap-4'>
                        <Avatar avaSRC={user.avatar} />
                        <div className="chatbox-userinf flex flex-col">
                            <span className="user_inf">{user.fullname}</span>
                        </div>
                    </div>
                </div>
                <div className="chatbox-body w-full h-5/6 overflow-auto">
                    {/* <div className="body-content">
                        {loadmessages.map((messageArray) => (
                            messageArray.map((message) => {
                                const isCurrentUserSender = message.sender_id === user.id;
                                const messageAlignmentClass = isCurrentUserSender ? 'justify-end' : 'justify-start';
                                const avatarSrc = isCurrentUserSender ? user.avatar : message.receiver_avatar;

                                return (
                                    <div key={message.id} className={`flex ${messageAlignmentClass} gap-4`}>
                                        {!isCurrentUserSender && <Avatar avaSRC={avatarSrc} />}
                                        <div className="mess-content flex flex-col gap-1 w-2/4">
                                            <p className={`${isCurrentUserSender ? 'bg-primary--color text-white--color rounded-l-3xl' : 'bg-border--color text-primary--color rounded-r-3xl'} rounded-b-3xl p-2`}>
                                                {message.message_content}
                                            </p>
                                            <span className="msg_time text-xs text-header--lightcolor pl-1">
                                                {new Date(message.createAt).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ))}
                    </div>
                </div>
                <div className="chatbox-footer flex items-center gap-4"> */}
                        {/* <input
                            type="text"
                            value={messageContent}
                            placeholder="Nhập tin nhắn"
                            className="chat-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10"
                            onChange={(e) => setMessageContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button onClick={handleSendMessage} className="text-xl"><IoIosSend /></button> */}
                <WebSocketChat/>

                </div> 
            </div>
        </div>
    );
}
