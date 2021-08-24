import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainSearchResult } from "../redux/async/search"; // 통합 검색 thunk

import MainSearch from "../Elements/MainSearch"; // 검색창 컴포넌트
import BoardBox from "../Components/BoardBox"; // 결과 리스트 보여줄 boardbox 페이지

import mixin from "../styles/Mixin"; // 믹스인 객체
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import { history } from "../redux/configureStore"; // 히스토리 객체

import instance from "../api";

const MainSearchResultPage = props => {
    const dispatch = useDispatch();
    const Keyword = history.location.pathname.split("/")[3]; //검색한 keyword값
    const [searchResult, setSearchResult] = useState([]); // 게시물 리스트 배열
    const [isLoading, setIsLoading] = useState(false); // loading 상태 값

    //게시물 요청 정보
    const MainSearchQueryDB = {
        keyword: Keyword,
        pageSize: 10,
        pageNum: 1,
    };

    ///Main Search api 연결
    const MainSearchApi = async ({ keyword, pageSize, pageNum }) => {
        setIsLoading(true);
        await instance
            .get("util/search", {
                params: {
                    keyword,
                    pageSize,
                    pageNum,
                },
            })
            .then(res => {
                if (res.data.ok) {
                    setSearchResult(res.data.result);
                }
                console.log("res", res);
            });
        setIsLoading(false);
    };
    useEffect(() => {
        MainSearchApi(MainSearchQueryDB);
    }, [Keyword]);
    return (
        <React.Fragment>
            <MainSearch handleSearch />
            <SearchKeyword>"{Keyword}" 검색 결과</SearchKeyword>
            <DivideLine />
            <BoardBox
                boardName="mainresult"
                postList={searchResult && searchResult}
            />
        </React.Fragment>
    );
};

const SearchKeyword = styled.div`
    margin-top: 76px;
    ${mixin.textProps(30, "extraBold", "black")}
`;

const DivideLine = styled.hr`
    opacity: 0.35;
    border: solid 1.5px #dedfe0;
    margin-top: 9px;
    margin-bottom: 15px;
`;

export default MainSearchResultPage;
