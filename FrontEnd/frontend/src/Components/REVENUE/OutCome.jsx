import React from 'react'
import OutcomeData from '../../Data/JSON_DATA/outcomeData.json'
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const STOCKALL_URL = 'http://167.172.69.8:8010/BookStore/import/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';

export default function OutCome() {
    const [stocklistdata, setStockListData] = useState([]);
    useEffect (() =>{

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(STOCKALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setStockListData(result);
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
        <div className="outcome bg-backgrond--color p-2  h-full w-full rounded-lg text-primary--color">
                                <h4 className='text-lg'>Chi</h4>
                                <div className="income-content flex justify-around p-2 pl-0 text-header--lightcolor border-b-2">
                                <div>Mã đơn hàng</div>
                                <div>Tổng</div>
                                <div>Chi tiết</div>
                            </div>
                                <div className="income-content-detail overflow-auto w-full h-2/4 mt-2 ">
                                    {stocklistdata.map((item)=>(
                                        <Link to={`/DonHang/${item.id}`}  key={item.id} className="  income-detail flex justify-around py-2 mb-2 relative hover:bg-border--color gap-4 hover:no-underline">
                                            <div className="outcome-cus-ordernumber  justify-center flex w-32 ">DH{item.id}</div>
                                            <div className=" outcome-total  w-32 relative left-14">{item.import_total}</div>
                                            <span className=' w-32 justify-center flex'><FaArrowRight/></span>
                                        </Link>
                                    ))}
                                    
                                </div>
                            </div>
      )
}
