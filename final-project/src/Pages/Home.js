import React, { useEffect } from "react";
import styled from "styled-components";
import SearchBox from "../Components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getFreeListDB } from "../redux/async/freeBoard";
import BoardBox from "../Components/BoardBox";
import { getUnivBoardDB } from "../redux/async/univBoardAsync";
import categories from "../categories";

const Home = () => {
    const dispatch = useDispatch();

    //--- 자유 게시판 게시물 리덕스 스토어 구독--------
    const freeBoardPostList = useSelector(state => state.freeBoard.list);
    //----

    // 학교 게시판 게시물 리덕스 스토어 구독------------
    const univBoardPostList = useSelector(state => state.univBoard.list);
    //----

    // 자유 게시판 태그

    // 학교 게시판 / 자유 게시판 thunk dispatch--------
    useEffect(() => {
        dispatch(getFreeListDB());
        dispatch(getUnivBoardDB());
    }, []);
    //----

    return (
        <HomeContainer>
            <SearchContainer>
                <SearchBox />
            </SearchContainer>
            <BoardContainer>
                <BoardBox
                    title="인기 게시판"
                    postList={
                        freeBoardPostList && freeBoardPostList.slice(0, 5)
                    }
                />
                <BoardBox
                    title="학교 게시판"
                    postList={
                        univBoardPostList && univBoardPostList.slice(0, 5)
                    }
                />
                <BoardBox
                    title="자유 게시판"
                    postList={
                        freeBoardPostList && freeBoardPostList.slice(0, 5)
                    }
                />
                {freeBoardPostList &&
                    categories.freeCategory.map((category, idx) => {
                        return (
                            <BoardBox
                                tag={category.categoryName}
                                postList={freeBoardPostList
                                    .filter(
                                        post =>
                                            post.category ===
                                            category.categoryId,
                                    )
                                    .slice(0, 5)}
                            />
                        );
                    })}
            </BoardContainer>
        </HomeContainer>
    );
};

const HomeContainer = styled.div``;
const SearchContainer = styled.div`
    padding: 50px 0;
`;
const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: #d2d2d2;
    gap: 2px;
    margin: 20px 0;
    border: 2px solid #d2d2d2;
    > div {
        background: #fff;
        padding: 50px;
    }
    > div:nth-child(3) {
        grid-column: 1/-1;
    }
`;

export default Home;
