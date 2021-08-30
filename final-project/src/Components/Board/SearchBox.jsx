import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import theme from "../../Styles/theme";

//통신
import {
    resetSearchOrder,
    resetTagReducer,
    setSearchOrder,
    setTagReducer,
} from "../../Redux/Modules/freeBoardSlice";

//애니메이션
import Boop from "../../Elements/Animations/Boop";
import { history } from "../../Redux/configureStore";

//머테리얼 ui
import Input from "@material-ui/core/Input";
import CloseIcon from "@material-ui/icons/Close";
import { MuiTheme } from "../../Styles/MuiTheme";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { Select as MuiSelect } from "@material-ui/core";
import DefaultSelector from "../../Elements/Buttons/DefaultSelector";
import { getFreeListDB, getSearchResult } from "../../Redux/Async/freeBoard";
import {
    getUnivBoardDB,
    getUnivSearchResult,
} from "../../Redux/Async/univBoard";
import Swal from "sweetalert2";

/**
 * @author heesung
 * @param searchTag
 * @returns 검색창 view
 * @역할 검색 / 태그 선택
 * @필수값  searchTag 검색창 위에 보여지는 tag 배열
 */

const useStyles = makeStyles(theme => ({
    MuiOutlinedInput: {
        fontSize: 18,
        fontWeight: 600,
        color: "#757b80",
    },
}));

