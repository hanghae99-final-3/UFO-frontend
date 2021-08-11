import React, { useEffect } from "react";
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
} from "../redux/async/univBoard";

import { BiHeart } from "react-icons/bi";
import { Button as Mbutton } from "@material-ui/core";
import { MdComment } from "react-icons/md";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LinkIcon from "@material-ui/icons/Link";

import categories from "../categories";
import VisibilityIcon from "@material-ui/icons/Visibility";

import TimeCounting from "time-counting";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCookies } from "react-cookie";
import instance from "../api";
import { setUnivViewReducer } from "../redux/modules/univBoardSlice";

const BoardDetail = ({ page }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();

    // 게시물 상세 정보 스토어 구독
    const post = useSelector(state =>
        page === "freeboard"
            ? state.freeBoard.post
            : state.univBoard.postDetail,
    );
    // 유저 아이디 스토어 구독
    const userId = useSelector(state => state.user.user.user_id);

    //작성 시간 config 설정
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

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
        ); // 게시물 상세정보 api 요청 미들웨어
        dispatch(
            page === "freeboard"
                ? getFreeCommentListDB(postId)
                : getUnivBoardCommentDB(postId),
        ); //특정게시물의 댓글목록 가져오는 함수
        const callView = async () => {
            if (page === "freeboard") {
                await instance.get(`free/post/${postId}/view_count`);
            } else {
                await instance.get(`univ/post/${postId}/view_count`);
            }
            if (page === "freeboard" && cookies.viewCookie !== `f${postId}`) {
                dispatch(setViewReducer());
            } else {
                dispatch(setUnivViewReducer());
            }
        };
        // 쿠키 설정을 통해서 조회수 증가는 20분으로 제한한다.
        if (page === "freeboard" && cookies.viewCookie !== `f${postId}`) {
            after20m.setMinutes(now.getMinutes() + 20);
            setCookie("viewCookie", viewCookie, { expires: after20m });
            callView();
        } else if (
            page === "univboard" &&
            cookies.viewCookie !== `u${postId}`
        ) {
            after20m.setMinutes(now.getMinutes() + 20);
            setCookie("viewCookie", viewCookie, { expires: after20m });
            callView();
        }
    }, [dispatch, postId, page]);

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

    //-----------------게시글 좋아요

    //게시물 좋아요 / 취소 토글
    const Likeit = () => {
        if (page === "freeboard") {
            console.log("freeboard detail liked");
            dispatch(postLikeToggleDB(postId));
        } else if (page === "univboard") {
            console.log("univboard detail liked");
            dispatch(postLikeToggleDB(postId));
        }
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
                    <Nickname>
                        {post && post.user && post.user.nickname}
                    </Nickname>
                    <IconContainer>
                        <ToastContainer />

                        <Mbutton onClick={copyUrl}>
                            <Icon>
                                <LinkIcon />
                            </Icon>
                        </Mbutton>

                        <Icon>
                            <BiHeart
                                onClick={Likeit}
                                style={{ cursor: "pointer" }}
                            />
                            <span>{}</span>
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
                <Button onClick={() => history.push(`/${page}`)}>목록</Button>
                {userId && post && post.user && userId === post.user.user_id && (
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
            </ButtonContainer>
        </MainContentContainer>
    );
};

const Tag = styled.span`
    padding: 2px 15px;
    margin-right: 10px;
    border: 1px solid #3b3b3b;
    border-radius: 15px;
    background-color: white;
    color: #505050;
`;
const Title = styled.h3`
    display: block;
    font-size: 35px;
    color: #707070;
    margin: 20px 0;
`;
const Nickname = styled.span`
    color: #707070;
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
    background-color: #f5f5f5;
    padding: 30px 0 0 0;
`;

const ContentHeaderContainer = styled.div`
    border-bottom: 2px solid #e7e7e7;
    padding: 0 30px 20px 30px;
`;

const NicknameIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const IconContainer = styled.div`
    display: flex;
`;

const ContentBodyContainer = styled.div`
    border-bottom: 2px solid #e7e7e7;
    padding: 0 30px 20px 30px;
    display: flex;
    min-height: 200px;
    align-items: center;
`;
const ContentBody = styled.div``;

const ButtonContainer = styled.div`
    padding: 20px 30px;
`;

const Button = styled.button`
    border: 1px solid #e7e7e7;
    background: white;
    padding: 5px 25px;
    font-size: 12px;
`;

export default BoardDetail;
