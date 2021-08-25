import React from "react";
import Clock from "./Clock";
const Count = ({ deadline }) => {
    return (
        <>
            <Clock deadline={deadline} />
        </>
    );
};

export default Count;
