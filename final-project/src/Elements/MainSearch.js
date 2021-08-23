import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";
import { getMainSearchResult } from "../redux/async/search";
import { useDispatch } from "react-redux";

const MainSearch = props => {
    const dispatch = useDispatch();
    const [focused, setFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = e => {
        setSearchTerm(e.target.value);
        dispatch(getMainSearchResult());
    };
    const handleFocus = () => {
        setFocused(true);
    };
    const handleBlur = () => {
        setSearchTerm("");
        setFocused(false);
    };

    useEffect(() => {
        const mainSearchData = {
            pageSize: 10,
            pageNum: 1,
            keyword: searchTerm,
        };
        dispatch(getMainSearchResult(mainSearchData));
    }, [dispatch, searchTerm]);
    return (
        <React.Fragment>
            <SearchForm focused={focused}>
                <Input
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="UFO에게 무엇이든 물어보세요!"
                />
            </SearchForm>
        </React.Fragment>
    );
};

export default MainSearch;

//---------스타일 컴포넌트----------
const SearchForm = styled.form`
    margin-top: 70px;
    width: 100%;
    padding-bottom: 5px;
    ${mixin.flexBox("center")}
    ${props =>
        mixin.outline(
            "4px solid",
            props.focused ? "mainMint" : "gray4",
            "bottom",
        )};
    transition: border-color 1s ease;
`;
const Input = styled.input`
    width: 75%;
    text-align: center;
    ${mixin.textProps(30, "extraBold", "gray2")};
    ::placeholder {
        ${mixin.textProps(30, "extraBold", "gray3")};
    }
    ${mixin.outline("none")}
`;