const SearchBox = ({
    searchTag,
    deactivateSearch,
    page,
    handleResetInfinity,
    queryData,
}) => {
    const classes = useStyles();
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
    const dispatch = useDispatch();
    // 현재 선택되어있는 태그의 index값을 selectedTag 배열에 저장한다.
    const { id } = useParams();
    const [selectedTag, setSelectedTag] = useState(
        id !== undefined ? parseInt(id) : null,
    );
    // 유저가 검색어 입력창에 입력한 값을 searchTerm에 저장한다.
    const [searchTerm, setSearchTerm] = useState("");
    // 로그인 유저의 대학교 id
    const univName = useSelector(state => state.user?.user?.university?.name);
    // 작성일 or  관련순 초기 상태
    const [order, setOrder] = React.useState("date");

    const ReduxSelectedTag = useSelector(state => state.freeBoard?.selectedTag);

    const selectedCountry = useSelector(
        state => state.freeBoard.selectedCountryId,
    );
    const selectedCountryEngName = useSelector(
        state => state.freeBoard.selectedCountry?.engName,
    );

    const selectedSearchOrder = useSelector(
        state => state.freeBoard?.selectedSearchOrder,
    );

    useEffect(() => {
        // dispatch(resetUnivList());
        dispatch(setTagReducer(selectedTag));
        dispatch(setSearchOrder(order));
    }, [dispatch, selectedTag, id, order]);

    //태그 클릭 이벤트 핸들링
    const handleTagSelect = e => {
        handleResetInfinity();
        setSelectedTag(parseInt(e.target.value));
    };

    //태그 리셋 버튼 이벤트 핸들링
    const handleReset = e => {
        handleResetInfinity();
        setSelectedTag(null);
        dispatch(resetTagReducer());
        if (page === "freeboard") {
            dispatch(getFreeListDB(queryData));
        } else {
            dispatch(getUnivBoardDB(queryData));
        }
    };

    //검색어 입력창 onChange 이벤트 핸들링
    const onSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    //검색창 form onSubmit 이벤트 핸들링
    const handleSearch = e => {
        e.preventDefault();
        const regexp = /^\S*$/;
        // history.push(`/util/search/${searchTerm}`);
        if (searchTerm === "") {
            return Swal.fire("에러", "검색어를 입력해주세요.😉", "error");
        }
        if (!regexp.test(searchTerm)) {
            return Swal.fire("에러", "검색어를 입력해주세요.😉", "error");
        }

        if (history.location.pathname.split("/")[1] === "freeboard") {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                keyword: searchTerm,
                category: selectedTag,
                country_id: selectedCountry === 0 ? undefined : selectedCountry,
                sort: selectedSearchOrder ? selectedSearchOrder : null,
            };
            dispatch(getSearchResult(SearchQueryData));
            // history.push(`/freeboard/search/${searchTerm}`);
        } else if (history.location.pathname.split("/")[1] === "univboard") {
            const SearchQueryData = {
                pageSize: 10,
                pageNum: 1,
                keyword: searchTerm,
                category: selectedTag,
                country_id: selectedCountry === 0 ? undefined : selectedCountry,
                sort: selectedSearchOrder ? selectedSearchOrder : null,
            };
            dispatch(getUnivSearchResult(SearchQueryData));
        }
        setSearchTerm("");
    };
    // 작성일 or  관련순 정렬  이벤트 핸들링
    const handleOrderChange = event => {
        setOrder(event.target.value);
        if (event.target.value === "rel") {
            dispatch(setSearchOrder("relative"));
        } else {
            dispatch(resetSearchOrder());
        }
    };

    const handleGoToList = board => history.push(`/${board}`);

    return (
        <React.Fragment>
            <SearchBoxContainer>
                {page && (
                    <TitleContainer>
                        {console.log("")}
                        {page === "freeboard" && (
                            <UnivName isDarkTheme={isDarkTheme}>
                                {selectedCountryEngName}
                            </UnivName>
                        )}
                        {page === "univboard" && (
                            <UnivName isDarkTheme={isDarkTheme}>
                                {univName}
                            </UnivName>
                        )}
                        <TitleSpan
                            isDarkTheme={isDarkTheme}
                            onClick={() => handleGoToList(page)}
                        >
                            {page === "freeboard"
                                ? "자유 게시판 💬"
                                : "대학 게시판 🎓"}
                        </TitleSpan>
                    </TitleContainer>
                )}

                <TagContainer>
                    <TagSelectTextBox isDarkTheme={isDarkTheme}>
                        <TagSelectText isDarkTheme={isDarkTheme}>
                            게시글 필터
                        </TagSelectText>
                    </TagSelectTextBox>
                    <TagSelectorBox>
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
                                    <DefaultSelector
                                        // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
                                        isSelected={selectedTag === idx}
                                        value={idx}
                                        onClick={handleTagSelect}
                                        key={idx}
                                        rightGap="8px"
                                        lastNoGap={searchTag.length - 1 === idx}
                                    >
                                        #{tag}
                                    </DefaultSelector>
                                </Boop>
                            );
                        })}
                    </TagSelectorBox>
                    <CancelButton isDarkTheme={isDarkTheme}>
                        <Boop rotation={25}>
                            <CloseIcon onClick={handleReset} />
                        </Boop>
                    </CancelButton>
                </TagContainer>
                {!deactivateSearch && (
                    <InputContainer>
                        <Select
                            isDarkTheme={isDarkTheme}
                            MenuProps={{
                                disablePortal: true,
                                getContentAnchorEl: null,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                },
                            }}
                            defaultValue="date"
                            disableUnderline
                            value={order}
                            outlined="false"
                            onChange={handleOrderChange}
                        >
                            <option defaultValue value={"date"}>
                                작성일
                            </option>
                            <option value={"relative"}>관련순</option>
                        </Select>
                        <SearchForm onSubmit={handleSearch}>
                            <MuiThemeProvider theme={MuiTheme}>
                                <InputBox
                                    isDarkTheme={isDarkTheme}
                                    placeholder="UFO에게 무엇이든 검색해보세요 "
                                    value={searchTerm}
                                    onChange={onSearchTermChange}
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
const SearchForm = styled.form`
    width: 100%;
`;
const InputContainer = styled.div`
    display: flex;
    width: 100%;
`;
const SearchBoxContainer = styled.div`
    margin-bottom: 15px;
`;

const TitleContainer = styled.div`
    /* margin-bottom: 10px; */
    padding-bottom: 10px;
    ${mixin.outline("1.5px solid", "gray4", "bottom")}

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(8)};
    }
`;

const UnivName = styled.span`
    display: inline-block;
    margin-bottom: 10px;
    width: 100%;
    ${props =>
        mixin.textProps(
            20,
            "semiBold",
            props.isDarkTheme ? "mainGray" : "gray2",
        )};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "mainGray" : "gray2",
            )};
    }
`;

const TitleSpan = styled.span`
    cursor: pointer;
    ${props =>
        mixin.textProps(
            30,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
    }
`;
const TagContainer = styled.div`
    margin-bottom: 18px;
    margin-top: 15px;
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(10)};
        margin-top: 0;
    }
    ${mixin.flexBox(null, "center", null)}
`;

const TagSelectTextBox = styled.div`
    @media ${({ theme }) => theme.mobile} {
        position: absolute;
        z-index: 10;
        background-color: ${props =>
            props.isDarkTheme
                ? props.theme.color.black
                : props.theme.color.white};
        height: 42px;
        line-height: 42px;
    }
`;

const TagSelectText = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")};
    margin-right: 15px;
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(12, "semiBold", "gray3")};
    }
