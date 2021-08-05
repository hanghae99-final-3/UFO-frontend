import React, { useEffect } from "react";
import styled from "styled-components";

import categories from "../categories";
import BoardBox from "../Components/BoardBox";
import SearchBox from "../Components/SearchBox";

import { history } from "../redux/configureStore";

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
    useEffect(() => {
        // 선택된 카테고리가 없다면, 게시글 리스트 조회 요청에 카테고리 query string 제외
        if (selectedTag === null) {
            const postListQueryData = {
                pageSize: 10,
                pageNum: page,
            };
            dispatch(getFreeListDB(postListQueryData));
        } else {
            // 선택된 카테고리가  있다면, 게시글 리스트 조회 요청에 카테고리 query string 추가
            const postListQueryData = {
                pageSize: 10,
                pageNum: page,
                category: selectedTag,
            };
            dispatch(getFreeListDB(postListQueryData));
        }
    }, [dispatch, page, selectedTag]); // 페이지 변경, 카테고리(태그) 변화시 useEffect 실행
    //----

    // pagination 상태 값 업데이트
    const handlePage = (e, value) => {
        setPage(value);
    };
    //----

    return (
        <>
            <Title>
                <span>자유게시판</span>
                <button onClick={() => history.push("/freeboard/write")}>
                    {/* 작성하기 페이지로 이동! */}
                    작성하기
                </button>
            </Title>
            <SearchBox searchTag={categories.freeBoardTags} />
            <BoardBoxContainer>
                <BoardBox
                    postList={freeBoardPostList && freeBoardPostList}
                    preview={true}
                    page={"freeBoard"}
                />
            </BoardBoxContainer>
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage} />
            </PaginationContainer>
        </>
    );
};

const Title = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    span {
        font-size: 40px;
        color: #707070;
    }
    button {
        height: 40px;
        padding: 0 20px;
        border-radius: 10px;
    }
`;

const BoardBoxContainer = styled.div``;
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 100px;
`;

export default FreeBoard;
