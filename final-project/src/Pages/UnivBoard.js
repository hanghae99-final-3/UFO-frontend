import React from "react";
import UnivBoardList from './UnivBoardList'
import UnivBoardWrite from './UnivBoardWrite'

const UnivBoard = () => {
    return (
        <>
            <h1>Univ Board</h1>
            <UnivBoardWrite/>
            <UnivBoardList/>
        </>
    )
}

export default UnivBoard;
