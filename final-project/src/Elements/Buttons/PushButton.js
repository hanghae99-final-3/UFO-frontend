import React from "react";
import "./PushButton.css";

const PushButton = ({ onClick }) => {
    return (
        <button className="pushable" onClick={onClick}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">작성하기 </span>
        </button>
    );
};

export default PushButton;
