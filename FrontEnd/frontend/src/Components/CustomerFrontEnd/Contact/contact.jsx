import React, { useState, useEffect,useContext } from 'react';
import { Link } from "react-router-dom";
import './contact.css'
import bgOrder from "../../Assets/www.reallygreatsite.com1.png"
import ChattingContent from "./chat";
import { AuthContext } from '../../context/AuthContext';



export default function Contact(){
  const { token } = useContext(AuthContext);


    return (
        <div className="bg-color-background-main ">
        <img className="m-auto h-52 max-h-full max-w-full"  src={bgOrder} alt=""/>
        <div>
        <div>
          <div className="flex ml-20">
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/">
                <span className="hover:underline hover:tracking-wider">Home</span>
              </Link>
            </div>
            <span className="text-color-main-2 text-xl mr-3"> / </span>
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/contact">
                <span className="hover:underline hover:tracking-wider">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
        <div className="main grid grid-cols-2 gap-x-3 mt-10 pb-10 justify-between">
       

            <div className="ttlh mx-auto ">
                <h6 className="text-color-main text-3xl font-garamond font-light">Thông tin liên hệ</h6>
                <div className="grid grid-cols-2 gap-x-3 w-80 mt-6">
                    <div>
                        <p className="text-color-main text-xl font-garamond font-light">Hotline</p>
                        <p className="text-color-main text-l font-garamond font-light">+84 348775966</p>
                    </div>
                    <div>
                        <button className="w-full bg-color-main-2 hover:bg-color-main h-9 border rounded-md text-white active font-garamond text-1xl font-light">Gọi ngay</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 w-80 mt-6">
                    <div>
                        <p className="text-color-main text-xl font-garamond font-light">Email</p>
                        <p className="text-color-main text-l font-garamond font-light">bookstore@gmail.com</p>
                    </div>
                    <div>
                        <button className="w-full bg-color-main-2 hover:bg-color-main h-9 border rounded-md text-white active font-garamond text-1xl font-ligh">Gửi Email</button>
                    </div>
                </div>
            </div>
            <div className="chatwithus mx-auto">
            <h6 className="text-color-main text-3xl font-garamond font-light mb-3">Chat cùng chúng mình</h6>
            <ChattingContent token={token} />
                </div>
        </div>
        </div>
    )
}
