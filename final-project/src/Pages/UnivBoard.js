import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUnivBoardDB } from "../redux/async/univBoard";

import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import SearchBox from "../Components/SearchBox";
import categories from "../categories";
import BoardBox from "../Components/BoardBox";
import { withRouter } from "react-router-dom";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { MuiTheme } from "../styles/MuiTheme";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            marginTop: theme.spacing(2),
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
        "& .MuiPaginationItem-page": {
            // border: "3px solid #D8D9FF",
            borderRadius: "20px",
            backgroundColor: "white",
        },
    },
}));

const UnivBoard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [page, setPage] = useState(1); // pagination 현재 페이지 값
    const univId = useSelector(state => state.user?.user?.univ_id); // 로그인의 인증 대학교 아이디
    const UnivPostList = useSelector(state => state.univBoard.list); // 대학교 게시판 게시글
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독
    const totalUnivPage = useSelector(state => state.univBoard.pageCount); // 총 대학 게시판 게시글 페이지 수
    const announcement = useSelector(state => state.univBoard.fixedList);

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
            <SearchBox
                searchTag={categories.univBoardTags}
                page="univboard"
                pushButton={true}
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
                <BoardBox
                    postList={UnivPostList && UnivPostList}
                    preview={true}
                    boardName="univboard"
                />
            </BoardContentContainer>
            <MuiThemeProvider theme={MuiTheme}>
                <PaginationContainer>
                    <div className={classes.root}>
                        <Pagination
                            count={totalUnivPage && totalUnivPage}
                            page={page}
                            onChange={handlePage}
                        />
                    </div>
                </PaginationContainer>
            </MuiThemeProvider>
        </>
    );
};

const BoardContentContainer = styled.div`
    width: 100%;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

export default withRouter(UnivBoard);
