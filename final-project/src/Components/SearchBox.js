import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
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
 * @returns 검색창 view
 * @역할 검색 / 태그 선택
 * @필수값  searchTag 검색창 위에 보여지는 tag 배열
 */

const SearchBox = ({ searchTag, deactivateSearch, page }) => {
    const dispatch = useDispatch();
    // 현재 선택되어있는 태그의 index값을 selectedTag 배열에 저장한다.
    const [selectedTag, setSelectedTag] = useState(null);
    // 유저가 검색어 입력창에 입력한 값을 searchTerm에 저장한다.
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // selectedTag 상태를 리덕스 스토어의 상태와 동기화
        dispatch(setTagReducer(selectedTag));
    }, [dispatch, selectedTag]);

    //----------------태그 클릭 이벤트 핸들링----------------------
    const handleTagSelect = e => {
        setSelectedTag(parseInt(e.target.value));
    };
    //----

    //---------태그 리셋 버튼 이벤트 핸들링---------
    const handleReset = e => {
        if (e.target.name === "reset") {
            setSelectedTag(null);
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
        history.push(`/search/${searchTerm}`);
    };
    //----

    return (
        <React.Fragment>
            <SearchBoxContainer>
                {page && (
                    <Title>
                        <span>
                            {page === "freeboard"
                                ? "자유 게시판"
                                : "대학 게시판"}
                        </span>
                        <button onClick={() => history.push(`/${page}/write`)}>
                            {/* 작성하기 페이지로 이동! */}
                            작성하기
                        </button>
                    </Title>
                )}

                <TagContainer>
                    <TagButton name="reset" onClick={handleReset}>
                        X
                    </TagButton>
                    {searchTag.map((tag, idx) => {
                        // map 함수로 props로 전달된 태그 배열의 태그들 마다 TagButton 컴포넌트 랜더링
                        return (
                            <TagButton
                                // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
                                selected={selectedTag === idx}
                                value={idx}
                                onClick={handleTagSelect}
                                key={idx}
                            >
                                # {tag}
                            </TagButton>
                        );
                    })}
                </TagContainer>
                {!deactivateSearch && (
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
                )}
            </SearchBoxContainer>
        </React.Fragment>
    );
};

export default SearchBox;

const SearchBoxContainer = styled.div`
    margin: 30px 0;
`;

const TagContainer = styled.div`
    display: flex;
    justify-content: flex-start;
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

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30px;
    span {
        font-size: 40px;
        color: #707070;
    }
    button {
        height: 40px;
        padding: 0 20px;
        border-radius: 10px;
    }
`;
