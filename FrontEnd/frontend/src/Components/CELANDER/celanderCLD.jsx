
import React, { useState, useEffect } from 'react';
import './Celander.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function CelanderMain() {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

    useEffect(() => {
        const renderCalendar = () => {
            const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
            const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
            const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
            const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

            const adjustedCurrMonth = (currMonth + 12) % 12; // Đảm bảo giá trị currMonth nằm trong khoảng từ 0 đến 11

            const currentDateElement = document.querySelector(".current-date");
            const daysTag = document.querySelector(".days");

            let liTag = "";
            for (let i = firstDayofMonth; i > 0; i--) {
                liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
            }
            for (let i = 1; i <= lastDateofMonth; i++) {
                const isToday = i === date.getDate() && adjustedCurrMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
                liTag += `<li class="${isToday}">${i}</li>`;
            }
            for (let i = lastDayofMonth; i < 6; i++) {
                liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
            }
            currentDateElement.innerText = `${months[adjustedCurrMonth]} ${currYear}`;
            daysTag.innerHTML = liTag;
        }

        renderCalendar();
    }, [currYear, currMonth, date]);

    const handleIconClick = (id) => {
        if (id === "prev") {
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
        <div className="wrapper text-xs bg-primary--color">
            <header>
                <p className="current-date "></p>
                <div className="icons">
                    <span id="prev" className="material-symbols-rounded text-primary--color" onClick={() => handleIconClick("prev")}> <FaArrowLeft /></span>
                    <span id="next" className="material-symbols-rounded text-primary--color" onClick={() => handleIconClick("next")}> <FaArrowRight /></span>
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
                <ul className="days"></ul>
            </div>
        </div>
    );
}
