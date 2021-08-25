import React from "react";
import categories from "../../Shared/categories";

//컴포넌트
import SearchBox from "../../Components/Board/SearchBox";
import BoardDetail from "../../Components/Board/BoardDetail";
import BoardComment from "../../Components/Board/BoardComment";
import RecommendList from "../../Components/UnivBoard/RecommendList";

/**
 * @author jiyeong && heesung
 * @param
 * @returns 자유게시판 게시물 상세페이지 뷰
 * @역할 자유게시판 게시물 상세페이지 뷰 렌더링
 * @필수값
 */

const FreeBoardDetail = () => {
    return (
        <>
            <SearchBox searchTag={categories.freeBoardTags} page="freeboard" />
            <BoardDetail page="freeboard" />
            <BoardComment boardName="freeboard" />
            <RecommendList />
        </>
    );
};

export default FreeBoardDetail;