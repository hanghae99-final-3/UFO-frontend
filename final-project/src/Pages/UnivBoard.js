import React from "react";
import { withRouter } from "react-router-dom";
import UnivBoardList from "../Components/UnivBoardList";
import UnivBoardWrite from "./UnivBoardWrite";
const UnivBoard = () => {
    return (
        <>
            <h1>Univ Board</h1>
            <UnivBoardWrite />
            <UnivBoardList />
        </>
    );
};

export default withRouter(UnivBoard);
