// import React, { useState, useEffect, useRef,useContext } from 'react';
// import { IoSearchOutline } from "react-icons/io5";
// import axios from 'axios';
// import WebSocketChat from './WebSocketChat';
// import {MyInfoContext} from '../../Components/context/MyInfoContext'

// const SOCKET_SERVER_URL = "http://167.172.69.8:8010/BookStore/";
// const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";
// const MESSAGEALL_URL = "http://167.172.69.8:8010/BookStore/message/all";



// export default function ChattingContent() {
//     const [searchMess, setSearchMess] = useState('');
//     const [loadmessages, setLoadMessages] = useState([]);
//     const [messageContent, setMessageContent] = useState([]);
//     const [receiver_Id, setReceiver_Id] = useState('');
//     const [sender_Id, setSender_Id] = useState('');
//     const [sender_name, setSenderName] = useState('');
//     const [reciever_name, setRecieverName] = useState('');
//     const [reviever_ava, setReciver_Ava] = useState('');
//     const socket = useRef(null);
//     const [messagelistdata, setMessageListData] = useState([]);
//     const [selectedMessages, setSelectedMessages] = useState([]);
//     const {id, fullname} = useContext(MyInfoContext)

//     const handleClickCustomer = (customer) => {
//         // Xác định người nhận tương ứng với khách hàng được chọn
//         const receiverId = customer.receiver_id;
//         setReceiver_Id(receiverId);
//         setSenderName(customer.sender_id === id ? customer.sender_name : customer.receiver_name);
//         setReciver_Ava(customer.receiver_avatar);
    
//         // Lọc tin nhắn giữa admin và người nhận tương ứng
//         const messages = messagelistdata.filter(message =>
//             (message.sender_id === id && message.receiver_id === receiverId) ||
//             (message.sender_id === receiverId && message.receiver_id === id)
//         );
    
//         // Cập nhật state với tin nhắn giữa admin và người nhận được chọn
//         setSelectedMessages(messages);
    
//         // Cập nhật nội dung cuộc trò chuyện
//         const matchingMessages = messagelistdata.filter(message =>
//             (message.sender_id === receiver_Id && message.receiver_id === id) ||
//             (message.sender_id === id && message.receiver_id === receiver_Id)
//         );
//         setMessageContent(matchingMessages);
//         console.log(messageContent, "thằng này là nội dung")
//     };
    
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const fetchUserData = async () => {
//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }
    
//             try {
//                 const response = await axios.get(MESSAGELOAD_URL, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const result = response.data.result;
//                 const allMessages = result.flat();
//                 setMessageListData(allMessages);
//                 console.log(result, "thang nay cua side bar");
    
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response?.data);
//                 }
//             }
//         };
//         fetchUserData();
//     }, []);

   

//     const getTimeAgo = (messageTimestamp) => {
//         if (!messageTimestamp) return 'Unknown time';
    
//         const createdAt = new Date(messageTimestamp);
//         if (isNaN(createdAt)) return 'Invalid date';
    
//         const now = new Date();
//         const timeDifferenceInMinutes = Math.round((now - createdAt) / (1000 * 60));
    
//         if (timeDifferenceInMinutes < 60) {
//             return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes !== 1 ? 's' : ''} ago`;
//         } else if (timeDifferenceInMinutes < 1440) { // 1440 minutes in a day
//             const hours = Math.round(timeDifferenceInMinutes / 60);
//             return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
//         } else {
//             const days = Math.round(timeDifferenceInMinutes / 1440);
//             return `${days} day${days !== 1 ? 's' : ''} ago`;
//         }
//     };

//     const filteredData = messagelistdata.filter((item) =>
//         item.receiver_name && item.receiver_name.toLowerCase().includes(searchMess.toLowerCase())
//     );
//     const handleSearchMess = (event) => {
//         setSearchMess(event.target.value);
//     };
//     const Avatar = ({ avaSRC }) => (
//         <div className="userava img w-10 h-10 rounded-full">
//             <img src={`data:image/jpeg;base64, ${avaSRC}`} alt="" style={{ borderRadius: '50%' }} />
//         </div>
//     );
//     return (
//         <div className="maincontent flex h-full w-full overflow-hidden gap-8">
//             <div className="maincontent_left sm:flex sm:flex-col sm:gap-4 sm:w-2/5 w-16 gap-4 flex flex-col">
//                 <div className="list-chat-search relative flex items-center w-full">
//                     <input
//                         type="text"
//                         value={searchMess}
//                         placeholder="Tìm kiếm"
//                         className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10"
//                         onChange={handleSearchMess}
//                     />
//                     <span className='text-xl absolute right-3'><IoSearchOutline /></span>
//                 </div>
//                 <div className="list-chat flex flex-col overflow-y-auto">
//                     <div className="list-chat-history flex flex-col overflow-y-auto">
//                         <ul className="contacts">
//                         {filteredData
//                 .filter((mess, index, self) => self.findIndex((m) => m.receiver_id === mess.receiver_id) === index)
//                 .map((mess) => {
//                     return (
//                         <li key={mess.receiver_id}>
//                             <div onClick={() => handleClickCustomer(mess)} className="contacts_item flex sm:gap-3 sm:w-full h-20 sm:items-center hover:bg-backgroud--lightcolor cursor-pointer w-11">
//                                 <Avatar avaSRC={mess.receiver_avatar} />
//                                 <div className="sm:contacts_item_content sm:unread sm:flex-1 sm:flex sm:flex-col whitespace-nowrap overflow-hidden hidden">
//                                     <span className="user_inf font-medium">{mess.receiver_name}</span>
//                                     <span className='text-xs'>{mess.message_content}</span>
//                                 </div>
//                                 <div className='sm:w-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-1 hidden overflow-hidden'>
//                                     <div className="numbermess unread bg-primary--color w-4 h-4 rounded-full">
//                                         <div className="numbermessnow flex justify-center items-center text-xs text-white--color">{1}</div>
//                                     </div>
//                                     <div className='w-full text-xs whitespace-nowrap flex items-center justify-start'>{getTimeAgo(mess.createAt)}</div>
//                                 </div>
//                             </div>
//                         </li>
//                     );
//                 })}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="maincontent_right md:w-3/5 h-full flex flex-col overflow-hidden gap-4 w-80">
//                 <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
//                     <div className='flex gap-4'>
//                         <Avatar avaSRC={reviever_ava} />
//                         <div className="chatbox-userinf flex flex-col">
//                             <span className="user_inf">{sender_name}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="chatbox-body w-full h-5/6 overflow-auto ">
                    
