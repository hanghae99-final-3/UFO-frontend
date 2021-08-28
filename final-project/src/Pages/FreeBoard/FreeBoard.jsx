import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../Redux/configureStore";

//통신
import instance, { freeBoardApi } from "../../Shared/api";
import {
    getFreeListDB,
    getFreeListDBInfinity,
} from "../../Redux/Async/freeBoard";

//머테리얼 ui
import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

//컴포넌트
import BoardBox from "../../Components/Board/BoardBox";
import SearchBox from "../../Components/Board/SearchBox";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import InfinityScroll from "../../Components/Shared/InfinityScroll";
import axios from "axios";
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
    const isLoading = useSelector(state => state.isFetching);
    const [page, setPage] = useState(1); // pagination의  현재 페이지 값 설정
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    const freeBoardTotalPage = useSelector(state => state.freeBoard.pageCount); // 게시물 총 페이지

    // 현재 선택된 국가 코드
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountryId,
    );

    const postListQueryData = {
        pageSize: 10,
        pageNum: page,
        category: selectedTag === null ? undefined : selectedTag,
        country_id: selectedCountry === 0 ? undefined : selectedCountry,
    };

    useEffect(() => {
        dispatch(getFreeListDB(postListQueryData));
    }, [dispatch, page, selectedTag, selectedCountry]);

    // 무한 스크롤 next call 요청
    const [totalPage, setTotalPage] = useState(2);
    const [nextPage, setNextPage] = useState(1); // 다음 페이지가 있는지 확인, 만약 total page보다 작다면 무한스크롤 해제
    const [infinityPage, setInfinityPage] = useState(2); // pagination의  현재 페이지 값 설정
    const [is_Loading, setIsLoading] = useState(false); // loading 상태 값

    const infinityPostListQueryData = {
        pageSize: 10,
        pageNum: infinityPage,
        category: selectedTag === null ? undefined : selectedTag,
        country_id: selectedCountry === 0 ? undefined : selectedCountry,
    };

    const requestCall = async () => {
        const infinityPostListQueryData = {
            pageSize: 10,
            pageNum: infinityPage,
            category: selectedTag === null ? undefined : selectedTag,
            country_id: selectedCountry === 0 ? undefined : selectedCountry,
        };
        setIsLoading(true);
        await freeBoardApi.getList(infinityPostListQueryData).then(res => {
            if (res.data.ok) {
                dispatch(infinityPostCall(res.data.result.rows));
                setTotalPage(res.data.result.countPage);
                setInfinityPage(infinityPage + 1);
                setNextPage(prev => prev + 1);
            }
        });
        setIsLoading(false);
    };

    const nextCall = () => {
        requestCall(infinityPostListQueryData);
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

    return (
        <>
            {console.log(infinityPage)}
            <Helmet>
                <title>UFO - 자유 게시판</title>
            </Helmet>
            <SearchBox
                searchTag={categories.freeBoardTags}
                page="freeboard"
                pushButton={true}
                setTotalPage={setTotalPage}
                setNextPage={setNextPage}
                setInfinityPage={setInfinityPage}
                setIsLoading={setIsLoading}
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
            border: 2px solid ${({ theme }) => theme.color.blue2};
            &.Mui-selected {
                border: 2px solid #bcffe2;
            }
        }
    }
    ${mixin.floatBox("relative")};
    > button {
        ${mixin.floatBox("absolute", "0", "0")}
    }
`;

export default FreeBoard;