`;
const TagSelectorBox = styled.div`
    @media ${({ theme }) => theme.mobile} {
        width: 100%;
        white-space: nowrap;
        overflow: auto;
        padding-left: ${({ theme }) => theme.calRem(70)};
        ${mixin.flexBox(null, "center", null, theme.calRem(42))}
        ::-webkit-scrollbar {
            display: none;
        }
    }
`;

const CancelButton = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid
        ${props =>
            props.isDarkTheme
                ? props.theme.color.black
                : props.theme.color.white};
    border-radius: 16px;
    text-align: center;
    font-size: ${props => props.theme.fontSize[18]};
    font-weight: ${props => props.theme.fontWeight.regular};
    color: ${props =>
        props.isDarkTheme ? props.theme.color.gray3 : props.theme.color.gray3};
    background-color: ${props =>
        props.isDarkTheme ? props.theme.color.black : props.theme.color.white};
`;

const InputBox = styled.input`
    width: 100%;
    border: none;
    border-radius: 0px;
    padding-bottom: 5px;
    background-color: transparent;
    ${props =>
        mixin.outline(
            "2px solid",
            props.isDarkTheme ? "gray2" : "gray4",
            "bottom",
        )};
    :focus {
        ${props => mixin.outline("2px solid", "mainMint", "bottom")};
    }
    transition: border-color 1s ease;
    ${props =>
        mixin.textProps(
            18,
            "semiBold",
            props.isDarkTheme ? "mainGray" : "gray1",
        )};
    ::placeholder {
        ${mixin.textProps(18, "semiBold", "gray3")};
    }

    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                14,
                "semiBold",
                props.isDarkTheme ? "mainGray" : "gray1",
            )};
        ::placeholder {
            ${mixin.textProps(14, "semiBold", "gray3")};
        }
    }
`;

const Select = styled(MuiSelect)`
    option {
        cursor: pointer;
    }
    .MuiPaper-root {
        color: ${props => props.theme.color.white};
        background-color: ${props => props.theme.color.mainBlue};
        ${mixin.flexBox("center", null, null, null)};
        ${mixin.textProps(14, "semiBold", "blue3")};
        border-radius: 0 15px 15px 15px;
        /* @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(11, "semiBold", "blue3")};
        } */
    }
    .MuiSelect-root {
        padding: 0;
        ${mixin.textProps(12, "semiBold", "gray3")};
        background-color: transparent;
    }
    .MuiSelect-select {
        :focus {
            background-color: transparent;
        }
    }
    .MuiSvgIcon-root.MuiSelect-icon {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.gray3
                : props.theme.color.gray3};
    }
`;
