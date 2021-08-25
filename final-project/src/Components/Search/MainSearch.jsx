import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch } from "react-redux";
import { history } from "../../Redux/configureStore";

const MainSearch = props => {
    const [focused, setFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };
    const handleFocus = () => {
        setFocused(true);
    };
    const handleBlur = () => {
        setSearchTerm("");
        setFocused(false);
    };
    const handleSearch = e => {
        e.preventDefault();
        if (searchTerm === "") {
            return window.alert("검색어를 입력해 주세요.");
        }
        history.push(`/util/search/${searchTerm}`);
        setSearchTerm("");
    };
    return (
        <React.Fragment>
            <SearchForm focused={focused} onSubmit={handleSearch}>
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