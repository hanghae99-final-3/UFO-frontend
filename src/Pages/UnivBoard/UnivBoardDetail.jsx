import React from "react";

//컴포넌트
import BoardComment from "../../Components/Board/BoardComment";

import BoardDetail from "../../Components/Board/BoardDetail";
import RecommendList from "../../Components/UnivBoard/RecommendList";

const UnivBoardDetail = () => {
    return (
        <>
            {/* <SearchBox
                // deactivateSearch={true}
                searchTag={categories.univBoardTags}
                page="univboard"
            /> */}
            <BoardDetail page="univboard" />
            <BoardComment boardName="univboard" />
            <RecommendList />
        </>
    );
};

export default UnivBoardDetail;
