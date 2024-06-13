import React from 'react'
import OutcomeData from '../../Data/JSON_DATA/outcomeData.json'
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const BOOKALL_URL = 'http://167.172.69.8:8010/BookStore/book/all';

export default function BookItem() {
    const [booklistdata, setBookListData] = useState([]);
    useEffect (() =>{
        //localStorage.setItem('token', token);

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(BOOKALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setBookListData(result);
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
                                <h4 className='text-lg'>Danh sách sản phẩm</h4>
                                <div className="income-content flex justify-around py-2 mb-2 relative text-header--lightcolor border-b-2">
                                <div className='justify-start flex w-32 whitespace-nowrap'>Mã sản phẩm</div>
                                <div lassName=" outcome-total  w-44 ">Tên sản phẩm</div>
                                <div className="outcome-cus-ordernumber  justify-center flex w-32">Giá</div>
                            </div>
                                <div className="income-content-detail overflow-auto w-full h-2/4 mt-2 text-sm">
                                    {booklistdata.map((item)=>(
                                        <Link to={`/manage/detailBook/${item.id}`}  key={item.id} className="  income-detail flex justify-around py-2 mb-2 relative hover:bg-border--color gap-4 hover:no-underline">
                                            <div className="outcome-cus-ordernumber  flex w-32 justify-center">SP{item.id}</div>
                                            <div className=" outcome-total  w-44 justify-center flex">{item.title}</div>
                                            <div className="outcome-cus-ordernumber  justify-center flex w-32 ">{item.price}vnd</div>

                                        </Link>
                                    ))}
                                    
                                </div>
                            </div>
      )
}
