import React, { useState } from "react";
import Clock from "./Clock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Count = () => {
    const startDate = "2024-08-1514:00:00";
    const startYear = startDate ? startDate.getFullYear() : "";
    const startMonth = startDate ? startDate.getMonth() + 1 : "";
    const startDay = startDate ? startDate.getDate() : "";

    let deadline = "2021, 08, 21, 13:00";
    //let deadline = [startYear, startMonth, startDay];

    return (
        <div>
            <div>
                <p>
                    투표시작 일 : {startYear}년 {startMonth}월 {startDay}일
                    <DatePicker
                        placeholderText="투표 시작 날짜!"
                        selected={startDate}
                        // onChange={date => setStartDate(date)}
                    />
                </p>
                <p>
                    투표종료 일 :
                    <DatePicker
                        placeholderText="투표 종료 날짜!"
                        // selected={endDate}
                        // onChange={date => setendDate(date)}
                        dateFormat="yyyy / MM / dd"
                    />
                </p>
                <h3>
                    투표 시작일인 {startYear}년 {startMonth}월 {startDay}
                    일까지는...
                </h3>
            </div>
            <Clock deadline={deadline} />
        </div>
    );
};

export default Count;
