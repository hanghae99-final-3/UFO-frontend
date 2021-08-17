import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setViewReducer } from "../redux/modules/freeBoardSlice";
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

import moment from "moment";
import { Button as Mbutton } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LinkIcon from "@material-ui/icons/Link";

import categories from "../categories";
import VisibilityIcon from "@material-ui/icons/Visibility";

import TimeCounting from "time-counting";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import instance from "../api";
import { setUnivViewReducer } from "../redux/modules/univBoardSlice";

//----좋아요
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
//----

import mixin from "../styles/Mixin";

const BoardDetail = ({ page }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    // 게시물 상세 정보 스토어 구독
    const post = useSelector(state =>
        page === "freeboard" ? state.freeBoard.post : state.univBoard.post,
    );
    // 유저 아이디 스토어 구독
    const userId = useSelector(state => state.user.user.user_id);
    const isLoggedin = useSelector(state => state.user.isLoggedIn);
    //작성 시간 config 설정
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    const isLike = useSelector(state =>
        page === "freeboard"
            ? state.freeBoard.post?.is_like
            : state.univBoard.post?.is_like,
    );
    //-------------조회수--------------
    let now = new Date();
    let after20m = new Date();
    const viewCookie = page === "freeboard" ? `f${postId}` : `u${postId}`;
    const [cookies, setCookie, removeCookie] = useCookies([viewCookie]);

    useEffect(() => {
        dispatch(
            page === "freeboard"
                ? getFreePostDB(postId)
                : detailUnivBoardPostDB(postId),
        );
        // 게시물 상세정보 api 요청 미들웨어
        dispatch(
            page === "freeboard"
                ? getFreeCommentListDB(postId)
                : getUnivBoardCommentDB(postId),
        ); //특정게시물의 댓글목록 가져오는 함수
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
        //이미 좋아요 눌렀던 게시물이면 빨간하트 return
    }, [dispatch, postId, page, isLike]);

    //서버에 필요한 정보를 정리하고, 포스트를 삭제하는 미들웨어 함수로 보낸다.
    const deletePost = () => {
        const req = {
            post_id: post.post_id,
        };
        dispatch(
            page === "freeboard"
                ? deleteFreePostDB(req)
                : deleteUnivBoardPostDB(req),
        );
    };

    const copyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        toast("게시물 링크가 클립보드에 복사되었습니다!");
    };
    const onLikeClick = () => {
        page === "freeboard"
            ? dispatch(postLikeToggleDB(postId))
            : dispatch(univLikeToggleDB(postId));
    };
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
                            onClick={copyUrl}
                        >
                            <Icon>
                                <LinkIcon />
                            </Icon>
                        </Mbutton>
                        <Icon>
                            <FormControlLabel
                                style={{ width: "30px" }}
                                control={
                                    <Checkbox
                                        disableElevation
                                        disableRipple
                                        disabled={!isLoggedin}
                                        onClick={onLikeClick}
                                        style={
                                            ({ cursor: "pointer" },
                                            { backgroundColor: "transparent" })
                                        }
                                        icon={
                                            isLike ? (
                                                <FavoriteIcon
                                                    style={{ fill: "#FF5372" }}
                                                />
                                            ) : (
                                                <FavoriteBorder />
                                            )
                                        }
                                        checkedIcon={
                                            isLike ? (
                                                <FavoriteBorder />
                                            ) : (
                                                <FavoriteIcon
                                                    style={{ fill: "#FF5372" }}
                                                />
                                            )
                                        }
                                    />
                                }
                            />
                            <span>{post && post.all_like}</span>
                        </Icon>
                        <Icon>
                            <VisibilityIcon />
                            <span>{post && post.view_count}</span>
                        </Icon>

                        <Icon>
                            <AccessTimeIcon />
                            {TimeCounting(post && post.createdAt, timeOption)}
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
                    <Button>좋아요</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button onClick={() => history.push(`/${page}`)}>
                        목록
                    </Button>
                    <Button>글쓰기</Button>
                    {userId &&
                        post &&
                        post.user &&
                        userId === post.user.user_id && (
                            <>
                                <Button
                                    onClick={() =>
                                        history.push(`/${page}/edit/${postId}`)
                                    }
                                >
                                    수정
                                </Button>
                                <Button onClick={deletePost}>삭제</Button>
                            </>
                        )}
                </ButtonWrapper>
            </ButtonContainer>
        </MainContentContainer>
    );
};

const Tag = styled.span`
    height: 32px;
    min-width: 80px;
    ${mixin.textProps(18, "regular", "gray1")}
    border: 2px solid ${props => props.theme.color.blue3};
    border-radius: 15px;
    background-color: white;
    text-align: center;
    line-height: 28px;
    display: inline-block;
`;
const Title = styled.h3`
    display: block;
    ${mixin.textProps(30, "regular", "black")}
    margin: 20px 0 0 0;
`;
const Nickname = styled.span`
    ${mixin.textProps(14, "regular", "gray2")}
    line-height: 29px;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
    }
    svg {
        font-size: 20px;
        margin: 0 5px 0 10px;
    }
`;

const MainContentContainer = styled.div`
    padding: 30px 0 0 0;
`;

const ContentHeaderContainer = styled.div`
    border-bottom: 1.5px solid ${props => props.theme.color.mainGray};
`;

const NicknameIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
`;

const IconContainer = styled.div`
    display: flex;
`;

const ContentBodyContainer = styled.div`
    border-bottom: 1.5px solid ${props => props.theme.color.mainGray};
    display: flex;
    min-height: 100px;
    align-items: center;
`;
const ContentBody = styled.div``;

const ButtonContainer = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    width: 94px;
    height: 32px;
    margin-right: 7px;
    border-radius: 16px;
    text-align: center;
    font-size: ${props => props.theme.fontSize[18]};
    font-weight: ${props => props.theme.fontWeight.regular};
    color: ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.blue1};
`;

const ButtonWrapper = styled.div``;

export default BoardDetail;
