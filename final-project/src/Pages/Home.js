import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { getFreeListDB, getIssuePostListDB } from "../redux/async/freeBoard";
import { getMainSearchResult } from "../redux/async/search";
import BoardBox from "../Components/BoardBox";
import { getUnivBoardDB } from "../redux/async/univBoard";
import categories from "../categories";
import MainSlider from "../Components/MainSlider";
import MainSearch from "../Elements/MainSearch";

const Home = () => {
    const dispatch = useDispatch();
    // 자유 게시판 게시물 리덕스 스토어 구독
    const freeBoardPostList = useSelector(state => state.freeBoard.list);
    // 자유 게시판 인기 게시글 리스트 스토어 구독
    const freeBoardIssuePostList = useSelector(
        state => state.freeBoard.issueList,
    );

    // 학교 게시판 게시물 리덕스 스토어 구독
    const univBoardPostList = useSelector(state => state.univBoard.list);
    // 공지 게시글
    const announcement = useSelector(state => state.univBoard.fixedList);
    // 로그인 유저
    const univId = useSelector(state => state.user?.user?.univ_id);
    // 로그인 유무
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    // 유저가 선택한 국가 페이지
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    );

    //자유 게시판 요청 쿼리 데이터
    const postListQueryData = {
        pageSize: 200,
        pageNum: 1,
    };
    // 학교 게시판 요청 쿼리 데이터
    const UnivListQueryData = {
        pageSize: 200,
        pageNum: 1,
        univ_id: univId,
    };

    useEffect(() => {
        dispatch(getFreeListDB(postListQueryData)); // 자유 게시판 디스페치
        dispatch(getIssuePostListDB()); // 인기 게시글 리스트 디스패치
        // 유저에게 등록된 univId가 있다면 대학 게시판 게시글 조회 요청
        if (isLoggedIn && univId) {
            dispatch(getUnivBoardDB(UnivListQueryData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, univId]);

    return (
        <HomeContainer>
            {/* 메인 검색창 */}
            <MainSearch />
            {/* 인기 게시글 슬라이더 불러오기*/}
            <MainSlider
                postList={
                    freeBoardIssuePostList && freeBoardIssuePostList.slice(0, 5)
                }
            />

            <BoardContainer>
                {/* 학교 게시판 불러오기*/}
                <BoardBox
                    title="학교 게시판"
                    fixedList={announcement && announcement.slice(0, 2)}
                    postList={
                        univBoardPostList && univBoardPostList.slice(0, 6)
                    }
                    boardName="univboard"
                />
                {/* 자유 게시판 불러오기*/}
                {selectedCountry === 0 ? (
                    /* country ==== 0 , 즉 전체 선택의 경우 
                    필터하지 않은 포스트를 props로 전달한다.*/
                    <BoardBox
                        title="자유 게시판"
                        postList={
                            freeBoardPostList && freeBoardPostList.slice(0, 8)
                        }
                        boardName="freeboard"
                    />
                ) : (
                    /*  유저가 특정 국가를 선택했을 경우, 자유 게시판을 
                    해당 국의 게시글로 필터링하여 props로 전달한다.*/
                    <BoardBox
                        title="자유 게시판"
                        postList={
                            freeBoardPostList &&
                            freeBoardPostList
                                .filter(
                                    post => post.country_id === selectedCountry,
                                )
                                .slice(0, 10)
                        }
                        boardName="freeboard"
                    />
                )}

                {/* 카테고리별 게시판 불러오기*/}
                {freeBoardPostList &&
                    /*자유 게시판의 게시글들을 카테고리별로 map을 돌려서
                     Boarder Box를 랜러딩. tag props로 카테고리의 이름을 전달한다.
                     특정 국가 선택이 되어있지 않은 경우, 전체 게시글 props로 전달.*/
                    categories.freeCategory.map((category, idx) => {
                        if (selectedCountry === 0) {
                            return (
                                <BoardBox
                                    key={idx}
                                    tag={category}
                                    postList={freeBoardPostList
                                        .filter(
                                            post =>
                                                post.category ===
                                                category.categoryId,
                                        )
                                        .slice(0, 8)}
                                    boardName="freeboard"
                                />
                            );
                        } else {
                            /* 특정 국가가 선택되어 있는 경우, 해당 국가의 게시글로 
                            필러팅하여 props로 게시글 리스트를 전달하여 준다.*/
                            return (
                                <BoardBox
                                    key={idx}
                                    tag={category.categoryName}
                                    boardName="freeboard"
                                    postList={freeBoardPostList
                                        .filter(
                                            post =>
                                                post.category ===
                                                    category.categoryId &&
                                                post.country_id ===
                                                    selectedCountry,
                                        )
                                        .slice(0, 8)}
                                />
                            );
                        }
                    })}
                {/* 카테고리가 홀수이면 div를 스페어로 넣는다. */}
                {categories.freeCategory.length % 2 !== 0 && (
                    <SpareBox></SpareBox>
                )}
            </BoardContainer>
        </HomeContainer>
    );
};

const HomeContainer = styled.div``;

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;

    > div {
        background: #fff;
        padding: 20px;
        width: 510px;
    }
`;

const SpareBox = styled.div`
    text-align: center;
    img {
        width: 50%;
    }
`;

export default Home;
