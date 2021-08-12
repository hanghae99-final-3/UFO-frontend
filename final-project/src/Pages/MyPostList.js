import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { userApi } from "../api";
import BoardBox from "../Components/BoardBox";
import MyFreePost from "../Components/MyFreePost";
import MyUnivPost from "../Components/MyUnivPost";

const MyPostList = props => {
    const [viewFreeUniv, setViewFreeUniv] = useState("free");

    const toFreeBoard = () => {
        setViewFreeUniv("free");
    };
    const toUnivBoard = () => {
        setViewFreeUniv("univ");
    };
    return (
        <React.Fragment>
            <Button onClick={toFreeBoard}>자유 게시판</Button>
            <Button onClick={toUnivBoard}>대학 게시판</Button>
            {viewFreeUniv === "free" ? <MyFreePost /> : <MyUnivPost />}
        </React.Fragment>
    );
};

export default MyPostList;
