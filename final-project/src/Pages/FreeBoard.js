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
    const [page, setPage] = React.useState(1);
    const freeBoardPostList = useSelector(state => state.freeBoard.list);
    const selectedTags = useSelector(state => state.freeBoard.selectedTags);
    useEffect(() => {
        const postListQueryData = {
            pageSize: 10,
            pageNum: page,
        };
        dispatch(getFreeListDB(postListQueryData));
    }, [dispatch, page]);
    //----

    const handlePage = (e, value) => {
        setPage(value);
    };

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
                {selectedTags.length > 0 ? (
                    <BoardBox
                        postList={
                            freeBoardPostList &&
                            freeBoardPostList
                                .filter(post =>
                                    selectedTags.includes(post.category),
                                )
                                .slice(0, 10)
                        }
                        preview={true}
                        page="freeBoard"
                    />
                ) : (
                    <BoardBox
                        postList={
                            freeBoardPostList && freeBoardPostList.slice(0, 10)
                        }
                        preview={true}
                        page="freeBoard"
                    />
                )}
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
