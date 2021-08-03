import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import styled from "styled-components";

const SearchBox = props => {
    const [selectedTag, setSelectedTag] = useState([]); // 태그 state
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 state
    const tags = [
        "질문",
        "정보",
        "주거",
        "취업",
        "연애",
        "게임",
        "유머",
        "코로나",
        "장터",
        "취미",
        "기타",
    ];

    const handleTagSelect = e => {
        if (!selectedTag.includes(e.target.value)) {
            // 초기 배열 값이 태그를 포함하지 않을 경우 추가
            setSelectedTag(prev => [...prev, e.target.value]);
        } else {
            // 배열 값이 태그를 포함하고 있을 경우 제거
            setSelectedTag(prev => prev.filter(tag => tag !== e.target.value));
        }
    };

    const onSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = e => {
        e.preventDefault();
        let tagIndex = [];
        if (searchTerm === "") {
            return window.alert("검색어를 입력해 주세요.");
        }
        if (selectedTag.length > 0) {
            selectedTag.map(tag => {
                const index = tags.indexOf(tag);
                return tagIndex.push(index);
            });
        }
        console.log(tagIndex);
        console.log(searchTerm);
    };

    return (
        <React.Fragment>
            <SearchBoxContainer>
                <TagContainer>
                    {tags.map((tag, idx) => {
                        return (
                            <TagButton
                                selected={selectedTag.includes(tag)}
                                value={tag}
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

const SearchBoxContainer = styled.div`
    padding: 0 20px;
`;

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
