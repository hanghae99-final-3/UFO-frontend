import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUnivBoardDB } from "../redux/async/univBoard";

import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import SearchBox from "../Components/SearchBox";
import categories from "../categories";
import BoardBox from "../Components/BoardBox";
import { withRouter } from "react-router-dom";
import { history } from "../redux/configureStore";

const UnivBoard = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1); // pagination 현재 페이지 값
    const univId = useSelector(state => state.user?.user?.univ_id); // 로그인의 인증 대학교 아이디
    const UnivPostList = useSelector(state => state.univBoard.list); // 대학교 게시판 게시글
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독

    // 현재 페이지가 변하면 useEffect 발동, 다음 페이지 대학 게시글 요청
    useEffect(() => {
        // 유저가 대학교 아이디 값을 가지고 있을 경우에만 실행
        if (univId) {
            if (selectedTag === null) {
                const univBoardQueryDB = {
                    pageSize: 10,
                    pageNum: page,
                    univ_id: univId,
                };
                dispatch(getUnivBoardDB(univBoardQueryDB));
            } else {
                const univBoardQueryDB = {
                    pageSize: 10,
                    pageNum: page,
                    univ_id: univId,
                    category: selectedTag,
                };
                dispatch(getUnivBoardDB(univBoardQueryDB));
            }
        }
    }, [dispatch, page, univId, selectedTag]);

    // 페이지 이동 이벤트 핸들링
    const handlePage = (e, value) => {
        setPage(value);
    };

    return (
        <>
            <SearchBox searchTag={categories.univBoardTags} page="univboard" />
            <BoardContentContainer>
                <BoardBox
                    postList={UnivPostList && UnivPostList}
                    preview={true}
                    boardName="univboard"
                />
            </BoardContentContainer>
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage} />
            </PaginationContainer>
        </>
    );
};

const Title = styled.div`
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

const BoardContentContainer = styled.div`
    width: 100%;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 100px;
`;

export default withRouter(UnivBoard);
