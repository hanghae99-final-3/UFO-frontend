import React, { useState, useEffect } from "react";

import mixin from "../styles/Mixin"; // 믹스인 객체
import instance from "../api";
import { history } from "../redux/configureStore"; // 히스토리 객체
import MainSearch from "../Elements/MainSearch"; // 검색창 컴포넌트
import SearchBoardBox from "../Components/SearchBoardBox"; //메인검색창 전용 검색결과 리스트
import InfinityScroll from "../InfinityScroll";

import styled from "styled-components"; // 스타일 컴포넌트 라이브러리

const MainSearchResultPage = () => {
    const Keyword = history.location.pathname.split("/")[3]; //검색한 keyword값
    const [searchResult, setSearchResult] = useState([]); // 게시물 리스트 배열
    const [currentPage, setCurrentPage] = useState(1); //초기 페이지 값
    const [totalPage, setTotalPage] = useState(0); // 총 게시물 페이지 ==> 서버가 보내주는 값으로 변경 예정
    const [isLoading, setIsLoading] = useState(false); // loading 상태 값
    const [nextPage, setNextPage] = useState(2); // 다음 페이지가 있는지 확인, 만약 total page보다 작다면 무한스크롤 해제

    //게시물 요청 정보
    const MainSearchQueryDB = {
        keyword: Keyword,
        pageSize: 10,
        pageNum: currentPage,
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
                    console.log("main search response", res.data);
                    setSearchResult(prev => [...prev, ...res.data.result]);
                    setTotalPage(res.data.totalPage);
                    setNextPage(currentPage + 1);
                    setCurrentPage(prev => prev + 1);
                }
            });
        setIsLoading(false);
    };
    const nextCall = () => {
        MainSearchApi(MainSearchQueryDB);
    };
    useEffect(() => {
        MainSearchApi(MainSearchQueryDB);
    }, [Keyword]);
    return (
        <React.Fragment>
            <MainSearch handleSearch />
            <SearchKeyword>"{Keyword}" 검색 결과</SearchKeyword>
            <DivideLine />
            <InfinityScroll
                nextCall={nextCall}
                is_next={nextPage <= totalPage ? true : false}
                size={100}
                is_loading={isLoading}
            >
                <SearchBoardBox postList={searchResult && searchResult} />
            </InfinityScroll>
        </React.Fragment>
    );
};

const SearchKeyword = styled.div`
    margin-top: 76px;
    ${mixin.textProps(30, "extraBold", "black")}
`;

const DivideLine = styled.hr`
    opacity: 0.35;
    color: #dedfe0;
    margin-top: 9px;
    margin-bottom: 15px;
`;

export default MainSearchResultPage;
