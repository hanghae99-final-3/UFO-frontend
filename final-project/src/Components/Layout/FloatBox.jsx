import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { useLocation } from "react-router";
import { history } from "../../Redux/configureStore";

//아이콘
import { GrEdit } from "react-icons/gr";
import { BiArrowToTop } from "react-icons/bi";

const FloatBox = () => {
    const { pathname } = useLocation();
    const [isWriteBntOn, setIsWriteBntOn] = useState(false); //작성버튼을 보여줄지 말지에 대한 판별값, 자유게시판, 국가게시판이면 글쓰기버튼이 생긴다.
    const [isScrollTopBtnOn, setIsScrollTopBtnOn] = useState(false); //위로가기 버튼을 보여줄지 말지에 대한 판별값
    const [isOpenCountrySeletor, setIsOpenCountrySeletor] = useState(false); //국가선택셀렉터를 열고 닫는 토글값
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    const goToWrite = () => {
        //pathname이 freeboard면 자유게시판작성페이지로, 아니면 대학게시판작성페이지로 보낸다.
        if (pathname === "/freeboard") return history.push("/freeboard/write");
        history.push("/univboard/write");
    };

    const openCountrySelecter = () => {
        setIsOpenCountrySeletor(!isOpenCountrySeletor);
    };

    const scrollToTop = () => {
        //스크롤을 위로 올리는 함수
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            //토글을 보여줄지 말지를 결정하는 함수입니다.
            if (window.pageYOffset > 0) {
                setIsScrollTopBtnOn(true);
            } else {
                setIsScrollTopBtnOn(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        //대학게시판이나, 자유게시판페이지면 isWriteBntOn을 true로 바꿔서 글쓰기 플루팅버튼을 보이게 합니다.
        if (pathname === "/univboard" || pathname === "/freeboard")
            setIsWriteBntOn(true);
        else setIsWriteBntOn(false);
    }, [pathname]);

    return (
        <Container>
            {isOpenCountrySeletor ? (
                <ButtonText
                    onClick={openCountrySelecter}
                    isSelected={isOpenCountrySeletor}
                >
                    국가선택
                </ButtonText>
            ) : (
                <Button onClick={openCountrySelecter}>
                    <ButtonText>국가</ButtonText>
                </Button>
            )}

            {isOpenCountrySeletor && (
                <CountrySelector isBtnOn={isOpenCountrySeletor}>
                    <Option>전체</Option>
                    <Option>미국</Option>
                    <Option>영국</Option>
                    <Option>호주</Option>
                </CountrySelector>
            )}
            {!isDesktop && isWriteBntOn && (
                <Button onClick={goToWrite}>
                    <GrEdit />
                </Button>
            )}
            {isScrollTopBtnOn && (
                <Button onClick={scrollToTop}>
                    <BiArrowToTop />
                </Button>
            )}
        </Container>
    );
};

const Container = styled.div`
    ${mixin.floatBox(
        "fixed",
        null,
        `${theme.calRem(100)}`,
        `${theme.calRem(100)}`,
    )};
    ${mixin.flexBox(null, null, "column", null)};

    @media ${({ theme }) => theme.mobile} {
        right: ${theme.calRem(30)};
        bottom: ${theme.calRem(100)};
    }
`;

const Button = styled.button`
    background: ${({ theme }) => theme.color.white};
    width: ${({ theme }) => theme.calRem(60)};
    height: ${({ theme }) => theme.calRem(60)};
    ${mixin.flexBox("center", "center", null, null)};
    ${mixin.outline("1px solid", "gray3")}
    ${mixin.textProps(40, "regular", "gray3")}
    border-radius: 50%;
    line-height: 1;
    transition: all 0.3s ease;
    :hover {
        ${mixin.textProps(40, "regular", "gray2")}
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(28, "regular", "gray2")}
        }
    }
    svg {
        vertical-align: middle;
        path {
            stroke: ${({ theme }) => theme.color.gray3};
            :hover {
                stroke: ${({ theme }) => theme.color.gray2};
            }
        }
    }

    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(48)};
        height: ${({ theme }) => theme.calRem(48)};
        ${mixin.textProps(28, "regular", "gray3")}
    }
`;

const ButtonText = styled.span`
    ${mixin.textProps(12, "regular", "gray2")}
    background: white;
    text-align: center;
    ${props => (props.isSelected ? mixin.outline("1px solid", "mainBlue") : "")}
    border-radius: 10px 10px 0 0;
    padding: 5px 0;
    cursor: pointer;
`;

const CountrySelector = styled.div`
    ${props => (props.isBtnOn ? `display:block;` : `display:none;`)};
    border-radius: 0 0 18px 18px;
    background-color: ${props => props.theme.color.mainBlue};
    color: ${props => props.theme.color.white};
    padding: ${({ theme }) => `${theme.calRem(10)}`};
    text-align: center;
    /* padding: ${({ theme }) => `${theme.calRem(12)} ${theme.calRem(33)}`}; */
`;

const Option = styled.div`
    ${props =>
        props.currentCountryId == props.id
            ? mixin.textProps(18, "semiBold", "mainMint")
            : mixin.textProps(18, "semiBold", "blue3")};
    :not(:last-child) {
        margin-bottom: ${({ theme }) => theme.calRem(7)};
    }
`;

export default FloatBox;
