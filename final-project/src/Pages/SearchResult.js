import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearchResult } from "../redux/async/search";

import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import BoardBox from "../Components/BoardBox";
import SearchBox from "../Components/SearchBox";
import categories from "../categories";

const SearchResult = props => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { param: searchTerm } = useParams();
    const selectedTag = useSelector(state => state.freeBoard.selectedTag);
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    );
    const searchResultList = useSelector(state => state.search.searchResult);

    const handlePage = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        if ((selectedTag === null) & (selectedCountry === 0)) {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                keyword: searchTerm,
            };
            dispatch(getSearchResult(SearchQueryData));
        } else if ((selectedTag !== null) & (selectedCountry !== 0)) {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                category: selectedTag,
                country_id: selectedCountry,
                keyword: searchTerm,
            };
            dispatch(getSearchResult(SearchQueryData));
        } else if (selectedTag !== null && selectedCountry === 0) {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                category: selectedTag,
                keyword: searchTerm,
            };
            dispatch(getSearchResult(SearchQueryData));
        } else {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                country_id: selectedCountry,
                keyword: searchTerm,
            };
            dispatch(getSearchResult(SearchQueryData));
        }
    }, [dispatch, selectedTag, selectedCountry, searchTerm]);

    return (
        <>
            <TitleContainer>
                <SearchTerm>{searchTerm}</SearchTerm>
                <Title>검색결과</Title>
            </TitleContainer>
            <SearchBox
                searchTag={categories.freeBoardTags}
                deactivateSearch={true}
            />
            <BoardBox
                postList={searchResultList && searchResultList}
                preview={true}
                boardName="freeBoard"
            />
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage} />
            </PaginationContainer>
        </>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 100px;
`;

const Title = styled.span`
    font-weight: 400;
    font-size: 30px;
`;
const SearchTerm = styled.span`
    margin-left: 5px;
    font-size: 50px;
    font-weight: 800;
`;
const TitleContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    vertical-align: middle;
`;

export default SearchResult;
