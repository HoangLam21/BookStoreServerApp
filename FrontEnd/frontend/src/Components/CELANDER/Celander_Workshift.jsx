
import React, { useState } from 'react';
import './Celander.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Workshift() {
  // Sử dụng useState để lưu trữ tháng và ngày hiện tại
  const [currentDate, setCurrentDate] = useState(new Date());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    let liTag = "";
    // Tiếp tục cài đặt renderCalendar() như bạn đã làm trước đó
    // ...
    return liTag;
  }

  return (
    <div className="wrapper">
        <header>
            {/* Sử dụng state để hiển thị tên tháng */}
            <p className="current-date">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
            <div className="icons">
                <span id="prev" className="material-symbols-rounded text-primary--color text-xs" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}> <FaArrowLeft /></span>
                <span id="next" className="material-symbols-rounded text-primary--color" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}> <FaArrowRight /></span>
            </div>
        </header>
        <div className="calendar">
            <ul className="weeks">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>               
            <ul className="days">{renderCalendar()}</ul>
        </div>
     </div>
  )
}
