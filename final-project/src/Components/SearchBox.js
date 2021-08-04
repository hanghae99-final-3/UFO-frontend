import React, { useState, useEffect } from "react";

// redux
import {
    resetTagReducer,
    setTagReducer,
} from "../redux/modules/freeBoardSlice";
import { useDispatch } from "react-redux";

// material Ui
import Input from "@material-ui/core/Input";
import styled from "styled-components";

/**
 * @author heesung
 * @param searchTag
 * @returns 게시글 with 게시글 layout
 * @역할 게시글 view component
 * @필수값  searchTag 검색창 위에 보여지는 tag 배열
 */

const SearchBox = ({ searchTag }) => {
    const dispatch = useDispatch();
    // 현재 선택되어있는 태그의 index값을 selectedTag 배열에 저장한다.
    const [selectedTag, setSelectedTag] = useState([]);
    // 유저가 검색어 입력창에 입력한 값을 searchTerm에 저장한다.
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // selectedTag 상태를 리덕스 스토어의 상태와 동기화
        dispatch(setTagReducer(selectedTag));
    }, [dispatch, selectedTag]);

    //----------------태그 클릭 이벤트 핸들링----------------------
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
    //----

    //---------태그 리셋 버튼 이벤트 핸들링---------
    const handleReset = e => {
        if (e.target.name === "reset") {
            setSelectedTag([]);
            dispatch(resetTagReducer());
        }
    };
    //----

    //-------검색어 입력창 onChange 이벤트 핸들링------
    const onSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };
    //----

    //-------검색창 form onSubmit 이벤트 핸들링--------
    const handleSearch = e => {
        e.preventDefault();

        if (searchTerm === "") {
            return window.alert("검색어를 입력해 주세요.");
        }
        // api 요청으로 변경 예정
        console.log("태그", selectedTag);
        console.log("검색어", searchTerm);
    };
    //----

    return (
        <React.Fragment>
            <SearchBoxContainer>
                <TagContainer>
                    <TagButton name="reset" onClick={handleReset}>
                        X
                    </TagButton>
                    {searchTag.map((tag, idx) => {
                        // map 함수로 props로 전달된 태그 배열의 태그들 마다 TagButton 컴포넌트 랜더링
                        return (
                            <TagButton
                                // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
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
