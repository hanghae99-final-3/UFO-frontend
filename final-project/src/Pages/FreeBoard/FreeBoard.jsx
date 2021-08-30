import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../Redux/configureStore";

//통신
import { freeBoardApi } from "../../Shared/api";
import { getFreeListDB } from "../../Redux/Async/freeBoard";

//머테리얼 ui
import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

//컴포넌트
import BoardBox from "../../Components/Board/BoardBox";
import SearchBox from "../../Components/Board/SearchBox";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import InfinityScroll from "../../Components/Shared/InfinityScroll";

import { infinityPostCall } from "../../Redux/Modules/freeBoardSlice";

/**
 * @author kwonjiyeong & heesung
 * @param 없음
 * @returns 자유게시판 뷰
 * @역할 자유게시판 뷰 렌더링, 자유게시판 CRUD 기능 중 R
 * @필수값 없음
 */

const useStyles = makeStyles(theme => ({
    root: {
        svg: {
            backgroundColor: "none",
        },
        "& > *": {
            color: "#292B2D",
            marginTop: "60px",
        },
        "& .MuiPaginationItem-icon": {
            backgroundColor: "#AFB1FF",
            borderRadius: "20px",
        },

        "& .Mui-selected": {
            border: "3px solid #bcffe2",
            borderRadius: "20px",
            backgroundColor: "white",
            color: "#292B2D",
        },
        "& .MuiButtonBase-root ": {
            color: "#292B2D",
        },
    },
}));

const FreeBoard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false; // 데스크탑 미디어 쿼리 값
    let freeBoardPostList = useSelector(state => state.freeBoard.list); // 자유 게시판 게시글 구독
    const [page, setPage] = useState(1); // pagination의  현재 페이지 값 설정
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    const freeBoardTotalPage = useSelector(state => state.freeBoard.pageCount); // 게시물 총 페이지

    // 현재 선택된 국가 코드
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountryId,
    );
    // 페지네시이션 (desktop)일경우 쿼리 데이터
    const postListQueryData = {
        pageSize: 10,
        pageNum: page,
        category: selectedTag === null ? undefined : selectedTag,
        country_id: selectedCountry === 0 ? undefined : selectedCountry,
    };
    // pagination 상태 값 업데이트
    const handlePage = async (e, value) => {
        const postListQueryData = {
            pageSize: 10,
            pageNum: value,
            category: selectedTag === null ? undefined : selectedTag,
            country_id: selectedCountry === 0 ? undefined : selectedCountry,
        };
        await freeBoardApi.getList(postListQueryData);
        setPage(value);
    };

    // 초기 페이지 진입시 게시물 요청
    useEffect(() => {
        dispatch(getFreeListDB(postListQueryData));
    }, [dispatch, page, selectedTag, selectedCountry]);

    // 무한 스크롤 next call 요청
    const [totalPage, setTotalPage] = useState(2); // 게시물의 총 페이지
    const [nextPage, setNextPage] = useState(1); // 다음 페이지가 있는지 확인, 만약 total page보다 작다면 무한스크롤 해제
    const [infinityPage, setInfinityPage] = useState(2); // pagination의  현재 페이지 값 설정
    const [is_Loading, setIsLoading] = useState(false); // loading 상태 값
    const [InfinitySelectedTag, setInfinitySelectedTag] = useState(0);
    // 무한스크롤 (mobile)일 경우 쿼리 데이터
    const infinityPostListQueryData = {
        pageSize: 10,
        pageNum: infinityPage,
        category: selectedTag === null ? undefined : selectedTag && selectedTag,
        country_id: selectedCountry === 0 ? undefined : selectedCountry,
    };

    // nextCall의 실행 함수
    const requestCall = async infinityPostListQueryData => {
        setIsLoading(true);
        await freeBoardApi.getList(infinityPostListQueryData).then(res => {
            if (res.data.ok && res.data.result.rows.length > 1) {
                dispatch(infinityPostCall(res.data.result.rows));
                setTotalPage(res.data.result.countPage);
                setInfinityPage(prev => prev + 1);
                setNextPage(prev => prev + 1);
            }
        });
        setIsLoading(false);
    };
    // 다음 페이지가 있다면 request함수호출
    const nextCall = async () => {
        await requestCall(infinityPostListQueryData);
    };
    // 게시물 설정 초기화시 쿼리 데이터 초기화
    const handleResetInfinity = () => {
        setTotalPage(2);
        setNextPage(1);
        setInfinityPage(2);
    };

    return (
        <>
            <Helmet>
                <title>UFO - 자유 게시판</title>
            </Helmet>
            <SearchBox
                searchTag={categories.freeBoardTags}
                page="freeboard"
                pushButton={true}
                handleResetInfinity={handleResetInfinity}
                queryData={postListQueryData}
            />
            {isDesktop ? (
                <BoardBox
                    postList={freeBoardPostList && freeBoardPostList}
                    preview={true}
                    boardName="freeboard"
                />
            ) : (
                <InfinityScroll
                    nextCall={nextCall}
                    is_next={nextPage <= totalPage ? true : false}
                    size={100}
                    is_loading={is_Loading}
                >
                    <BoardBox
                        postList={freeBoardPostList && freeBoardPostList}
                        preview={true}
                        boardName="freeboard"
                    />
                </InfinityScroll>
            )}

            {isDesktop && (
                <PaginationContainer>
                    <div className={classes.root}>
                        <Pagination
                            count={freeBoardTotalPage && freeBoardTotalPage}
                            page={page}
                            onChange={handlePage}
                        />
                    </div>
                    {isDesktop && (
                        <DefaultButton
                            onClick={() => history.push("/freeboard/write")}
                        >
                            글쓰기
                        </DefaultButton>
                    )}
                </PaginationContainer>
            )}
        </>
    );
};

const PaginationContainer = styled.div`
    .MuiPagination-ul {
        justify-content: center;

        li:first-child button,
        li:last-child button {
            background: ${({ theme }) => theme.color.blue2};
            color: ${({ theme }) => theme.color.white};
        }
        li button {
            border: 2px solid ${({ theme }) => theme.color.blue3};
            &.Mui-selected {
                border: 2px solid ${({ theme }) => theme.color.mainMint};
            }
        }
    }
    ${mixin.floatBox("relative")};
    > button {
        ${mixin.floatBox("absolute", "0", "0")}
    }
`;

export default FreeBoard;
