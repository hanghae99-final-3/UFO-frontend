import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { useDispatch, useSelector } from "react-redux"; // 리덕스
import { useCookies } from "react-cookie"; // 쿠키 훅스
import categories from "../../Shared/categories"; //국가선택 카테고리를 가져오는 곳

//아이콘
import ExpandLessIcon from "@material-ui/icons/ExpandLess"; // 더보기 접기 아이콘
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // 더보기 펼치기 아이콘

//통신
import { setCountryReducer } from "../..//Redux/Modules/freeBoardSlice.js"; // 나라 선택 리듀서

export default function SelectCountry({ isDarkTheme }) {
    const dispatch = useDispatch();
    // const [selectedData, setSelectedData] = useState({ id: 0, name: "전체" }); //셀렉터 데이터 값입니다.
    const [cookies, setCookie] = useCookies(["rememberCountry"]); // 쿠키 훅스
    const [isSelectOpen, setIsSelectOpen] = useState(false); // select 열림 / 닫힘 값
    const selectedData = useSelector(
        state => state.freeBoard.selectedCountry,
    ) || { id: 0, name: "전체", icon: "🌍", engName: "All" }; //셀렉터의 정보가 담겨져있습니다!

    useEffect(() => {
        //초기설정을 위한 useEffect입니다!!!
        if (!cookies.rememberCountry) {
            //쿠키값이 없으면 0번(전체)으로 초기화시켜줍니다.
            return dispatch(
                setCountryReducer({
                    id: 0,
                    name: "전체",
                    icon: "🌍",
                    engName: "All",
                }),
            );
        }

        //쿠키에 저장된 값과 일치하는 데이터 찾기
        const matchData = categories.countrySelectorList.find(
            ele => ele.id === Number(cookies.rememberCountry),
        );

        //리덕스 스테이트에 셀렉터 데이터 심어두기
        dispatch(
            setCountryReducer({
                id: Number(cookies.rememberCountry),
                name: matchData.name,
                icon: matchData.icon,
                engName: matchData.engName,
            }),
        );

        //스크롤내리면 메뉴가 닫히는 설정
        document.addEventListener("scroll", () => setIsSelectOpen(false));
        return document.removeEventListener("scroll", () => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const ChangeSelect = event => {
        //셀렉터 클릭 시 작동하는 함수입니다.
        if (
            cookies.rememberCountry !== event.target.id ||
            cookies.rememberCountry === undefined
        ) {
            //값을 쿠키에 저장해둡니다.
            setCookie("rememberCountry", event.target.id, {
                maxAge: 60 * 60 * 24,
            });
        }

        //쿠키에 저장된 값과 일치하는 데이터 찾기
        const matchData = categories.countrySelectorList.find(
            ele => ele.id === Number(event.target.id),
        );

        //리덕스에 셀렉터 정보 저장하기
        dispatch(
            setCountryReducer({
                //state에 저장해둡니다.
                id: Number(event.target.id),
                name: matchData.name,
                icon: matchData.icon,
                engName: matchData.engName,
            }),
        );
    };

    const openSelector = value => {
        //셀렉터를 열고닫는 함수입니다
        setIsSelectOpen(value);
    };

    //셀렉터가 닫혔을 때
    if (!isSelectOpen)
        return (
            <Container onClick={() => openSelector(true)}>
                <Button>
                    <SeletName>
                        {/* {selectedData.icon} */}
                        {selectedData.name}
                    </SeletName>
                </Button>
            </Container>
        );

    //셀렉터가 열렸을 때
    return (
        <Container onClick={() => openSelector(false)}>
            <CountrySelector isSelectOpen={isSelectOpen}>
                {categories.countrySelectorList.map(ele => (
                    <Option
                        isDarkTheme={isDarkTheme}
                        key={ele.id}
                        id={ele.id}
                        isSelected={selectedData.id == ele.id}
                        onClick={ChangeSelect}
                    >
                        {/* {ele.icon} */}
                        {ele.name}
                    </Option>
                ))}
            </CountrySelector>
        </Container>
    );
}

const Container = styled.div`
    ${mixin.flexBox(null, null, "column", null)};
    ${mixin.floatBox("relative")}
    width: ${({ theme }) => theme.calRem(60)};
    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(48)};
    }
`;

const Button = styled.button`
    background: ${({ theme }) => theme.color.mainBlue};
    width: ${({ theme }) => theme.calRem(60)};
    height: ${({ theme }) => theme.calRem(60)};
    ${mixin.flexBox("center", "center", null, null)};
    ${mixin.outline("1px solid", "gray3")}
    ${mixin.textProps(40, "regular", "mainMint")}
    border-radius: 50%;
    line-height: 1;
    transition: all 0.3s ease;
    :hover {
        ${mixin.textProps(40, "regular", "gray2")}
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(28, "regular", "gray2")}
        }
    }
    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(48)};
        height: ${({ theme }) => theme.calRem(48)};
        ${mixin.textProps(28, "regular", "gray3")}
    }
`;

const Icon = styled.div`
    color: ${props => props.theme.color.mainMint};
    svg {
        path {
            stroke: ${props => props.theme.color.mainMint};
        }
    }
`;

const SeletName = styled.span`
    ${mixin.textProps(18, "semiBold", "mainMint")}
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(12, "semiBold", "mainMint")}
    }
`;

const CountrySelector = styled.div`
    ${props => (props.isSelectOpen ? `display:block;` : `display:none;`)};
    border-radius: 25px;
    background-color: ${props => props.theme.color.mainBlue};
    color: ${props => props.theme.color.white};
    padding: ${({ theme }) => `${theme.calRem(16)} 0`};
    text-align: center;
    width: 100%;
`;

const Option = styled.div`
    cursor: pointer;
    padding: ${({ theme }) => theme.calRem(5)} 0;
    ${props =>
        props.isSelected
            ? mixin.textProps(18, "semiBold", "mainMint")
            : mixin.textProps(18, "semiBold", "blue3")};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isSelected
                ? mixin.textProps(12, "semiBold", "mainMint")
                : mixin.textProps(12, "semiBold", "blue3")};
    }
`;