//                 <WebSocketChat receiver_id = {receiver_Id} receiver_avatar = {reviever_ava} messageContent={messageContent}/>

//                 </div> 
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useRef,useContext } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import WebSocketChat from './WebSocketChat';
import {MyInfoContext} from '../../Components/context/MyInfoContext'

const SOCKET_SERVER_URL = "http://167.172.69.8:8010/BookStore/";
const MESSAGELOAD_URL = "http://167.172.69.8:8010/BookStore/message/loadchat";
const MESSAGEALL_URL = "http://167.172.69.8:8010/BookStore/message/all";



export default function ChattingContent() {
    const [searchMess, setSearchMess] = useState('');
    const [loadmessages, setLoadMessages] = useState([]);
    const [messageContent, setMessageContent] = useState([]);
    const [receiver_Id, setReceiver_Id] = useState('');
    const [sender_name, setSenderName] = useState('');
    const [reviever_ava, setReciver_Ava] = useState('');
    const [messagelistdata, setMessageListData] = useState([]);
    const {id} = useContext(MyInfoContext)


    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUserData = async () => {
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
                const rs = result.flat()
                setMessageListData(rs)
                setLoadMessages(result)

              
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };
        fetchUserData();
    }, []);

    console.log(messageContent,"id neeeeeeeeee")


    // const handleClickCustomer = (customer) => {
       
    //     const receiver_id = customer.sender_id === 7? customer.receiver_id : customer.sender_id

    //     setReceiver_Id(receiver_id);
    //     setSenderName(customer.sender_id === 7 ? customer.sender_name : customer.receiver_name);
    //     setReciver_Ava(customer.receiver_avatar);

    //     const messages = loadmessages.flatMap(messages => messages).filter(message =>
    //         (message.sender_id === 7 && message.receiver_id === receiver_id) ||
    //         (message.sender_id === receiver_id && message.receiver_id === 7)
    //     );
        
     
    //     setMessageContent(messages);
      
    // };




    const handleClickCustomer = (customer) => {
       
        const receiver_id = customer.sender_id === id? customer.receiver_id : customer.sender_id

        console.log(receiver_id)
        setReceiver_Id(receiver_id);
        setSenderName(customer.sender_id === id ? customer.receiver_name : customer.sender_name);
        setReciver_Ava(customer.receiver_avatar);

        const messages = loadmessages.flatMap(messages => messages).filter(message =>
            (message.sender_id === id && message.receiver_id === receiver_id) ||
            (message.sender_id === receiver_id && message.receiver_id === id)
        );
        
     
        setMessageContent(messages);
      
    };
 

   

    const getTimeAgo = (messageTimestamp) => {
        if (!messageTimestamp) return 'Unknown time';
    
        const createdAt = new Date(messageTimestamp);
        if (isNaN(createdAt)) return 'Invalid date';
    
        const now = new Date();
        const timeDifferenceInMinutes = Math.round((now - createdAt) / (1000 * 60));
    
        if (timeDifferenceInMinutes < 60) {
            return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInMinutes < 1440) { // 1440 minutes in a day
            const hours = Math.round(timeDifferenceInMinutes / 60);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.round(timeDifferenceInMinutes / 1440);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    };

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
                    return (
                        <li key={mess.receiver_id}>
                            <div onClick={() => handleClickCustomer(mess)} className="contacts_item flex sm:gap-3 sm:w-full h-20 sm:items-center hover:bg-backgroud--lightcolor cursor-pointer w-11">
                                <Avatar avaSRC={mess.receiver_avatar} />
                                <div className="sm:contacts_item_content sm:unread sm:flex-1 sm:flex sm:flex-col whitespace-nowrap overflow-hidden hidden">
                                    <span className="user_inf font-medium">{mess.receiver_name}</span>
                                    <span className='text-xs'>{mess.message_content}</span>
                                </div>
                                <div className='sm:w-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-1 hidden overflow-hidden'>
                                    <div className="numbermess unread bg-primary--color w-4 h-4 rounded-full">
                                        <div className="numbermessnow flex justify-center items-center text-xs text-white--color">{1}</div>
                                    </div>
                                    <div className='w-full text-xs whitespace-nowrap flex items-center justify-start'>{getTimeAgo(mess.createAt)}</div>
                                </div>
                            </div>
                        </li>
                    );
                })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="maincontent_right md:w-3/5 h-full flex flex-col overflow-hidden gap-4 w-80">
                <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
                    <div className='flex gap-4'>
                        <Avatar avaSRC={reviever_ava} />
                        <div className="chatbox-userinf flex flex-col">
                            <span className="user_inf">{sender_name}</span>
                        </div>
                    </div>
                </div>
                <div className="chatbox-body w-full h-5/6 overflow-auto ">
                    
                <WebSocketChat receiver_id = {receiver_Id} receiver_avatar = {reviever_ava} messageContentList={messageContent} id={id}/>

                </div> 
            </div>
        </div>
    );
}

