import React from "react";
import categories from "../categories";
import BoardComment from "../Components/BoardComment";
import SearchBox from "../Components/SearchBox";
import BoardDetail from "../Components/BoardDetail";

const UnivBoardDetail = () => {
    return (
        <>
            <SearchBox searchTag={categories.univBoardTags} page="univboard" />
            <BoardDetail page="univboard" />
            <BoardComment boardName="univboard" />
        </>
    );
};

export default UnivBoardDetail;
