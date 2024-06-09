import React from 'react';
import { useState, useEffect} from 'react';
import { orderCustomerData } from "../Data/orderCustomerData";
import { orderStockData } from "../Data/orderStockData";
import { FaArrowRight } from "react-icons/fa6";
import classNames from 'classnames';
import './scrollbar.css';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';
const IMPORTALL_URL = 'http://167.172.69.8:8010/BookStore/import/all';
const linkClass =
	' font-light hover:bg-backgroud--lightcolor  hover:no-underline active:bg-neutral-600  rounded-sm text-base text-primary--color'


export default function Orderbar() {
  
  return (
    <div className='flex flex-col w-80 p-3 gap-4 hidden lg:flex'>
    <div className='flex justify-start items-center border-b border-border--lightcolor'>
        <label className=' text-header--lightcolor text-base '>Danh sách nhập hàng</label>
      </div>

      <div className='flex flex-col flex-1 gap-4 overflow-auto pr-1 '>
        
        <CusOrderList />
      </div>
      <div className='flex justify-center items-center border-b border-border--lightcolor'>
        <label className=' text-header--lightcolor text-base'>Danh sách đơn hàng của khách hàng</label>
      </div>
      <div className='flex flex-col flex-1 gap-4 overflow-auto '>
        <StockOrderList />
      </div>
    </div>
  );
}

  

function CusOrderList() {
  const [orderlistdata, setOrderListData] = useState([]);

  useEffect (() =>{

    const fetchUserData = async () =>{
        const token = localStorage.getItem('token');

        if(!token){
            console.error('No token found, please log in.');
            return
        }

        try{
            const response = await axios.get(ORDERALL_URL,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = response.data.result;
            setOrderListData(result);
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


  function ShippingStatus(ordstatus){
    let status = "";
    if(ordstatus===0){
        status="Chờ xác nhận"
    }
    if(ordstatus===1){
        status="Đã xác nhận"
    }
    if(ordstatus===2){
        status="Đã thanh toán"
    }
    if(ordstatus===3){
        status="Đang chuẩn bị hàng"
    }
    if(ordstatus===4){
        status="Đang giao hàng"
    }
    if(ordstatus===5){
      status="Đã giao hàng"
    }
    return status
  }

  return (
    <div className='ordercus-list z-9 '>
      {orderlistdata.map((item) => (
        <Link to={`/admin/HoaDon/${item.id}`} key={item.id} className={classNames('py-2 text-primary--color text-xs',linkClass)} >
          <div className='flex gap-2 cursor-pointer border border-solid border-border--color rounded-md p-1'>

            <div className='flex justify-center items-center border border-solid  rounded-md w-20'>
              {item.id}
            </div>

            <div className='flex flex-col '>
              <div className='flex gap-1 whitespace-nowrap'>
                <span className='font-medium '>Ngày đặt hàng:</span> {new Date(item.createAt).toLocaleDateString()}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium whitespace-nowrap '>Trạng thái:</span>{ShippingStatus(item.status_trans)}
              </div>
              <div className='flex gap-1  whitespace-nowrap'>
                <span className='font-medium'>Người tạo:</span> {item.createBy}
              </div>
            </div>
            <span className='text-xl items-center justify-end flex'><FaArrowRight/></span>
          </div>
        </Link>
      ))}
    </div>
  );
}


function StockOrderList() {
  
  const [importlist, setImportListData] = useState([]);

  useEffect(() => {

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found, please log in.');
            return;
        }

        try {
            const response = await axios.get(IMPORTALL_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = response.data.result;
            setImportListData(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    fetchUserData();
}, []);

   
function ShippingStatus(bookstatus) {
  if(bookstatus){
  return "Đã xác nhận";
}
else{
  return "Chờ xác nhận";
}
}
  return (
    <div className='orderstock-list'>
      {importlist.map((item) => (
        <Link to={`/admin/DonHang/${item.id}`}  key={item.id} className={classNames('py-2 text-primary--color text-xs',linkClass)}>
          <div className='flex gap-2 cursor-pointer border border-solid border-border--color rounded-md p-1'>

            <div className='flex justify-center items-center border border-red-500 border-solid rounded-md w-20'>
              {item.id}
            </div>

            <div className='flex flex-col '>
              <div className='flex gap-1'>
                <span className='font-medium '>Ngày đặt hàng:</span>  {item.createAt ? new Date(item.createAt).toLocaleDateString() : 'N/A'}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Trạng thái:</span>  {ShippingStatus(item.import_status)}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Người tạo:</span> {item.createBy}
              </div>
            </div>
            <span className='text-xl items-center justify-center flex'><FaArrowRight/></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
