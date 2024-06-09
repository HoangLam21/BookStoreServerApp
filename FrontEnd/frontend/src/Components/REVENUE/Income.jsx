import React from 'react'
import { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import IncomeData from '../../Data/JSON_DATA/customerOrder.json'
import { Link } from 'react-router-dom';
import axios from 'axios';


const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';


export default function Ịncome() {
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
  return (
    <div className="income bg-backgrond--color px-2 pt-2 h-full w-full rounded-lg text-primary--color">
                            <h4 className='text-lg'>Thu</h4>
                            <div className="income-content flex justify-around p-2 pl-0 text-header--lightcolor border-b-2">
                                <div>Mã hóa đơn</div>
                                <div>Tổng</div>
                                <div>Chi tiết</div>
                            </div>
                            <div className="income-content-detail overflow-auto w-full h-2/4 mt-4 ">
                                {orderlistdata.map((item)=>(
                                    <Link  to={`/HoaDon/${item.id}`}  key={item.id} className="income-detail flex justify-around py-2 relative hover:bg-border--color mb-4 hover:no-underline ">
                                        <div className="income-cus-ordernumber justify-center flex w-32 ">HD{item.id}</div>
                                        <div className="income-total w-32 relative left-14">{item.total_price}</div>
                                        <span className=' w-32 justify-center flex'><FaArrowRight/></span>
                                    </Link>
                                ))}
                                
                            </div>
                        </div>
  )
}
