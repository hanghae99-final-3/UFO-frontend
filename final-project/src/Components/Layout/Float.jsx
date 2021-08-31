import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { useLocation } from "react-router";
import { history } from "../../Redux/configureStore";
import { setDarkTheme } from "../../Redux/Modules/userSlice";
import { getDarkTheme } from "../../Shared/utils";
import { useDispatch, useSelector } from "react-redux";

//아이콘
import { GrEdit } from "react-icons/gr";
import { BiArrowToTop } from "react-icons/bi";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

//컴포넌트
import FloatSelectCountry from "../Shared/FloatSelectCountry";

const Float = ({ isDarkTheme }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [isWriteBntOn, setIsWriteBntOn] = useState(false); //작성버튼을 보여줄지 말지에 대한 판별값, 자유게시판, 국가게시판이면 글쓰기버튼이 생긴다.
    const [isScrollTopBtnOn, setIsScrollTopBtnOn] = useState(false); //위로가기 버튼을 보여줄지 말지에 대한 판별값

    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    const goToWrite = () => {
        //pathname이 freeboard면 자유게시판작성페이지로, 아니면 대학게시판작성페이지로 보낸다.
        if (pathname === "/freeboard") return history.push("/freeboard/write");
        history.push("/univboard/write");
    };

    const scrollToTop = () => {
        //스크롤을 위로 올리는 함수
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const switchDarkTheme = () => {
        //다크모드를 켜고 끄는 함수입니다.
        const LSDarkTheme = getDarkTheme(); //로컬스토리지에 있는 dark모드 값입니다.
        if (LSDarkTheme === "true") {
            dispatch(setDarkTheme(false));
            return localStorage.setItem("ufo_dark_theme", "false");
        }
        if (!LSDarkTheme || LSDarkTheme === "false") {
            dispatch(setDarkTheme(true));
            localStorage.setItem("ufo_dark_theme", "true");
        }
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
        <FloatContainer>
            <FloatBox>
                {/* 국가 선택 */}
                <FloatSelectCountry isDarkTheme={isDarkTheme} />
                {!isDesktop && isWriteBntOn && (
                    <Button isDarkTheme={isDarkTheme} onClick={goToWrite}>
                        ✍{/* <GrEdit /> */}
                    </Button>
                )}

                {/* 다크모드 */}
                <Button isDarkTheme={isDarkTheme} onClick={switchDarkTheme}>
                    {
                        isDarkTheme
                            ? // <FaRegMoon />
                              "🌛"
                            : "🌞"
                        // <FaRegSun />
                    }
                </Button>

                {/* 위로가기 */}
                {isScrollTopBtnOn && (
                    <Button isDarkTheme={isDarkTheme} onClick={scrollToTop}>
                        {/* <BiArrowToTop /> */}
                        🚀
                    </Button>
                )}
            </FloatBox>
        </FloatContainer>
    );
};

const FloatContainer = styled.div`
    position: relative;
`;

const FloatBox = styled.div`
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
    margin-top: ${({ theme }) => theme.calRem(8)};
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
    svg {
        vertical-align: middle;
        path {
            stroke: ${({ theme }) => theme.color.mainMint};
            color: ${({ theme }) => theme.color.mainMint};
        }
    }

    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(48)};
        height: ${({ theme }) => theme.calRem(48)};
        ${mixin.textProps(28, "regular", "mainBlue")}
    }
`;

export default Float;
