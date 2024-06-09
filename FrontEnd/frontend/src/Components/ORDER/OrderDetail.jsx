import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookData from '../../Data/bookData';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./scrollbar.css"

const stockfinfor = "flex gap-4 font-light  text-primary--color whitespace-nowrap";
const stockInfTitle = "font-medium text-header--lightcolor whitespace-nowrap";


const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';

export default function OrderDetail() {
    const [order, setOrder] = useState(null);
    const { id: orderId } = useParams();
    const DeleteUrl = `http://167.172.69.8:8010/BookStore/order/delete/${orderId}`;
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
                const foundOrder = result.find(order => order.id.toString() === orderId);
                setOrder(foundOrder);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };

        fetchUserData();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const {
        id,
        customerId,
        fullname,
        order_note,
        price,
        total_dis,
        status_trans,
        total_price,
        address,
        phonenumber,
        method_payment,
        createAt,
        createBy,
        orderDetailResponse = []
    } = order;

    function ShippingStatus(bookstatus) {
        switch (bookstatus) {
            case 0: return "Chờ xác nhận";
            case 1: return "Đã xác nhận";
            case 2: return "Đang chuẩn bị hàng";
            case 3: return "Đang giao";
            case 4: return "Đã thanh toán";
            case 5: return "Đã giao";
            default: return "Trạng thái không xác định";
        }
    }
    const handleDeleteStock = async () => {
        toast.warn(
            <div className='flex flex-col'>
             <p>Bạn có muốn xóa đơn hàng này</p>
               <div className='flex w-full py-1 justify-between'>
               <button onClick={confirmDelete}>Confirm</button>
               <button onClick={() => toast.dismiss()}>Cancel</button>
               </div>
             
            </div>,
            {
              position: "top-center",
              autoClose: false,
              closeOnClick: true,
              draggable: true,
              pauseOnHover: true,
              progress: undefined
            }
          );
        };
      
        const confirmDelete = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await axios.delete(DeleteUrl, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            console.log('Stock deleted:', response.data);
            // Add any additional logic after successful deletion, e.g., update state or UI
            toast.success("Stock deleted successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          } catch (error) {
            console.error('Error deleting stock:', error);
            if (error.response?.data) {
              console.error("Error response:", error.response.data);
            }
            toast.error("Error deleting stock. Please try again later.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
      };
    
      return (
        <div className='w-full h-3/5 gap-4 flex-col flex '>
            <div className='flex gap-8 items-center border-b h-12 w-full border-border--lightcolor'>
                <h4 className='h-8 relative flex items-start'>Thông tin hóa đơn</h4>
            </div>
            <div className="HDNH_maincontent_body1 flex gap-8 py-4 text-primary--color">
                <div className="body1_stocknumber w-32 flex justify-center items-center border-2 rounded-xl border-primary--color">HD{id}</div>
                <div className="body1_des">
                    <div className={stockfinfor}>
                        <label htmlFor="stockdate" className={stockInfTitle}>Ngày tạo hóa đơn: </label>
                        <div className="stockdate">{new Date(createAt).toLocaleDateString()}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label htmlFor="stockstatus" className={stockInfTitle}>Trạng thái: </label>
                        <div className="stockstatus">{ShippingStatus(status_trans)}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label htmlFor="staffnumber" className={stockInfTitle}>Người cập nhật: </label>
                        <div className="staffnumber">{createBy}</div>
                    </div>
                </div>
            </div>

            <div className="HDNH_maincontent_body2 pl-4">
                <h4 className="font-medium text-primary--color pb-4 pt-1">Thông tin người nhận</h4>
                <div className="body2_des">
                    <div className={stockfinfor}>
                        <label htmlFor="providername" className={stockInfTitle}>Tên người nhận: </label>
                        <div className="providername">{fullname}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label htmlFor="providerphonenumber" className={stockInfTitle}>Số điện thoại: </label>
                        <div className="providerphonenumber">{phonenumber}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label htmlFor="provideraddress" className={stockInfTitle}>Địa chỉ: </label>
                        <div className="provideraddress">{address}</div>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center'>
                <button
                    onClick={handleDeleteStock}
                    className="btn_addworkshift bg-color-background-main text-primary--color rounded-full mb-2 mr-8 cursor-pointer hover:opacity-70 border 
                            h-10 w-28 text-xs 
                            sm:w-26 sm:text-sm
                            md:w-26 md:text-sm
                            lg:w-32 lg:text-sm"
                >
                    Xóa đơn hàng
                </button>
            </div>

            <div className="HDNH_maincontent_body3">
                <h4 className="pl-4 font-medium text-primary--color pb-6 pt-0">Sản phẩm đã mua</h4>
                <div className="scrollable-table-container">  {/* Thay đổi đây */}
                    <table className="table-auto w-full text-header--lightcolor font-medium">
                        <thead>
                            <tr>
                                <th className="w-1/4">Sản phẩm</th>
                                <th className="w-1/4">Đơn giá</th>
                                <th className="w-1/5">Số lượng</th>
                                <th className="w-1/5">Giảm giá</th>
                                <th className="w-1/4">Tổng</th>
                            </tr>
                        </thead>
                        <tbody className="text-primary--color">
                            {orderDetailResponse.map((item, index) => (
                                <tr key={index} className="HDNH_item h-16">
                                    <td className="item_name text-start">{item.title}</td>
                                    <td className="item_price text-start">{item.price}</td>
                                    <td className="item_amount text-start">{item.quantity}</td>
                                    <td className="item_discount text-start">{item.discount}</td>
                                    <td className="item_total text-start">
                                        {(item.price * item.quantity - item.discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Di chuyển phần footer ra ngoài */}
            <div className="HDNH_maincontent_footer pr-12 sm:pr-32 pt-10 pb-10 flex flex-col gap-4 text-primary--color">
                <div className="HDNH_maincontent_footer_total flex justify-between">
                    <span className="stockInfTitle">Tổng tiền hàng</span>
                    <div className="HDNH_total">{price}</div>
                </div>
                <div className="HDNH_maincontent_footer_discount flex justify-between">
                    <span className="stockInfTitle">Giảm giá</span>
                    <div className="HDNH_discount">{total_dis}</div>
                </div>
                <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
                    <span className='text-primary--color font-bold'>Tổng thanh toán</span>
                    <div className="HDNH_finaltotal text-primary--color font-bold">{total_price}</div>
                </div>
            </div>
        </div>
    )
}