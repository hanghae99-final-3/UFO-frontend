import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import categories from "../../Shared/categories";
import { withRouter } from "react-router-dom";
import { history } from "../../Redux/configureStore";

//통신
import { getUnivBoardDB } from "../../Redux/Async/univBoard";

//머테리얼 ui
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { MuiTheme } from "../../Styles/MuiTheme";

//컴포넌트
import SearchBox from "../../Components/Board/SearchBox";
import BoardBox from "../../Components/Board/BoardBox";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import { univBoardApi } from "../../Shared/api";
import { infinityPostCall } from "../../Redux/Modules/univBoardSlice";
import InfinityScroll from "../../Components/Shared/InfinityScroll";

const useStyles = makeStyles(theme => ({
    root: {
        svg: {
            backgroundColor: "none",
        },
        "& > *": {
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
        },
    },
}));

const UnivBoard = () => {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
    const classes = useStyles();
    const [page, setPage] = useState(1); // pagination 현재 페이지 값
    const univId = useSelector(state => state.user?.user?.univ_id); // 로그인의 인증 대학교 아이디
    const UnivPostList = useSelector(state => state.univBoard.list); // 대학교 게시판 게시글
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    const totalUnivPage = useSelector(state => state.univBoard.pageCount); // 총 대학 게시판 게시글 페이지 수
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false; // 데스크탑 미디어 쿼리 값
    const announcement = useSelector(state => state.univBoard.fixedList);

    // 현재 페이지가 변하면 useEffect 발동, 다음 페이지 대학 게시글 요청
    const univBoardQueryDB = {
        pageSize: 10,
        pageNum: page,
        univ_id: univId,
        category: selectedTag === null ? undefined : selectedTag,
    };

    // 페이지 이동 이벤트 핸들링
    const handlePage = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        // 유저가 대학교 아이디 값을 가지고 있을 경우에만 실행
        if (univId) {
            dispatch(getUnivBoardDB(univBoardQueryDB));
        }
    }, [dispatch, page, univId, selectedTag]);

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
        univ_id: univId,
        category: selectedTag === null ? undefined : selectedTag && selectedTag,
    };
    const requestCall = async infinityPostListQueryData => {
        setIsLoading(true);
        await univBoardApi.getList(infinityPostListQueryData).then(res => {
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
                <title>UFO - 대학 게시판</title>
            </Helmet>
            <SearchBox
                searchTag={categories.univBoardTags}
                page="univboard"
                handleResetInfinity={handleResetInfinity}
                queryData={univBoardQueryDB}
            />
            <BoardContentContainer>
                {announcement && announcement.length > 0 && (
                    <BoardBox
                        postList={announcement && announcement.slice(0, 3)}
                        preview={true}
                        boardName="univboard"
                        announcement={true}
                    />
                )}
                {isDesktop ? (
                    <BoardBox
                        postList={UnivPostList && UnivPostList}
                        preview={true}
                        boardName="univboard"
                    />
                ) : (
                    <InfinityScroll
                        nextCall={nextCall}
                        is_next={nextPage <= totalPage ? true : false}
                        size={100}
                        is_loading={is_Loading}
                    >
                        <BoardBox
                            postList={UnivPostList && UnivPostList}
                            preview={true}
                            boardName="univboard"
                        />
                    </InfinityScroll>
                )}
            </BoardContentContainer>
            <MuiThemeProvider theme={MuiTheme}>
                {isDesktop && (
                    <PaginationContainer>
                        <div className={classes.root}>
                            <Pagination
                                count={totalUnivPage && totalUnivPage}
                                page={page}
                                onChange={handlePage}
                            />
                        </div>
                        <DefaultButton
                            onClick={() => history.push("univboard/write")}
                        >
                            글쓰기
                        </DefaultButton>
                    </PaginationContainer>
                )}
            </MuiThemeProvider>
        </>
    );
};

const BoardContentContainer = styled.div`
    width: 100%;
`;

const PaginationContainer = styled.div`
    .MuiPagination-ul {
        justify-content: center;
        li:first-child button,
        li:last-child button {
            background: ${({ theme }) => theme.color.blue2};
            color: ${({ theme, isDarkTheme }) => theme.color.white};
        }
        li button {
            border: 2px solid ${({ theme, isDarkTheme }) => theme.color.blue3};
            &.Mui-selected {
                border: 2px solid
                    ${({ theme, isDarkTheme }) => theme.color.mainMint};
            }
        }
    }
    ${mixin.floatBox("relative")};
    > button {
        ${mixin.floatBox("absolute", "0", "0")}
    }
    .MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page.Mui-selected {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.white
                : props.theme.color.black};
        background-color: ${props =>
            props.isDarkTheme ? "transparent" : null};
    }
    .MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.white
                : props.theme.color.black};
    }
`;

export default withRouter(UnivBoard);
