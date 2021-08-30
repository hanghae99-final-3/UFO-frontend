import React, { useEffect } from "react";
import styled from "styled-components"; // 스타일 컴포넌트
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { history } from "../../Redux/configureStore"; //  히스토리 객체
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie"; // 쿠키 훅스
import { useParams } from "react-router-dom"; // 쿼리 스트링 훅스
import categories from "../../Shared/categories"; // 태그 카테고리

//통신
import { setUnivViewReducer } from "../../Redux/Modules/univBoardSlice";
import { setViewReducer } from "../../Redux/Modules/freeBoardSlice";
import instance from "../../Shared/api"; // api instance 객체
import {
    getFreePostDB,
    deleteFreePostDB,
    getFreeCommentListDB,
    postLikeToggleDB,
} from "../../Redux/Async/freeBoard";
import {
    deleteUnivBoardPostDB,
    detailUnivBoardPostDB,
    getUnivBoardCommentDB,
    univLikeToggleDB,
} from "../../Redux/Async/univBoard";

//작성일 라이브러리
import moment from "moment"; // moment 날짜 라이브러리
import TimeCounting from "time-counting"; // 작성일 표시 라이브러리

//alert
import confirm from "../../Shared/confirm";
import "react-toastify/dist/ReactToastify.css"; // 토스티파이 css

//아이콘
import LinkIcon from "@material-ui/icons/Link"; // 링크 공유 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import AccessTimeIcon from "@material-ui/icons/AccessTime"; // 작성일 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘 (색상 있음)
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; //좋아요 아이콘 (색상 없음)
import Swal from "sweetalert2";

//컴포넌트
import DefaultTag from "../../Elements/Tag/DefaultTag";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const BoardDetail = ({ page }) => {
    // const [play] = useSound(boopSfx);

    const dispatch = useDispatch();
    const { id: postId } = useParams(); // 게시물 아이디
    const userId = useSelector(state => state.user.user.user_id); // 유저 아이디
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // 로그인 상태
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드

    let now = new Date(); // 게시물 조회 최초 시간
    let after20m = new Date(); // 최초 조회후 20분이후 시간
    const viewCookie = page === "freeboard" ? `f${postId}` : `u${postId}`; // 조회 이력 쿠키 정보
    // eslint-disable-next-line no-unused-vars
    const [_, setCookie, __] = useCookies([viewCookie]); // useCookie 훅스

    // 게시물 상세 정보
    const post = useSelector(state =>
        page === "freeboard" ? state.freeBoard.post : state.univBoard.post,
    );
    // 좋아요 유무
    const isLike = useSelector(state =>
        page === "freeboard"
            ? state.freeBoard.post?.is_like
            : state.univBoard.post?.is_like,
    );
    // TimeCounting Configure 정보
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY/MM/DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    // 게시물 삭제 핸들러
    const handleDeletePost = () => {
        const req = {
            post_id: post.post_id,
        };
        confirm.deleteConfirm(() =>
            dispatch(
                page === "freeboard"
                    ? deleteFreePostDB(req)
                    : deleteUnivBoardPostDB(req),
            ),
        );
    };
    // 게시물 링크 공유 버튼 핸들러
    const handleCopyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "게시물 링크가 클립보드에 복사되었습니다!",
            showConfirmButton: false,
            timer: 1500,
        });
    };
    // 좋아요 핸들러
    const handleLikeButton = () => {
        if (isLoggedIn) {
            page === "freeboard"
                ? dispatch(postLikeToggleDB(postId))
                : dispatch(univLikeToggleDB(postId));
        } else {
            Swal.fire("로그인이 필요합니다.");
        }
    };
    // 게시물 작성 버튼 (글쓰기) 핸들러
    const handlePostWrite = () => history.push(`/${page}/write`);
    // 게시물 수정 버튼 핸들러
    const handlePostEdit = () => history.push(`/${page}/edit/${postId}`);
    // 목록으로 돌아가기 버튼 핸들러
    const handleGoToList = () => history.push(`/${page}`);

    useEffect(() => {
        //첫 렌더링시에 스크롤이 내려와있으면 올려준다.
        const scrollToTop = () => {
            //스크롤을 위로 올리는 함수
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
        if (window.pageYOffset > 0) scrollToTop();
    }, []);

    useEffect(() => {
        // 상세보기 페이지 url을 확인후 자유 게시판 or 대학 게시판 게시물 판별

        dispatch(
            page === "freeboard"
                ? getFreePostDB(postId)
                : detailUnivBoardPostDB(postId),
        );
        // 게시물 상세정보 요청
        dispatch(
            page === "freeboard"
                ? getFreeCommentListDB(postId)
                : getUnivBoardCommentDB(postId),
        ); //특정게시물의 댓글목록 가져오는 함수

        // 조회수 증감 함수
        const callView = async () => {
            if (page === "freeboard") {
                await instance.get(`free/post/${postId}/view_count`);
                if (post) {
                    dispatch(setViewReducer());
                }
            } else {
                await instance.get(`univ/post/${postId}/view_count`);
                if (post) {
                    dispatch(setUnivViewReducer());
                }
            }
        };
        // 쿠키 설정을 통해서 조회수 증가는 20분으로 제한한다.
        if (
            page === "freeboard" &&
            Cookies.get(`viewCookie_f${postId}`) !== `f${postId}`
        ) {
            after20m.setMinutes(now.getMinutes() + 10);
            setCookie(`viewCookie_f${postId}`, viewCookie, {
                expires: after20m,
            });
            callView();
        } else if (
            page === "univboard" &&
            Cookies.get(`viewCookie_u${postId}`) !== `u${postId}`
        ) {
            after20m.setMinutes(now.getMinutes() + 10);
            setCookie(`viewCookie_u${postId}`, viewCookie, {
                expires: after20m,
            });
            callView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, postId, page, isLike]);

    return (
        <MainContentContainer>
            <Page isDarkTheme={isDarkTheme} onClick={handleGoToList}>
                {page === "freeboard" ? "자유 게시판" : "대학 게시판"}
            </Page>
            <ContentHeaderContainer isDarkTheme={isDarkTheme}>
                {page === "freeboard" ? (
                    <DefaultTag>
                        #{post && categories.freeBoardTags[post.category]}
                    </DefaultTag>
                ) : (
                    <DefaultTag>
                        #{post && categories.univBoardTags[post.category]}
                    </DefaultTag>
                )}

                <Title isDarkTheme={isDarkTheme}>{post && post.title}</Title>
                <NicknameIconContainer>
                    <IconContainer>
                        <Nickname isDarkTheme={isDarkTheme}>
                            {post && post.user && post.user.nickname}
                        </Nickname>
                    </IconContainer>

                    <IconContainer>
                        <Icon>
                            <LinkIcon id="link" onClick={handleCopyUrl} />
                        </Icon>

                        <Icon>
                            {isLike ? (
                                <FavoriteIcon style={{ fill: "#FF5372" }} />
                            ) : (
                                <FavoriteBorder />
                            )}
                            <CountSpan>{post && post.all_like}</CountSpan>
                        </Icon>
                        <Icon>
                            <VisibilityIcon />
                            <CountSpan>{post && post.view_count}</CountSpan>
                        </Icon>

                        <Icon>
                            <AccessTimeIcon />
                            <CountSpan>
                                {TimeCounting(
                                    post && post.createdAt.replace(/-/g, "/"),
                                    timeOption,
                                )}
                            </CountSpan>
                        </Icon>
                    </IconContainer>
                </NicknameIconContainer>
            </ContentHeaderContainer>
            <ContentBodyContainer isDarkTheme={isDarkTheme}>
                {post && (
                    <ContentBody
                        className="ck-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></ContentBody>
                )}
            </ContentBodyContainer>

            <ButtonContainer>
                <ButtonWrapper>
                    <DefaultButton onClick={handleLikeButton}>
                        좋아요
                    </DefaultButton>
                </ButtonWrapper>
                <ButtonWrapper>
                    <DefaultButton onClick={handleGoToList}>목록</DefaultButton>
                    <DefaultButton
                        leftGap={theme.calRem(7)}
                        onClick={handlePostWrite}
                    >
                        글쓰기
                    </DefaultButton>
                    {userId &&
                        post &&
                        post.user &&
                        userId === post.user.user_id && (
                            <>
                                <DefaultButton
                                    leftGap={theme.calRem(7)}
                                    onClick={handlePostEdit}
                                >
                                    수정
                                </DefaultButton>
                                <DefaultButton
                                    leftGap={theme.calRem(7)}
                                    onClick={handleDeletePost}
                                >
                                    삭제
                                </DefaultButton>
                            </>
                        )}
                </ButtonWrapper>
            </ButtonContainer>
        </MainContentContainer>
    );
};

const MainContentContainer = styled.div`
    margin-top: 30px;

    @media ${({ theme }) => theme.mobile} {
        margin-top: 10px;
    }
`;

const Title = styled.h3`
    display: block;
    margin: 20px 0 0 0;
    ${props =>
        mixin.textProps(
            30,
            "extraBlack",
            props.isDarkTheme ? "white" : "black",
        )};

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(13)};
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
    }
`;

const CountSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")}

    //모바일 사이즈
     @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(11, "semiBold", "gray3")}
    }
