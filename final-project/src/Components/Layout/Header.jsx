import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../Redux/configureStore";

//통신
import { onLogout } from "../../Redux/Modules/univBoardSlice";
import { logoutUser } from "../../Redux/Modules/userSlice";

//아이콘
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import logo from "../../Assets/logo.svg";

//사운드
import clicked from "../../Assets/Sound/click2.wav";
import logoSound from "../../Assets/Sound/logoSound.wav";

//애니메이션
import Boop from "../../Elements/Animations/Boop";
import Sparkles from "../../Elements/Animations/Sparkles";
import useSound from "use-sound";

//컴포넌트
import SelectCountry from "../Shared/SelectCountry";

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
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    //----pathname이 변화하면 메뉴를 닫을 수 있도록 합니다
    useEffect(() => {
        document.addEventListener("scroll", () => setMenuOn(false));
        setMenuOn(false);
        return document.removeEventListener("scroll", () => {});
    }, [pathname]);
    //----

    return (
        <HeaderContainer>
            <Inner>
                <LeftColumn>
                    <Logo onClick={() => history.push("/")}>
                        {isDesktop ? (
                            <Boop rotation={20} timing={200} x={0} y={0}>
                                <img src={logo} alt="logo" />
                            </Boop>
                        ) : (
                            <img src={logo} alt="logo" />
                        )}
                    </Logo>
                    {isDesktop && <SelectCountry />}
                </LeftColumn>
                <RightColumn>
                    <Sparkles color="#83ffca">
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
                            {!isDesktop && (
                                <Control>
                                    <SelectCountry />
                                </Control>
                            )}
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
                                            to={{
                                                pathname: "/util/search",
                                                state: {
                                                    isMatchPathname:
                                                        pathname.includes(
                                                            "/util/search",
                                                        ),
                                                },
                                            }}
                                        >
                                            검색
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
                                                pathname: "/util/search",
                                                state: {
                                                    isMatchPathname:
                                                        pathname.includes(
                                                            "/util/search",
                                                        ),
                                                },
                                            }}
                                        >
                                            검색
                                        </Link>
                                    </Control>
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
                                            로그인 / 회원가입
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
    max-width: 1050px;
    padding: 0 30px;
    margin: auto;
    ${mixin.floatBox("relative")};
    ${mixin.flexBox("space-between", "center", null, "80px")};

    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(10)}
            ${({ theme }) => theme.calRem(15)};
        height: 48px;
    }
`;

const LeftColumn = styled.div`
    ${mixin.flexBox(null, "center")}
`;

const Logo = styled.div`
    cursor: pointer;
    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(80)};
        height: ${({ theme }) => theme.calRem(25)};
    }

    img {
        width: 115px;
        height: 45px;

        @media ${({ theme }) => theme.mobile} {
            width: ${({ theme }) => theme.calRem(80)};
            height: ${({ theme }) => theme.calRem(25)};
        }
    }
`;

const RightColumn = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-right: ${({ theme }) => theme.calRem(20)};
    ${mixin.textProps(30, "extraBold", "gray1")}

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(20, "extraBold", "gray1")}
    }
`;

const MenuBtn = styled.button`
    background: inherit;
    line-height: 0;
    svg {
        ${mixin.textProps(30, "extraBold", "gray1")}
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(24, "extraBold", "gray1")}
        }
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

    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(313)};
        height: calc(100vh - 48px);
        top: 48px;
        padding: ${({ theme }) => theme.calRem(35)} 0 0
            ${({ theme }) => theme.calRem(40)};
        ${props => (props.menuOn ? `display:block` : "display:none;")};
    }
`;

const Controls = styled.ul`
    ${mixin.flexBox("space-between", null, "column", "75%")};
    @media ${({ theme }) => theme.mobile} {
        display: block;
        height: max-content;
    }
`;

const Control = styled.li`
    cursor: pointer;
    /* Link의 state를 활용하여 조건부 렌더링을 해보았습니다. */
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(20)};
    }

    a {
        ${({ children }) =>
            children.props.to?.state?.isMatchPathname
                ? mixin.textProps(40, "extraBold", "mainMint")
                : mixin.textProps(40, "extraBold", "blue3")};

        @media ${({ theme }) => theme.mobile} {
            ${({ children }) =>
                children.props.to?.state?.isMatchPathname
                    ? mixin.textProps(28, "extraBold", "mainMint")
                    : mixin.textProps(28, "extraBold", "blue3")};
        }
    }
`;

const AboutUs = styled.div`
    span {
        ${mixin.textProps(40, "extraBold", "blue3")}
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(28, "extraBold", "blue3")};
        }
    }
`;

export default Header;
