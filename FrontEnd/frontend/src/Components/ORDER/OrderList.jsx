import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';
const UPDATESTATUS_URL = 'http://167.172.69.8:8010/BookStore/order/update-status/';

export default function OrderList() {
    const [searchStock, setSearchStock] = useState('');
    const [orderlistdata, setOrderListData] = useState([]);
    const [statuses, setStatuses] = useState({});

    const handleSearchStock = (event) => {
        const value = event.target.value;
        setSearchStock(value);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(ORDERALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setOrderListData(result);
                const initialStatuses = result.reduce((acc, order) => {
                    acc[order.id] = order.status_trans;
                    return acc;
                }, {});
                setStatuses(initialStatuses);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };
        fetchUserData();
    }, []);

    const filteredData = orderlistdata.filter((item) =>
        item.customerId.toString().toLowerCase().includes(searchStock.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchStock.toLowerCase()) ||
        item.fullname.toLowerCase().includes(searchStock.toLowerCase()) ||
        item.phonenumber.toLowerCase().includes(searchStock.toLowerCase()) ||
        item.status_trans.toString().includes(searchStock)
    );

    function ShippingStatus(ordstatus) {
        let status = "";
        switch (ordstatus) {
            case 0:
                status = "Chờ xác nhận";
                break;
            case 1:
                status = "Đã xác nhận";
                break;
            case 2:
                status = "Đang chuẩn bị hàng";
                break;
            case 3:
                status = "Đang giao";
                break;
            case 4:
                status = "Đã thanh toán";
                break;
            case 5:
                status = "Đã giao";
                break;   
            default:
                status = "Unknown";
        }
        
        return status;
    }

    function TextColor(orderstatus) {
        switch (orderstatus) {
            case 0:
                return "text-status--0";
            case 1:
            case 2:
            case 3:
                return "text-status--1-3";
            case 5:
                return "text-status--4";
            default:
                return "";
        }
    }

    const handleUpdateStatus = async (event, id) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const url = `${UPDATESTATUS_URL}${id}?status=${statuses[id]}`;
        console.log(url);

        try {
            const response = await axios.patch(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Status changed:', response.data);
            toast.success('Xác nhận thành công!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Optionally update the orderlistdata if needed
        } catch (error) {
            console.error('Error changing status:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    const handleStatusChange = (id, newStatus) => {
        const currentStatus = statuses[id];
        if (newStatus > currentStatus + 1) {
            toast.error(`Chỉ được cập nhật lên 1 đơn vị từ trạng thái hiện tại: ${ShippingStatus(currentStatus)}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [id]: newStatus,
            }));
        }
    };

    return (
        <div className='w-full h-full'>
            <div className="list-chat-search relative flex items-center gap-10 w-full border-b h-16 -top-0 border-border--lightcolor">
                <div className='w-2/5 relative flex items-center'>
                    <input type="text" value={searchStock} placeholder="Tìm kiếm" className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" onChange={handleSearchStock} />
                    <span className='text-xl absolute right-3 text-primary--color'><IoSearchOutline /></span>
                </div>
            </div>

            <ToastContainer />

            <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
                <div className="overflow-x-auto md:overflow-hidden md:w-full sm:w-[96%]">
                    <table className="min-w-full">
                        <thead className="bg-header--lightcolor text-primary--color whitespace-nowrap">
                            <tr>
                                <th className='w-1/7 text-center py-2'>Mã hóa đơn</th>
                                <th className='w-1/5 text-center py-2'>Mã khách hàng</th>
                                <th className='w-1/5 text-center py-2'>Tên khách hàng</th>
                                <th className='w-1/5 text-center py-2'>Ngày hóa đơn</th>
                                <th className='w-1/5 text-center py-2'>Tổng tiền</th>
                                <th className='w-1/3 text-center py-2'>Trạng thái</th>
                                <th className='w-1/3 text-center py-2'>Xác nhận</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white whitespace-nowrap">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-backgrond--color">
                                    <td className="w-1/7 text-center py-2">
                                        <Link to={`/admin/HoaDon/${item.id}`} className="hover:underline">{item.id}</Link>
                                    </td>
                                    <td className="w-1/5 text-center py-2">{item.customerId}</td>
                                    <td className="w-1/5 text-center py-2">{item.fullname}</td>
                                    <td className="w-1/5 text-center py-2">
                                        {item.createAt ? new Date(item.createAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="w-1/5 text-center py-2">{item.total_price} vnd</td>
                                    <td className={classNames("w-1/3 text-center py-2", TextColor(statuses[item.id]))}>
                                        {ShippingStatus(statuses[item.id])}
                                    </td>
                                    <td className="w-1/3 text-center py-2">
                                        <select
                                            value={statuses[item.id]}
                                            onChange={(e) => handleStatusChange(item.id, Number(e.target.value))}
                                            className="border-2 h-7 border-border--color rounded-md px-2 w-28"
                                        >
                                            <option value={0}>Chờ xác nhận</option>
                                            <option value={1}>Đã xác nhận</option>
                                            <option value={2}>Đang chuẩn bị hàng</option>
                                            <option value={3}>Đang giao</option>
                                            <option value={4}>Đã thanh toán</option>
                                            <option value={5}>Đã giao</option>
                                        </select>
                                        <button onClick={(event) => handleUpdateStatus(event, item.id)} className="px-1 ml-2 w-fit text-white--color bg-primary--color rounded-md">
                                            Xác nhận
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}