import React, { useState, useEffect } from 'react';
import './Celanderr.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function CelanderAdd({ onDateSelect }) {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

    const updateCalendar = () => {
        const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const adjustedCurrMonth = (currMonth + 12) % 12;

        const daysArray = [];
        for (let i = 1; i <= lastDateofMonth; i++) {
            const isToday = i === date.getDate() && adjustedCurrMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
            const isSelected = selectedDay && selectedDay.getDate() === i && selectedDay.getMonth() === currMonth && selectedDay.getFullYear() === currYear ? "selected" : "";
            daysArray.push(
                <li key={i} className={`${isToday} ${isSelected}`} onClick={() => handleDateClick(new Date(currYear, currMonth, i))}>
                    {i}
                </li>
            );
        }
        setDays(daysArray);
    };

    useEffect(() => {
        updateCalendar();
    }, [currYear, currMonth, date, selectedDay]);

    const handleDateClick = (date) => {
        onDateSelect(date);
        setSelectedDay(date);
    };

    const handleIconClick = (id) => {
        if (id === "prevv") {
            const newMonth = currMonth === 0 ? 11 : currMonth - 1;
            const newYear = currMonth === 0 ? currYear - 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        } else {
            const newMonth = currMonth === 11 ? 0 : currMonth + 1;
            const newYear = currMonth === 11 ? currYear + 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        }
    };

    return (
        <div className="wrapperr">
            <header className='flex justify-between p-4'>
                <p className="current-datee">{months[currMonth]} {currYear}</p>
                <div className="iconss">
                    <span id="prevv" className="material-symbols-rounded text-primary--color text-xs" onClick={() => handleIconClick("prevv")}> <FaArrowLeft /></span>
                    <span id="nextt" className="material-symbols-rounded text-primary--color" onClick={() => handleIconClick("nextt")}> <FaArrowRight /></span>
                </div>
            </header>
            <div className="calendarr">
                <ul className="weekss">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="dayss">
                    {days}
                </ul>
            </div>
        </div>
    );
}
