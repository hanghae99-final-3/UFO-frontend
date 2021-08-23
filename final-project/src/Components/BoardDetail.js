import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie"; // 쿠키 훅스
import { useParams } from "react-router-dom"; // 쿼리 스트링 훅스
import { setViewReducer } from "../redux/modules/freeBoardSlice";
import { setUnivViewReducer } from "../redux/modules/univBoardSlice";
import instance from "../api"; // api instance 객체

import Cookies from "js-cookie";
import mixin from "../styles/Mixin"; //css 믹스인 객체
import styled from "styled-components"; // 스타일 컴포넌트
import moment from "moment"; // moment 날짜 라이브러리
import categories from "../categories"; // 태그 카테고리
import { history } from "../redux/configureStore"; //  히스토리 객체
import TimeCounting from "time-counting"; // 작성일 표시 라이브러리
import { ToastContainer, toast } from "react-toastify"; // 토스티 파이 라이브러리
import "react-toastify/dist/ReactToastify.css"; // 토스티파이 css

import {
    getFreePostDB,
    deleteFreePostDB,
    getFreeCommentListDB,
    postLikeToggleDB,
} from "../redux/async/freeBoard";
import {
    deleteUnivBoardPostDB,
    detailUnivBoardPostDB,
    getUnivBoardCommentDB,
    univLikeToggleDB,
} from "../redux/async/univBoard";

import LinkIcon from "@material-ui/icons/Link"; // 링크 공유 아이콘
import { Button as Mbutton } from "@material-ui/core"; // 버튼 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import AccessTimeIcon from "@material-ui/icons/AccessTime"; // 작성일 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘 (색상 있음)
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; //좋아요 아이콘 (색상 없음)

const BoardDetail = ({ page }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams(); // 게시물 아이디
    const userId = useSelector(state => state.user.user.user_id); // 유저 아이디
    const isLoggedInt = useSelector(state => state.user.isLoggedIn); // 로그인 상태

    let now = new Date(); // 게시물 조회 최초 시간
    let after20m = new Date(); // 최초 조회후 20분이후 시간
    const viewCookie = page === "freeboard" ? `f${postId}` : `u${postId}`; // 조회 이력 쿠키 정보
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
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    // 게시물 삭제 핸들러
    const handleDeletePost = () => {
        const req = {
            post_id: post.post_id,
        };
        dispatch(
            page === "freeboard"
                ? deleteFreePostDB(req)
                : deleteUnivBoardPostDB(req),
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
        toast("게시물 링크가 클립보드에 복사되었습니다!");
    };
    // 좋아요 핸들러
    const handleLikeButton = () => {
        if (isLoggedInt) {
            page === "freeboard"
                ? dispatch(postLikeToggleDB(postId))
                : dispatch(univLikeToggleDB(postId));
        }
    };
    // 게시물 작성 버튼 (글쓰기) 핸들러
    const handlePostWrite = () => history.push(`/${page}/write`);
    // 게시물 수정 버튼 핸들러
    const handlePostEdit = () => history.push(`/${page}/edit/${postId}`);
    // 목록으로 돌아가기 버튼 핸들러
    const handleGoToList = () => history.push(`/${page}`);

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
            <ContentHeaderContainer>
                {page === "freeboard" ? (
                    <Tag>
                        #{post && categories.freeBoardTags[post.category]}
                    </Tag>
                ) : (
                    <Tag>
                        #{post && categories.univBoardTags[post.category]}
                    </Tag>
                )}

                <Title>{post && post.title}</Title>
                <NicknameIconContainer>
                    <IconContainer>
                        <Nickname>
                            {post && post.user && post.user.nickname}
                        </Nickname>
                    </IconContainer>

                    <IconContainer>
                        <ToastContainer limit={1} />
                        <Mbutton
                            disableElevation
                            disableRipple
                            onClick={handleCopyUrl}
                        >
                            <Icon>
                                <LinkIcon />
                            </Icon>
                        </Mbutton>
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
                                    post && post.createdAt,
                                    timeOption,
                                )}
                            </CountSpan>
                        </Icon>
                    </IconContainer>
                </NicknameIconContainer>
            </ContentHeaderContainer>
            <ContentBodyContainer>
                {post && (
                    <ContentBody
                        className="ck-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></ContentBody>
                )}
            </ContentBodyContainer>

            <ButtonContainer>
                <ButtonWrapper>
                    <Button onClick={handleLikeButton}>좋아요</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button onClick={handleGoToList}>목록</Button>
                    <Button onClick={handlePostWrite}>글쓰기</Button>
                    {userId &&
                        post &&
                        post.user &&
                        userId === post.user.user_id && (
                            <>
                                <Button onClick={handlePostEdit}>수정</Button>
                                <Button onClick={handleDeletePost}>삭제</Button>
                            </>
                        )}
                </ButtonWrapper>
            </ButtonContainer>
        </MainContentContainer>
    );
};

const MainContentContainer = styled.div`
    margin-top: 30px;
`;
const Tag = styled.span`
    height: 32px;
    min-width: 80px;
    line-height: 28px;
    display: inline-block;
    border-radius: 15px;
    background-color: white;
    ${mixin.outline("2px solid", "blue2")}
    ${mixin.textProps(18, "semiBold", "gray1", "center")}
`;
const Title = styled.h3`
    display: block;
    margin: 20px 0 0 0;
    ${mixin.textProps(30, "extraBlack", "black")}
`;

const CountSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")}
`;
const Nickname = styled.span`
    ${mixin.textProps(14, "semiBold", "gray2")}
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
    }
`;
const IconContainer = styled.div`
    ${mixin.flexBox()}
`;

const ContentHeaderContainer = styled.div`
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const ContentBody = styled.div``;
const ContentBodyContainer = styled.div`
    min-height: 100px;
    ${mixin.flexBox(null, "center")}
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
    ${mixin.flexBox("space-between")}
`;

const ButtonWrapper = styled.div``;
const Button = styled.button`
    width: 94px;
    height: 32px;
    margin-right: 7px;
    border-radius: 16px;
    ${mixin.textProps(18, "semiBold", "white", "center")}
    background-color: ${props => props.theme.color.blue1};
`;

export default BoardDetail;
