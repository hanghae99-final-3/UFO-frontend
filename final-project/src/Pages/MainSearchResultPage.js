import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { getMainSearchResult } from "../redux/async/search";
import MainSearch from "../Elements/MainSearch";
import mixin from "../styles/Mixin";
import theme from "../styles/theme";
import BoardBox from "../Components/BoardBox";
import MainSearchList from "../Components/MainSearchList";

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
