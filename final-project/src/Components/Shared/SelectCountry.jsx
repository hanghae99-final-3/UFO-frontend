import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { useDispatch } from "react-redux"; // 리덕스
import { useCookies } from "react-cookie"; // 쿠키 훅스

//아이콘
import ExpandLessIcon from "@material-ui/icons/ExpandLess"; // 더보기 접기 아이콘
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // 더보기 펼치기 아이콘

//통신
import { setCountryReducer } from "../..//Redux/Modules/freeBoardSlice.js"; // 나라 선택 리듀서

//셀렉터에 들어갈 항목
const options = ["전체", "베트남", "호주", "미국", "캐나다", "영국"];

export default function SelectCountry() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState(0); // 선택된 국가 값
    const [countryName, setCountryName] = useState(null);
    const [cookies, setCookie] = useCookies(["rememberCountry"]); // 쿠키 훅스
    const [isSelectOpen, setIsSelectOpen] = useState(false); // select 열림 / 닫힘 값

    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    useEffect(() => {
        if (cookies.rememberCountry !== undefined) {
            setCountry(parseInt(cookies.rememberCountry));
            setCountryName(
                options.find(
                    (ele, idx) =>
                        idx === Number(cookies.rememberCountry) && ele,
                ),
            );
        }

        dispatch(setCountryReducer(country));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, dispatch]);

    useEffect(() => {
        document.addEventListener("scroll", () => setIsSelectOpen(false));
        return document.removeEventListener("scroll", () => {});
    }, []);

    // 국가 선택 변경 핸들러
    const handleChange = event => {
        if (
            cookies.rememberCountry !== event.target.id ||
            cookies.rememberCountry === undefined
        ) {
            setCookie("rememberCountry", event.target.id, {
                maxAge: 60 * 60 * 24,
            });
        }
        setCountry(event.target.id);
        setCountryName(event.target.innerText);
    };

    // 국가 선택 select 클린 이벤트 핸들러
    const handleClick = e => {
        setIsSelectOpen(!isSelectOpen);
    };

    return (
        <CustomSelecter
            onClick={() => {
                if (isDesktop) handleClick();
            }}
        >
            {isDesktop && (
                <>
                    <Icon>
                        {isSelectOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </Icon>
                    <SeletName isDesktop={isDesktop}>{countryName}</SeletName>
                </>
            )}

            <SelecterModal isSelectOpen={isSelectOpen} isDesktop={isDesktop}>
                <Option
                    id={0}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    전체
                </Option>
                <Option
                    id={3}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    미국
                </Option>
                <Option
                    id={2}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    호주
                </Option>
                <Option
                    id={5}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    영국
                </Option>
                <Option
                    id={1}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    베트남
                </Option>
                <Option
                    id={4}
                    onClick={handleChange}
                    currentCountryId={country}
                >
                    캐나다
                </Option>
            </SelecterModal>
        </CustomSelecter>
    );
}

const CustomSelecter = styled.div`
    ${mixin.flexBox(null, "center", null, null)}
    ${mixin.floatBox("relative")}
    cursor: pointer;
`;

const Icon = styled.div`
    svg {
        color: ${props => props.theme.color.mainMint};
    }
`;

const SeletName = styled.span`
    ${props =>
        props.isDesktop
            ? mixin.textProps(18, "semiBold", "gray2")
            : mixin.textProps(18, "semiBold", "blue3")}
`;

const SelecterModal = styled.ul`
    ${props => (props.isSelectOpen ? `display:block;` : `display:none;`)};
    ${mixin.floatBox("absolute", "30px", null, null, "0")}
    width: ${({ theme }) => theme.calRem(128)};
    height: ${({ theme }) => theme.calRem(200)};
    border-radius: 0 18px 18px 18px;
    background-color: ${props => props.theme.color.mainBlue};
    color: ${props => props.theme.color.white};
    padding: ${({ theme }) => `${theme.calRem(12)} ${theme.calRem(33)}`};

    ${props =>
        !props.isDesktop &&
        `display:grid; grid-template-columns:repeat(3,1fr); gap:0 40px; position:static; padding:0; width:auto; height:auto; margin-bottom:${theme.calRem(
            16,
        )};`}
`;

const Option = styled.li`
    //선택된 값과 일치하는 Option은 blue3로 보이게된다.
    ${props =>
        props.currentCountryId == props.id
            ? mixin.textProps(18, "semiBold", "mainMint")
            : mixin.textProps(18, "semiBold", "blue3")};
    :not(:last-child) {
        margin-bottom: ${({ theme }) => theme.calRem(7)};
    }
`;
