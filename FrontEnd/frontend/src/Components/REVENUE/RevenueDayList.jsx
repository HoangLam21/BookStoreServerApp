import React from 'react'
import axios from 'axios';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const REVENUEDAYALL_URL = 'http://167.172.69.8:8010/BookStore/revenue/day/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxOTI5MiwiaWF0IjoxNzE3NDA4NDkyLCJzY29wZSI6IkNVU1RPTUVSIENBTkNMRV9PUkRFUiBHRVRfTVlfUEFZTUVOVFMgR0VUX01ZX0JPT0tTIENSRUFURV9PUkRFUiBTVEFGRiBWRVJJRllfT1JERVIgSU1QT1JUX1dPUktfRklORCBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIEdFVF9QQVlNRU5UX0lORk9TIElNUE9SVF9XT1JLX0NSRUFURSBJTVBPUlRfV09SS19ERUxFVEUgQURNSU4gQURNSU5fTUFOQUdFIn0.wFHRvVmO9WpZsJOUwHxF-iTTb0_jCa_vuTomSTZkPTU';



export default function RevenueDayList({filteredRevenueDayList}) {
    const [revenuedaylist, setRevenueDayListData] = useState([]);
    
    useEffect (() =>{

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(REVENUEDAYALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setRevenueDayListData(result);
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
    <div className="KH_maincontent_footer_content w-full h-80 text-primary--color overflow-auto rounded-lg shadow md:overflow-auto">
                <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%]">
                    <table className="w-full">
                        <thead className="text-primary--color whitespace-nowrap">
                            <tr>
                                <th className='w-1/5 text-center'>Ngày</th>
                                <th className='w-1/3 text-center'>Tổng bán</th>
                                <th className='w-2/12 text-center'>Tổng nhập</th>
                                <th className='w-1/3 text-center'>Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody className="KH_maincontent_footer_content_detail divide-y">
                            {revenuedaylist.map((item) => {
                                return(
                                    <tr key={item.id} className="hover:bg-backgrond--color hover:no-underline shadow py-2">
                                    <td className="w-1/3 text-center">{item.day}</td>
                                    <td className="w-1/5 text-center">{item.total_sale}</td>
                                    <td className="w-1/3 text-center">{item.total_import}</td>
                                    <td className="w-1/3 text-center">{item.revenue}</td>
                                </tr>
                                )
                                
                            })}
                        </tbody>
                    </table>
                </div>
    </div>
  )
}
