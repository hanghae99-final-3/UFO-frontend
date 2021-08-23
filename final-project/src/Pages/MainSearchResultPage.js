import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { getMainSearchResult } from "../redux/async/search";

const MainSearchResultPage = props => {
    const dispatch = useDispatch();
    const Keyword = history.location.pathname.split("/")[3];
    const [searchResult, setSearchResult] = useState([]);
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
            <h1>Main Search Result</h1>
            <div>
                <h3>검색어 : </h3>
                {Keyword}
            </div>
        </React.Fragment>
    );
};

export default MainSearchResultPage;
