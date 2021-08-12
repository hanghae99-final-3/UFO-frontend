import React from "react";
import CountDown from "../Components/CountDown/CountDown";

const Test = () => {
    return (
        <div>
            <p>standard time : 지금부터...</p>
            <p>end time : 2021년 8월 20일까지는...</p>
            <p>Left time : </p>
            <CountDown />
            {/* return{" "}
                <DateCountdown
                    dateTo="August 14, 2021 00:00:00 GMT+03:00"
                    callback={() => alert("Hello")}
                /> */}
        </div>
    );
};

export default Test;