`;
const Nickname = styled.span`
    ${props =>
        mixin.textProps(14, "semiBold", props.isDarkTheme ? "gray3" : "gray2")}

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(8)};
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )}
    }
`;
const NicknameIconContainer = styled.div`
    padding-bottom: 10px;
    ${mixin.flexBox("space-between", "flex-end")}
`;
const Icon = styled.div`
    ${mixin.flexBox(null, "center", null, null)}
    span {
        line-height: 1;
    }
    svg {
        font-size: 20px;
        margin: 0 5px 0 10px;
        color: white;
    }
    margin-top: 10px;

    #link {
        cursor: pointer;
    }

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        svg {
            font-size: 16px;
            margin: 0 4px 0 10px;
        }
    }
`;
const IconContainer = styled.div`
    ${mixin.flexBox()};
`;

const ContentHeaderContainer = styled.div`
    ${props =>
        mixin.outline(
            "1.5px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )}
`;
const ContentBody = styled.div`
    padding: 30px 0;

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        padding: 24px 0;
    }
`;
const ContentBodyContainer = styled.div`
    min-height: 100px;
    ${mixin.flexBox(null, "center")}
    ${props =>
        mixin.outline(
            "1.5px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )}
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
    ${mixin.flexBox("space-between")}

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: 8px;
    }
`;

const ButtonWrapper = styled.div``;

const Page = styled.span`
    display: inline-block;
    margin-bottom: 20px;
    cursor: pointer;
    ${props =>
        mixin.textProps(
            40,
            "extraBold",
            props.isDarkTheme ? "white" : "back",
            "center",
        )}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "back",
                "center",
            )}
    }
`;

export default BoardDetail;
