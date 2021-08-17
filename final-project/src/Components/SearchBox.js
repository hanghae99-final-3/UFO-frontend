import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
// redux
import {
    resetSearchOrder,
    resetTagReducer,
    setSearchOrder,
    setTagReducer,
} from "../redux/modules/freeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
// material Ui
import Input from "@material-ui/core/Input";
import styled from "styled-components";
import PushButton from "../Elements/Buttons/PushButton";
import { NativeSelect } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Boop from "../Elements/Boop";
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
    // 로그인 유저의 대학교 id
    const univName = useSelector(state => state.user?.user?.university?.name);
    // 작성일 or  관련순 초기 상태
    const [order, setOrder] = React.useState("date");

    const storeSelectedTag = useSelector(state => state.freeBoard.selectedTag);
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
        setSelectedTag(null);
        dispatch(resetTagReducer());
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
        if (history.location.pathname.split("/")[1] === "freeboard") {
            history.push(`/freeboard/search/${searchTerm}`);
        } else if (history.location.pathname.split("/")[1] === "univboard") {
            history.push(`/univboard/search/${searchTerm}`);
        }
    };
    //----

    // 작성일 or  관련순 정렬  이벤트 핸들링
    const handleOrderChange = event => {
        setOrder(event.target.value);
        if (event.target.value === "rel") {
            dispatch(setSearchOrder("relative"));
        } else {
            dispatch(resetSearchOrder());
        }
    };
    const onClick = () => history.push(`/${page}/write`);

    return (
        <React.Fragment>
            <SearchBoxContainer>
                {page && (
                    <Title>
                        <TitleSpan>
                            {page === "freeboard"
                                ? "자유 게시판"
                                : `대학 게시판 (${univName})`}
                        </TitleSpan>

                        <PushButton onClick={onClick}>
                            {/* 작성하기 페이지로 이동! */}
                        </PushButton>
                    </Title>
                )}

                <TagContainer>
                    {searchTag.map((tag, idx) => {
                        // map 함수로 props로 전달된 태그 배열의 태그들 마다 TagButton 컴포넌트 랜더링
                        return (
                            <Boop
                                rotation={0}
                                timing={200}
                                x={0}
                                y={-5}
                                key={idx}
                            >
                                <TagButton
                                    // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
                                    selected={selectedTag === idx}
                                    value={idx}
                                    onClick={handleTagSelect}
                                    key={idx}
                                >
                                    # {tag}
                                </TagButton>
                            </Boop>
                        );
                    })}
                    <ResetTagButton>
                        <Boop rotation={20}>
                            <CloseIcon onClick={handleReset} />
                        </Boop>
                    </ResetTagButton>
                </TagContainer>
                {!deactivateSearch && (
                    <InputContainer>
                        <SearchForm onSubmit={handleSearch}>
                            <Input
                                placeholder="키워드 태그를 설정 후 검색해보세요!"
                                fullWidth
                                value={searchTerm}
                                onChange={onSearchTermChange}
                                endAdornment={
                                    <NativeSelect
                                        value={order}
                                        onChange={handleOrderChange}
                                        style={{ width: "80px" }}
                                    >
                                        <option value={"date"}>작성일</option>
                                        <option value={"rel"}>관련순</option>
                                    </NativeSelect>
                                }
                            />
                        </SearchForm>
                    </InputContainer>
                )}
            </SearchBoxContainer>
        </React.Fragment>
    );
};

export default SearchBox;

const SearchBoxContainer = styled.div``;

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

const ResetTagButton = styled.button`
    color: ${props => (props.selected ? "#ffffff" : "#707071")};
    font-size: 18px;
    height: 32px;
    border-radius: 16px;
    background-color: ${props => (props.selected ? "#707071" : "#ffffff")};
    text-align: center;
    margin-right: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchForm = styled.form``;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
`;

const TitleSpan = styled.span`
    font-size: 40px;
    color: #707070;
`;
