import React from "react";
import categories from "../../Shared/categories";

//컴포넌트
import BoardComment from "../../Components/Board/BoardComment";
import SearchBox from "../../Components/Board/SearchBox";
import BoardDetail from "../../Components/Board/BoardDetail";

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
