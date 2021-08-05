import React,{useState, useEffect} from "react";
import UnivBoardList from "../Components/UnivBoardList";
import UnivBoardWrite from "./UnivBoardWrite";
import { useSelector, useDispatch } from "react-redux";
const UnivBoard = () => {
    const country = useSelector(state=>state.freeBoard.selectedCountry)
    console.log('country num',country)
    return (
        <>
            <h1>{country} Univ Board</h1>
            <UnivBoardWrite />
            <UnivBoardList />
        </>
    );
};

export default UnivBoard;
