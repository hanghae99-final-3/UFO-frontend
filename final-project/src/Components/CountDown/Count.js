import React from "react";
import Clock from "./Clock";
const Count = () => {
    let deadline = "August, 20, 2021";

    return (
        <div className="App">
            <Clock deadline={deadline} />
        </div>
    );
};

export default Count;
