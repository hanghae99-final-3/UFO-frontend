import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectCountry from "./SelectCountry";
import { logoutUser } from "../redux/modules/userSlice";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { useLocation } from "react-router";
import mixin from "../styles/Mixin";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { checkLoggedInUser } from "../redux/async/user";
import { onLogout } from "../redux/modules/univBoardSlice";

import logo from "../assets/logo.svg";
import Boop from "../Elements/Boop";
import Sparkles from "../Elements/Sparkles";
import useSound from "use-sound";
import clicked from "../assets/sound/click2.wav";
import logoSound from "../assets/sound/logoSound.wav";
/**
 * @author jiyeong, heesung
 * @param
 * @returns 앱의 헤더
 * @역할 국가선택, 메뉴, 로고, 인삿말 렌더링
 * @필수값
 */

const Header = () => {
    const [menu] = useSound(clicked);
    const [playLogo] = useSound(logoSound);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userName = useSelector(state => state.user.user.nickname);
    const [menuOn, setMenuOn] = useState(false);
    const { pathname } = useLocation();

    //----pathname이 변화하면 메뉴를 닫을 수 있도록 합니다
    useEffect(() => {
        setMenuOn(false);
    }, [pathname]);
    //----

    return (
        <HeaderContainer>
            <Inner>
                <LeftColumn>
                    <Logo onClick={() => history.push("/")}>
                        <Boop rotation={20} timing={200} x={0} y={0}>
                            <img src={logo} />
                        </Boop>
                    </Logo>
                    {/* <SelectCountry /> */}
                </LeftColumn>
                <RightColumn>
                    <Sparkles>
                        <UserName>
                            {/* 유저가 로그인을 하면 유저네임이 나옵니다! */}
                            {userName ? `${userName}님` : "로그인이 필요해요!"}
                        </UserName>
                    </Sparkles>
                    <MenuBtn
                        onClick={() => {
                            setMenuOn(!menuOn);
                        }}
                    >
                        {/* 메뉴버튼 on&off 토글설정 */}
                        {menuOn ? <ClearIcon /> : <MenuIcon />}
                    </MenuBtn>
                    <Menu menuOn={menuOn}>
                        <Controls>
                            <Control>
                                <Link
                                    to={{
                                        pathname: "/freeboard",
                                        state: {
                                            isMatchPathname:
                                                pathname.includes("/freeboard"),
                                        },
                                    }}
                                >
                                    자유게시판
                                </Link>
                            </Control>
                            <Control>
                                <Link
                                    to={{
                                        pathname: "/univboard",
                                        state: {
                                            isMatchPathname:
                                                pathname.includes("/univboard"),
                                        },
                                    }}
                                >
                                    대학게시판
                                </Link>
                            </Control>
                            <Control>
                                <Link
                                    to={{
                                        pathname: "/election",
                                        state: {
                                            isMatchPathname:
                                                pathname.includes("/election"),
                                        },
                                    }}
                                >
                                    투표함
                                </Link>
                            </Control>
                            <Control>
                                <Link
                                    to={{
                                        pathname: "/mypost",
                                        state: {
                                            isMatchPathname:
                                                pathname.includes("/mypost"),
                                        },
                                    }}
                                >
                                    내가 작성한 글
                                </Link>
                            </Control>
                            {isLoggedIn ? (
                                <>
                                    <Control>
                                        <Link
                                            to={{
                                                pathname: "/mypage",
                                                state: {
                                                    isMatchPathname:
                                                        pathname.includes(
                                                            "/mypage",
                                                        ),
                                                },
                                            }}
                                        >
                                            마이 페이지
                                        </Link>
                                    </Control>
                                    <Control>
                                        <Link
                                            to=""
                                            onClick={() => {
                                                dispatch(logoutUser());
                                                dispatch(onLogout());
                                                localStorage.removeItem(
                                                    "token",
                                                );
                                                history.replace("/");
                                                setMenuOn(false);
                                            }}
                                        >
                                            로그아웃
                                        </Link>
                                    </Control>
                                </>
                            ) : (
                                <>
                                    <Control>
                                        <Link
                                            to={{
                                                pathname: "/login",
                                                state: {
                                                    isMatchPathname:
                                                        pathname.includes(
                                                            "/login",
                                                        ),
                                                },
                                            }}
                                        >
                                            로그인
                                        </Link>
                                    </Control>
                                    <Control>
                                        <Link
                                            to={{
                                                pathname: "/signup",
                                                state: {
                                                    isMatchPathname:
                                                        pathname.includes(
                                                            "/signup",
                                                        ),
                                                },
                                            }}
                                        >
                                            회원가입
                                        </Link>
                                    </Control>
                                </>
                            )}
                        </Controls>
                        <AboutUs>
                            <span>about us</span>
                        </AboutUs>
                    </Menu>
                </RightColumn>
            </Inner>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    box-shadow: 0px 4px 7px 0px #e4ddff;
`;

const Inner = styled.div`
    width: 1080px;
    padding: 0 30px;
    margin: auto;
    ${mixin.floatBox("relative")};
    ${mixin.flexBox("space-between", "center", null, "86px")};
`;

const LeftColumn = styled.div`
    display: flex;
`;

const Logo = styled.div`
    cursor: pointer;
`;

const RightColumn = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-right: 20px;
    ${mixin.textProps(30, "extraBold", "gray1")}
`;

const MenuBtn = styled.button`
    background: inherit;
    line-height: 0;
    svg {
        ${mixin.textProps(30, "extraBold", "gray1")}
    }
`;

const Menu = styled.div`
    padding: 80px 0;
    ${props =>
        props.menuOn
            ? mixin.flexBox("space-between", null, "column")
            : "display:none;"};
    height: calc(100vh - 86px);
    width: 500px;
    padding-left: 60px;
    background: ${({ theme }) => theme.color.mainBlue};
    ${mixin.floatBox("absolute", "86px", "0", null, null, 99)}
`;

const Controls = styled.ul`
    ${mixin.flexBox("space-between", null, "column", "75%")}
`;

const Control = styled.li`
    cursor: pointer;
    /* Link의 state를 활용하여 조건부 렌더링을 해보았습니다. */
    a {
        ${({ children }) =>
            children.props.to?.state?.isMatchPathname
                ? mixin.textProps(40, "extraBold", "mainMint")
                : mixin.textProps(40, "extraBold", "blue3")};
    }
`;

const AboutUs = styled.div`
    span {
        ${mixin.textProps(40, "extraBold", "blue3")}
    }
`;

export default Header;
