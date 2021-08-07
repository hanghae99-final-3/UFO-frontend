import React, { useEffect } from "react";
import styled from "styled-components";

import categories from "../categories";
import BoardBox from "../Components/BoardBox";
import SearchBox from "../Components/SearchBox";
import Pagination from "@material-ui/lab/Pagination";
import { getFreeListDB } from "../redux/async/freeBoard";
import { useDispatch, useSelector } from "react-redux";

/**
 * @author kwonjiyeong & heesung
 * @param 없음
 * @returns 자유게시판 뷰
 * @역할 자유게시판 뷰 렌더링, 자유게시판 CRUD 기능 중 R
 * @필수값 없음
 */
const FreeBoard = () => {
    //----자유게시판 목록 불러와서 list에 저장하기
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1); // pagination의  현재 페이지 값 설정
    const freeBoardPostList = useSelector(state => state.freeBoard.list); // 자유 게시판 게시글 구독
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    ); // 현재 선택된 국가 코드

    useEffect(() => {
        // 선택된 카테고리가 없다면, 게시글 리스트 조회 요청에 카테고리 query string 제외
        // 선택된 카테고리가  있다면, 게시글 리스트 조회 요청에 카테고리 query string 추가

        // 선택된 국가 없다면, 게시글 리스트 조회 요청에  국가 코드 query string 제외
        // 선택된 국가 있다면, 게시글 리스트 조회 요청에  국가 코드 query string 추가
        const postListQueryData = {
            pageSize: 10,
            pageNum: page,
            category: selectedTag === null ? undefined : selectedTag,
            country_id: selectedCountry === 0 ? undefined : selectedCountry,
        };
        dispatch(getFreeListDB(postListQueryData));
    }, [dispatch, page, selectedTag, selectedCountry]);
    //----

    // pagination 상태 값 업데이트
    const handlePage = (e, value) => {
        setPage(value);
    };
    //----

    return (
        <>
            <SearchBox searchTag={categories.freeBoardTags} page="freeboard" />
            <BoardBox
                postList={freeBoardPostList && freeBoardPostList}
                preview={true}
                boardName="freeBoard"
            />
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage} />
            </PaginationContainer>
        </>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 100px;
`;

export default FreeBoard;
