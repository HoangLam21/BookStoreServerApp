
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import CusHistoryOrderData from '../../Data/JSON_DATA/cusHistoryOrder.json';
// import { Link } from 'react-router-dom';
// import axios from 'axios';


// const ORDERALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/order/all';
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';


// export default function CusHistoryOrder() {
//     const { id: customerId } = useParams();
//     const [customerOrders, setCustomerOrders] = useState([]);
//     const [order, setOrder] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }

//             try {
//                 const response = await axios.get(ORDERALL_URL, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const result = response.data.result;
//                 const foundOrder = result.filter((order) => order.customerId === customerId);
//                 setCustomerOrders(foundOrder);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response?.data);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [customerId]);

//     if (!customerOrders) {
//         return <div>Loading...</div>;
//     }

   
//     const getShippingStatus = (status) => {
//         switch (status) {
//             case 0:
//                 return "Chờ xác nhận";
//             case 1:
//                 return "Đã xác nhận";
//             case 2:
//                 return "Đang chuẩn bị hàng";
//             case 3:
//                 return "Đang giao";
//             case 4:
//                 return "Đã giao hàng";
//             default:
//                 return "Không xác định";
//         }
//     };

//     return (
//         <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-hidden">
//             <div className="KH_maincontent_footer_content_tittle flex py-4 w-full">
//                 <span className='w-1/5 justify-center flex'>Mã hóa đơn</span>
//                 <span className='w-1/3 justify-center flex'>Ngày hóa đơn</span>
//                 <span className=' w-1/5 justify-center flex'>Tổng tiền</span>
//                 <span className='w-1/3 justify-center flex'>Trạng thái</span>
//             </div>
//             <div className="KH_maincontent_footer_content_detail h-32 overflow-auto">
//                 {customerOrders.map((order) => (
//                     <Link to={`/HoaDon/${order.id}`} key={order.id} className="KH_content_detail_item flex w-full py-1 hover:bg-backgrond--color hover:no-underline">
//                         <div className="item_KH item_ordernumber w-1/5 flex justify-center">{order.id}</div>
//                         <div className="item_KH item_datenumber w-1/3 justify-center flex">{order.createAt ? new Date(order.createAt).toLocaleDateString() : 'N/A'}</div>
//                         <div className="item_KH item_total w-1/5 justify-center flex">{order.total_price} vnd</div>
//                         <div className="item_KH item_status w-1/3 justify-center flex">{getShippingStatus(order.status_trans)}</div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';

const CusHistoryOrder = ({ customerId }) => {
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(ORDERALL_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = response.data.result;
        const foundOrder = result.filter((order) => order.customerId === parseInt(customerId, 10));
        setCustomerOrders(foundOrder);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.data) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    fetchUserData();
  }, [customerId]);

  if (!customerOrders) {
    return <div>Loading...</div>;
  }

  const getShippingStatus = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đang chuẩn bị hàng";
      case 3:
        return "Đang giao";
      case 4:
        return "Đã giao hàng";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-hidden">
      <div className="KH_maincontent_footer_content_tittle flex py-4 w-full">
        <span className='w-1/5 justify-center flex'>Mã hóa đơn</span>
        <span className='w-1/3 justify-center flex'>Ngày hóa đơn</span>
        <span className=' w-1/5 justify-center flex'>Tổng tiền</span>
        <span className='w-1/3 justify-center flex'>Trạng thái</span>
      </div>
      <div className="KH_maincontent_footer_content_detail h-32 overflow-auto">
        {customerOrders.map((order) => (
          <Link to={`/HoaDon/${order.id}`} key={order.id} className="KH_content_detail_item flex w-full py-1 hover:bg-backgrond--color hover:no-underline">
            <div className="item_KH item_ordernumber w-1/5 flex justify-center">{order.id}</div>
            <div className="item_KH item_datenumber w-1/3 justify-center flex">{order.createAt ? new Date(order.createAt).toLocaleDateString() : 'N/A'}</div>
            <div className="item_KH item_total w-1/5 justify-center flex">{order.total_price} vnd</div>
            <div className="item_KH item_status w-1/3 justify-center flex">{getShippingStatus(order.status_trans)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CusHistoryOrder;
