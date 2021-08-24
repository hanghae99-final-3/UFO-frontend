import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components"; // 스타일 컴포넌트 객체
import { getSearchResult, getUnivSearchResult } from "../redux/async/search";

import Pagination from "@material-ui/lab/Pagination";
import BoardBox from "../Components/BoardBox";
import SearchBox from "../Components/SearchBox";
import categories from "../categories";
import { resetSearchOrder } from "../redux/modules/freeBoardSlice";
import { history } from "../redux/configureStore";

const SearchResult = props => {
    const dispatch = useDispatch();
    const currentLocation = history.location.pathname.split("/")[1];
    const [page, setPage] = useState(1);
    const { param: searchTerm } = useParams();
    const selectedTag = useSelector(state => state.freeBoard?.selectedTag);
    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountry,
    );
    const selectedSearchOrder = useSelector(
        state => state.freeBoard?.selectedSearchOrder,
    );
    const searchResultList = useSelector(state => state.search.searchResult);

    const handlePage = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        const SearchQueryData = {
            pageSize: 10,
            pageNum: page,
            keyword: searchTerm,
            category: selectedTag === null ? undefined : selectedTag,
            country_id: selectedCountry === 0 ? undefined : selectedCountry,
            sort: selectedSearchOrder ? selectedSearchOrder : null,
        };
        if (currentLocation === "freeboard") {
            dispatch(getSearchResult(SearchQueryData));
            dispatch(resetSearchOrder());
        } else if (currentLocation === "univboard") {
            dispatch(getUnivSearchResult(SearchQueryData));
            dispatch(resetSearchOrder());
        }
    }, [dispatch, selectedTag, selectedCountry, searchTerm, page]);

    return (
        <>
            <TitleContainer>
                <SearchTerm>{searchTerm}</SearchTerm>
                <Title>검색결과</Title>
            </TitleContainer>
            <SearchBox
                searchTag={
                    currentLocation === "freeboard"
                        ? categories.freeBoardTags
                        : categories.univBoardTags
                }
            />
            <BoardBox
                postList={searchResultList && searchResultList.rows}
                preview={true}
                boardName={currentLocation}
                selectedTag={selectedTag}
            />
            <PaginationContainer>
                <Pagination
                    count={Math.ceil(searchResultList?.count / 10)}
                    page={page}
                    onChange={handlePage}
                />
            </PaginationContainer>
        </>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
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
    margin-bottom: 20px;
    vertical-align: middle;
`;

export default SearchResult;
