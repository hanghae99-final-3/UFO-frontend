import React from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";

const MainSearch = props => {
    return (
        <React.Fragment>
            <SearchForm>
                <Input placeholder="UFO에게 무엇이든 물어보세요!" />
            </SearchForm>
        </React.Fragment>
    );
};

export default MainSearch;

const SearchForm = styled.form`
    margin-top: 70px;
    width: 100%;
    padding-bottom: 5px;
    ${mixin.flexBox("center")}
    ${mixin.outline("4px solid", "gray4", "bottom")}
`;
const Input = styled.input`
    width: 75%;
    text-align: center;
    ${mixin.textProps(30, "extraBold", "gray3")};
    ::placeholder {
        ${mixin.textProps(30, "extraBold", "gray3")};
    }
    ${mixin.outline("none")}
`;
