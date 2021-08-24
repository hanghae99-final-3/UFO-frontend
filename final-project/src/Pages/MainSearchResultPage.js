import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainSearchResult } from "../redux/async/search"; // 통합 검색 thunk

import MainSearch from "../Elements/MainSearch"; // 검색창 컴포넌트
import MainSearchList from "../Components/MainSearchList"; // 검색 결과 페이지

import mixin from "../styles/Mixin"; // 믹스인 객체
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import { history } from "../redux/configureStore"; // 히스토리 객체

const MainSearchResultPage = props => {
    const dispatch = useDispatch();
    const Keyword = history.location.pathname.split("/")[3];
    const [searchResult, setSearchResult] = useState([]);
    const SearchResult = useSelector(state => state.search.searchResult);
    useEffect(() => {
        const MainSearchQueryDB = {
            keyword: Keyword,
            pageSize: 10,
            pageNum: 1,
        };
        dispatch(getMainSearchResult(MainSearchQueryDB));
    }, [dispatch, Keyword]);

    return (
        <React.Fragment>
            <MainSearch handleSearch />
            <SearchKeyword>"{Keyword}" 검색 결과</SearchKeyword>
            <hr
                style={{
                    opacity: "0.35",
                    border: "solid 1.5px #dedfe0",
                    marginTop: "9px",
                }}
            />
            <div>
                {SearchResult &&
                    SearchResult.map((post, idx) => <p>{post.title}</p>)}
            </div>
            <MainSearchList />
        </React.Fragment>
    );
};

const SearchKeyword = styled.div`
    margin-top: 76px;
    ${mixin.textProps(30, "extraBold", "black")}
`;

export default MainSearchResultPage;
