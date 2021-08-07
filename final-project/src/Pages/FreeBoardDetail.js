import React from "react";

import categories from "../categories";

import SearchBox from "../Components/SearchBox";
import BoardDetail from "../Components/BoardDetail";
import BoardComment from "../Components/BoardComment";

/**
 * @author kwonjiyeong && heesung
 * @param
 * @returns 자유게시판 게시물 상세페이지 뷰
 * @역할 자유게시판 게시물 상세페이지 뷰 렌더링
 * @필수값
 */

const FreeBoardDetail = props => {
    return (
        <>
            <SearchBox searchTag={categories.freeBoardTags} page="freeboard" />
            <BoardDetail page="freeboard" />
            <BoardComment boardName="freeboard" />
        </>
    );
};

export default FreeBoardDetail;
