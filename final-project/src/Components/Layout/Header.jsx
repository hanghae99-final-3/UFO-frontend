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
import desktopLogo from "../../Assets/desktop_logo.svg";
import mobileLogo from "../../Assets/mobile_logo.svg";

//사운드
import clicked from "../../Assets/Sound/click2.wav";
import logoSound from "../../Assets/Sound/logoSound.wav";

//애니메이션
import Boop from "../../Elements/Animations/Boop";
import Sparkles from "../../Elements/Animations/Sparkles";
import useSound from "use-sound";

//컴포넌트
import SelectCountry from "../Shared/SelectCountry";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

/**
 * @author jiyeong, heesung
 * @param
 * @returns 앱의 헤더
 * @역할 국가선택, 메뉴, 로고, 인삿말 렌더링
 * @필수값
 */

const Header = () => {
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
    //로고 클릭스 위로 스크롤 및 새로고침
    const LogoClick = () => {
        window.location.replace("/");
    };

    return (
        <HeaderContainer>
            <Inner>
                <LeftColumn>
                    <Logo onClick={LogoClick}>
                        {isDesktop ? (
                            <Boop rotation={20} timing={200} x={0} y={0}>
                                <img src={desktopLogo} alt="logo" />
                            </Boop>
                        ) : (
                            <img src={mobileLogo} alt="logo" />
                        )}
                    </Logo>
                    {isDesktop && <SelectCountry />}
                </LeftColumn>
                <RightColumn>
                    {/* 유저가 로그인을 하면 유저네임이 나옵니다! */}
                    {userName ? (
                        <Sparkles color="#83ffca">
                            <UserName>{userName}님</UserName>
                        </Sparkles>
                    ) : (
                        <DefaultButton
                            rightGap="10px"
                            onClick={() => history.push("/login")}
                        >
                            로그인하러가기
                        </DefaultButton>
                    )}

                    <MenuBtn
                        onClick={() => {
                            setMenuOn(!menuOn);
                        }}
                    >
                        {/* 메뉴버튼 on&off 토글설정 */}
                        {menuOn ? <ClearIcon /> : <MenuIcon />}
                    </MenuBtn>
                    <MenuContainer menuOn={menuOn}>
                        <Menu menuOn={menuOn}>
                            {!isDesktop && (
                                <>
                                    <SelectCountryTitle>
                                        국가 범위 설정
                                    </SelectCountryTitle>
                                    <SelectCountry />
                                </>
                            )}
                            <Controls>
                                <Control>
                                    <Link
                                        to={{
                                            pathname: "/univboard",
                                            state: {
                                                isMatchPathname:
                                                    pathname.includes(
                                                        "/univboard",
                                                    ),
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
                                                    pathname.includes(
                                                        "/freeboard",
                                                    ),
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
                                                    pathname.includes(
                                                        "/election",
                                                    ),
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
                    </MenuContainer>
                </RightColumn>
            </Inner>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    position: fixed;
    width: 100%;
    box-shadow: 0px 4px 7px 0px #e4ddff;
    background: ${({ theme }) => theme.color.white};
    z-index: 99;
`;

const Inner = styled.div`
    max-width: 1050px;
    margin: auto;
    ${mixin.floatBox("relative")};
    ${mixin.flexBox("space-between", "center", null, "80px")};

    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => `${theme.calRem(10)} ${theme.calRem(10)}`};
        height: 48px;
    }
`;

const LeftColumn = styled.div`
    ${mixin.flexBox(null, "center")}
`;

const Logo = styled.div`
    cursor: pointer;
    margin-right: ${({ theme }) => theme.calRem(50)};

    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(80)};
        height: ${({ theme }) => theme.calRem(25)};
    }

    img {
        width: 115px;
        height: 45px;

        @media ${({ theme }) => theme.mobile} {
            width: auto;
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

const GoLogin = styled.button``;

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

const MenuContainer = styled.div`
    width: 100%;
    position: relative;
    height: calc(100vh - 80px);
    ${mixin.floatBox("absolute", "80px", "0", null, null, 99)}
    ${props =>
        props.menuOn
            ? `display:flex; justify-content:flex-end;`
            : `display:none;`};

    //헤더의 그림자를 가리지 않으면서 컨텐츠흐림처리를 하기위해 before을 사용하였습니다.
    ::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: inset -13px 3px 7px 0px #e4ddff;
    }
    @media ${({ theme }) => theme.mobile} {
        height: calc(100vh - 48px);
        top: 48px;
    }
`;

const Menu = styled.div`
    z-index: 10;
    padding: 80px 0;
    padding-left: 60px;
    ${props =>
        props.menuOn ? mixin.flexBox("space-between", null, "column") : ""};
    ${props => (props.menuOn ? `display:flex;` : `display:none;`)};

    width: 500px;
    background: ${({ theme }) => theme.color.mainBlue};
    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(313)};
        height: calc(100vh - 48px);
        padding: ${({ theme }) => theme.calRem(35)} 0 0
            ${({ theme }) => theme.calRem(40)};
        ${props => (props.menuOn ? `display:block;` : `display:none;`)};
    }
`;

const SelectCountryTitle = styled.span`
    //모바일에서만 작동하는 요소입니다.
    ${mixin.textProps(28, "extraBold", "blue3")}
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.calRem(8)};
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
