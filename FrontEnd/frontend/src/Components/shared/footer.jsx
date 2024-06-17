import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Book Store.png";



export default function Footer(){
    return (
        <div style={{background:'#f6f5f4'}} className="relative bottom-0 left-0 right-0 w-full h-auto ">
            <div className="lg:grid grid-cols-5 gap-x-3">
            <div className="mt-10">
            <img src={Logo} alt=""></img>
            </div>
            <div className="part mt-7">
            <p></p>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/home"><span className="hover:text-color-main hover:tracking-[.015rem]">Home</span></Link>
            </div>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/aboutUs">
                <span className="hover:text-color-main hover:tracking-[.015rem]">About Us</span></Link>
            </div>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/discount"><span className="hover:text-color-main hover:tracking-[.015rem]">Discount</span></Link>
            </div>
            
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/books">
                <span className="hover:text-color-main hover:tracking-[.015rem]">Books</span></Link>
            </div>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/recruitment">
                <span className="hover:text-color-main hover:tracking-[.015rem]">Recruitment</span></Link>
            </div>
        </div>
        <div className="part mt-7 w-56">
        <p className="font-garamond w-28 text-2xl font-semibold mr-6 text-color-main">Cửa hàng</p>
        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Chi nhánh 1 </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh </p>
        </div> 
        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Chi nhánh 2 </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">Khu phố 6, Phường Linh Trung, TP. Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam </p>
        </div> 
        </div>
        <div className="part mt-7">
        <p className="font-garamond text-2xl font-semibold mr-6 text-color-main">Liên hệ</p>
        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Hotline: </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">0987654321 </p>
        </div>        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Email for customer </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">customerBookStore@gmail.com</p>
        </div>
        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Email for business </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">bussinessBookStore@gmail.com </p>
        </div>
        <div>
        <p style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6">Email for recruitment </p>
        <p style={{ color: '#513820' }} className="active font-garamond text-l mb-3 font-semibold mr-6">recruitmentBookStore@gmail.com </p>
        </div>

            
        </div>
        <div className="part mt-7">
        <p className="font-garamond text-2xl font-semibold mr-6 text-color-main">Hỗ trợ</p>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/contact">
                <span className="hover:text-color-main hover:tracking-[.015rem]">Contact</span></Link>
            </div>
            <div className="mb-5">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/customerCare">
                    <span className="hover:text-color-main hover:tracking-[.015rem]">Customer Care</span>
                </Link>
            </div>
        </div>
    </div>
        </div>
    )
}