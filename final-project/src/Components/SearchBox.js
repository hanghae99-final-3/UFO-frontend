import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import mixin from "../styles/Mixin";
import styled from "styled-components";
import Boop from "../Elements/Boop";
import { history } from "../redux/configureStore";
import PushButton from "../Elements/Buttons/PushButton";

//-----------------redux----------------
import {
    resetSearchOrder,
    resetTagReducer,
    setSearchOrder,
    setTagReducer,
} from "../redux/modules/freeBoardSlice";
//-----

//--------------material Ui---------------
import Input from "@material-ui/core/Input";
import { makeStyles, MuiThemeProvider, NativeSelect } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { MuiTheme } from "../styles/MuiTheme";
//-----

/**
 * @author heesung
 * @param searchTag
 * @returns 검색창 view
 * @역할 검색 / 태그 선택
 * @필수값  searchTag 검색창 위에 보여지는 tag 배열
 */
const useStyles = makeStyles(theme => ({
    selectRoot: {
        //...other styles
        "&:focus": {
            backgroundColor: "white",
        },
    },
    MuiOutlinedInput: {
        fontSize: 18,
        fontWeight: 600,
        color: "#A6ABB2",
    },
}));

const SearchBox = ({ searchTag, deactivateSearch, page, pushButton }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // 현재 선택되어있는 태그의 index값을 selectedTag 배열에 저장한다.
    const [selectedTag, setSelectedTag] = useState(null);
    // 유저가 검색어 입력창에 입력한 값을 searchTerm에 저장한다.
    const [searchTerm, setSearchTerm] = useState("");
    // 로그인 유저의 대학교 id
    const univName = useSelector(state => state.user?.user?.university?.name);
    // 작성일 or  관련순 초기 상태
    const [order, setOrder] = React.useState("date");

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

    //작성하기 페이지 바로기
    const onClick = () => history.push(`/${page}/write`);

    return (
        <React.Fragment>
            <SearchBoxContainer>
                {page && (
                    <TitleContainer>
                        <TitleSpan>
                            {page === "freeboard"
                                ? "자유 게시판"
                                : `대학 게시판 (${univName})`}
                        </TitleSpan>
                        {pushButton && (
                            <PushButton onClick={onClick}>
                                {/* 작성하기 페이지로 이동! */}
                            </PushButton>
                        )}
                    </TitleContainer>
                )}
                <TagContainer>
                    <TagSelectText>태그 설정</TagSelectText>
                    {searchTag.map((tag, idx) => {
                        // map 함수로 props로 전달된 태그 배열의 태그들 마다 TagButton 컴포넌트 랜더링
                        return (
                            <Boop
                                rotation={0}
                                timing={200}
                                x={0}
                                y={-7}
                                key={idx}
                            >
                                <TagButton
                                    // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
                                    selected={selectedTag === idx}
                                    value={idx}
                                    onClick={handleTagSelect}
                                    key={idx}
                                >
                                    #{tag}
                                </TagButton>
                            </Boop>
                        );
                    })}
                    <CancelButton>
                        <Boop rotation={25}>
                            <CloseIcon onClick={handleReset} />
                        </Boop>
                    </CancelButton>
                </TagContainer>
                {!deactivateSearch && (
                    <InputContainer>
                        <SearchForm onSubmit={handleSearch}>
                            <MuiThemeProvider theme={MuiTheme}>
                                <Input
                                    placeholder="키워드 태그를 설정 후 검색해보세요!"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={onSearchTermChange}
                                    classes={{ root: classes.MuiOutlinedInput }}
                                    endAdornment={
                                        <NativeSelect
                                            classes={{
                                                root: classes.selectRoot,
                                            }}
                                            disableUnderline
                                            value={order}
                                            outlined="false"
                                            onChange={handleOrderChange}
                                            style={{
                                                width: "80px",
                                                fontSize: "12px",
                                                color: "#A6ABB2",
                                            }}
                                        >
                                            <option value={"date"}>
                                                작성일
                                            </option>
                                            <option value={"rel"}>
                                                관련순
                                            </option>
                                        </NativeSelect>
                                    }
                                />
                            </MuiThemeProvider>
                        </SearchForm>
                    </InputContainer>
                )}
            </SearchBoxContainer>
        </React.Fragment>
    );
};

export default SearchBox;

//-------스타일 컴포넌트--------
const SearchBoxContainer = styled.div`
    margin-bottom: 15px;
`;

// -----타이틀-----
const TitleContainer = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    ${mixin.flexBox("space-between", "flex-end")}
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const TitleSpan = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
//----

//-----태그-----
const TagContainer = styled.div`
    margin-bottom: 15px;
    ${mixin.flexBox(null, "center", null)}
`;
const TagSelectText = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")};
    margin-right: 10px;
`;
const TagButton = styled.button`
    width: 80px;
    height: 30px;
    text-align: center;
    margin-right: 7px;
    border-radius: 16px;
    ${mixin.textProps(18, "semiBold", "gray1")};
    ${props => mixin.outline("2px solid", props.selected ? "mint" : "blue3")}
    background-color: ${props => props.theme.color.white};
`;
//----

const CancelButton = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid white;
    border-radius: 16px;
    text-align: center;
    font-size: ${props => props.theme.fontSize[18]};
    font-weight: ${props => props.theme.fontWeight.regular};
    color: ${props =>
        props.selected ? props.theme.color.white : props.theme.color.gray1};
    background-color: ${props => (props.selected ? "#707071" : "#ffffff")};
`;

const InputContainer = styled.div`
    width: 100%;
`;

const SearchForm = styled.form``;
