import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import categories from "../categories";
import BoardBox from "../Components/BoardBox";
import SearchBox from "../Components/SearchBox";
import Pagination from "@material-ui/lab/Pagination";
import { getFreeListDB } from "../redux/async/freeBoard";
import { useDispatch, useSelector } from "react-redux";
import { freeBoardApi } from "../api";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { MuiTheme } from "../styles/MuiTheme";

/**
 * @author kwonjiyeong & heesung
 * @param 없음
 * @returns 자유게시판 뷰
 * @역할 자유게시판 뷰 렌더링, 자유게시판 CRUD 기능 중 R
 * @필수값 없음
 */

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            marginTop: theme.spacing(2),
        },
        "& .MuiPaginationItem-icon": {
            backgroundColor: "#AFB1FF",
            borderRadius: "20px",
        },
        "& .MuiPaginationItem-page": {
            border: "3px solid #D8D9FF",
            borderRadius: "20px",
            backgroundColor: "white",
        },

        "& .Mui-selected": {
            border: "3px solid #bcffe2",
            borderRadius: "20px",
            backgroundColor: "white",
        },
        "& .Mui-disabled": {
            border: "3px solid #bcffe2",
        },
    },
}));

const FreeBoard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [page, setPage] = React.useState(1); // pagination의  현재 페이지 값 설정
    const freeBoardPostList = useSelector(state => state.freeBoard.list); // 자유 게시판 게시글 구독
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    // 현재 선택된 국가 코드
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    );
    const freeBoardTotalPage = useSelector(state => state.freeBoard.pageCount); // 게시물 총 페이지
    useEffect(() => {
        const postListQueryData = {
            pageSize: 10,
            pageNum: page,
            category: selectedTag === null ? undefined : selectedTag,
            country_id: selectedCountry === 0 ? undefined : selectedCountry,
        };
        dispatch(getFreeListDB(postListQueryData));
    }, [dispatch, page, selectedTag, selectedCountry]);

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
    //----

    return (
        <>
            <Helmet>
                <title>UFO - 자유 게시판</title>
            </Helmet>
            <SearchBox
                searchTag={categories.freeBoardTags}
                page="freeboard"
                pushButton={true}
            />
            <BoardBox
                postList={freeBoardPostList && freeBoardPostList}
                preview={true}
                boardName="freeboard"
            />
            <PaginationContainer>
                <MuiThemeProvider theme={MuiTheme}>
                    <div className={classes.root}>
                        <Pagination
                            count={freeBoardTotalPage && freeBoardTotalPage}
                            page={page}
                            onChange={handlePage}
                        />
                    </div>
                </MuiThemeProvider>
            </PaginationContainer>
        </>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

export default FreeBoard;
