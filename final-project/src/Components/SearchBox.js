import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {
    resetTagReducer,
    setTagReducer,
} from "../redux/modules/freeBoardSlice";

const SearchBox = ({ searchTag }) => {
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState([]); // 태그 state
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 state

    useEffect(() => {
        dispatch(setTagReducer(selectedTag));
    }, [dispatch, selectedTag]);

    const handleTagSelect = e => {
        if (!selectedTag.includes(parseInt(e.target.value))) {
            // 초기 배열 값이 태그를 포함하지 않을 경우 추가
            setSelectedTag(prev => [...prev, parseInt(e.target.value)]);
        } else {
            // 배열 값이 태그를 포함하고 있을 경우 제거
            setSelectedTag(prev =>
                prev.filter(tag => tag !== parseInt(e.target.value)),
            );
        }
    };

    const handleReset = e => {
        if (e.target.name === "reset") {
            setSelectedTag([]);
            dispatch(resetTagReducer());
        }
    };

    const onSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = e => {
        e.preventDefault();

        if (searchTerm === "") {
            return window.alert("검색어를 입력해 주세요.");
        }

        console.log("태그", selectedTag);
        console.log("검색어", searchTerm);
    };

    return (
        <React.Fragment>
            <SearchBoxContainer>
                <TagContainer>
                    <TagButton name="reset" onClick={handleReset}>
                        X
                    </TagButton>
                    {searchTag.map((tag, idx) => {
                        return (
                            <TagButton
                                selected={selectedTag.includes(idx)}
                                value={idx}
                                onClick={handleTagSelect}
                                key={idx}
                            >
                                # {tag}
                            </TagButton>
                        );
                    })}
                </TagContainer>
                <InputContainer>
                    <SearchForm onSubmit={handleSearch}>
                        <Input
                            placeholder="키워드 태그를 설정 후 검색해보세요!"
                            fullWidth
                            value={searchTerm}
                            onChange={onSearchTermChange}
                        />
                    </SearchForm>
                </InputContainer>
            </SearchBoxContainer>
        </React.Fragment>
    );
};

export default SearchBox;

const SearchBoxContainer = styled.div``;

const TagContainer = styled.div`
    width: max-content;
    margin: 0 auto;
`;

const InputContainer = styled.div`
    width: 100%;
`;

const TagButton = styled.button`
    border: 1px solid #707071;
    color: ${props => (props.selected ? "#ffffff" : "#707071")};
    font-size: 18px;
    width: 84px;
    height: 32px;
    border-radius: 16px;
    background-color: ${props => (props.selected ? "#707071" : "#ffffff")};
    text-align: center;
    margin-right: 5px;
    margin-bottom: 10px;
`;

const SearchForm = styled.form``;
