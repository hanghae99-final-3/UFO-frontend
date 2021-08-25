import React, { useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

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
                <div className={classes.root}>
                    <Pagination
                        count={freeBoardTotalPage && freeBoardTotalPage}
                        page={page}
                        onChange={handlePage}
                    />
                </div>
                <DefaultButton>글쓰기</DefaultButton>
            </PaginationContainer>
        </>
    );
};

const PaginationContainer = styled.div`
    .MuiPagination-ul {
        justify-content: center;
    }
    ${mixin.floatBox("relative")};
    > button {
        ${mixin.floatBox("absolute", "0", "0")}
    }
`;

export default FreeBoard;
