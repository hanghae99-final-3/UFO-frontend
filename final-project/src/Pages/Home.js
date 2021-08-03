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

    // 자유 게시판 게시물 리덕스 스토어 구독--------
    const freeBoardPostList = useSelector(state => state.freeBoard.list);
    //----

    // 학교 게시판 게시물 리덕스 스토어 구독------------
    const univBoardPostList = useSelector(state => state.univBoard.list);
    //----

    // 유저가 선택한 국가 페이지-------------------------
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    );

    // 학교 게시판 / 자유 게시판 thunk dispatch--------
    useEffect(() => {
        dispatch(getFreeListDB());
        dispatch(getUnivBoardDB());
    }, [dispatch]);
    //----

    return (
        <HomeContainer>
            <SearchContainer>
                <SearchBox />
            </SearchContainer>
            <BoardContainer>
                {/* 인기 게시판 불러오기*/}
                <BoardBox
                    title="인기 게시판"
                    postList={
                        freeBoardPostList && freeBoardPostList.slice(0, 5)
                    }
                />
                {/* 학교 게시판 불러오기*/}
                <BoardBox
                    title="학교 게시판"
                    postList={
                        univBoardPostList && univBoardPostList.slice(0, 5)
                    }
                />
                {/* 자유 게시판 불러오기*/}
                {selectedCountry === 0 ? (
                    // country ==== 0 , 즉 전체 선택의 경우 필터하지 않은 포스트를 props로 전달한다.
                    <BoardBox
                        title="자유 게시판"
                        postList={
                            freeBoardPostList && freeBoardPostList.slice(0, 5)
                        }
                    />
                ) : (
                    //  유저가 특정 국가를 선택했을 경우, 자유 게시판을 해당 국의 게시글로 필터링하여 props로 전달한다.
                    <BoardBox
                        title="자유 게시판"
                        postList={
                            freeBoardPostList &&
                            freeBoardPostList.filter(
                                post => post.country_id === selectedCountry,
                            )
                        }
                    />
                )}
                {/* 카테고리별 게시판 불러오기*/}
                {freeBoardPostList &&
                    // 자유 게시판의 게시글들을 카테고리별로 map을 돌려서 Boarder Box를 랜러딩. tag props로 카테고리의 이름을 전달한다.
                    categories.freeCategoryForMainPage.map((category, idx) => {
                        if (selectedCountry === 0) {
                            // 특정 국가 선택이 되어있지 않은 경우, 전체 게시글 props로 전달.
                            return (
                                <BoardBox
                                    key={idx}
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
                        } else {
                            // 특정 국가가 선택되어 있는 경우, 해당 국가의 게시글로 필러팅하여 props로 게시글 리스트를 전달하여 준다.
                            return (
                                <BoardBox
                                    key={idx}
                                    tag={category.categoryName}
                                    postList={freeBoardPostList
                                        .filter(
                                            post =>
                                                post.category ===
                                                    category.categoryId &&
                                                post.country_id ===
                                                    selectedCountry,
                                        )
                                        .slice(0, 5)}
                                />
                            );
                        }
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
