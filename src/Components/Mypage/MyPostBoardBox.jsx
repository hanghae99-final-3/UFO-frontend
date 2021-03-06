import React from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories"; // 카테고리 객체
import { history } from "../../Redux/configureStore";

//시간 카운팅
import moment from "moment"; // 모멘트 (날짜 생성) 라이브러리
import TimeCounting from "time-counting"; // 타임 카운팅(게시물 작성일 표시) 라이브러리

//아이콘
import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import AccessTimeIcon from "@material-ui/icons/AccessTime"; // 작성일 아이콘

//컴포넌트
import InfinityScroll from "../Shared/InfinityScroll"; // 무한 스크롤 컴포넌트
import DefaultTag from "../../Elements/Tag/DefaultTag"; // 태그 스타일 컴포넌트
import { useSelector } from "react-redux";

const MyPostBoardBox = ({
    postList,
    Comment,
    nextCall,
    is_next,
    size,
    isLoading,
}) => {
    // 게시물 클릭시 이벤틀 헨들러
    const _onClick = (postId, board) => {
        //자유게시판일때,

        if (board === "free")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    // 데스크탑 사이즈인지 아닌지 판별하는 변수
    const isMobile =
        document.documentElement.clientWidth <= 1080 ? true : false;
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY/MM/DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    return (
        <BoardContainer>
            <Content>
                <InfinityScroll
                    nextCall={nextCall}
                    is_next={is_next}
                    size={size}
                    is_loading={isLoading}
                >
                    {postList &&
                        postList.map((post, idx) => (
                            <React.Fragment key={idx}>
                                <PostContainer
                                    isDarkTheme={isDarkTheme}
                                    key={idx}
                                    onClick={() => {
                                        _onClick(post.post_id, post.board);
                                    }}
                                >
                                    <DefaultTag
                                        rightGap={isMobile ? "8px" : "20px"}
                                    >
                                        #
                                        {post.board === "free"
                                            ? categories.freeBoardTags[
                                                  post.category
                                              ]
                                            : categories.univBoardTags[
                                                  post.category
                                              ]}
                                    </DefaultTag>
                                    <PostTitle isDarkTheme={isDarkTheme}>
                                        {post.title}
                                    </PostTitle>
                                    {Comment ? null : isMobile ? null : (
                                        <IconContainer
                                            isDarkTheme={isDarkTheme}
                                        >
                                            <>
                                                <Icon
                                                    isDesktop={isDesktop}
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    <MdComment />
                                                    <IconSpan
                                                        isDarkTheme={
                                                            isDarkTheme
                                                        }
                                                    >
                                                        {post.comment_count}
                                                    </IconSpan>
                                                </Icon>
                                                <Icon
                                                    isDesktop={isDesktop}
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    <VisibilityIcon />
                                                    <IconSpan
                                                        isDarkTheme={
                                                            isDarkTheme
                                                        }
                                                    >
                                                        {post.view_count}
                                                    </IconSpan>
                                                </Icon>
                                                <Icon
                                                    isDesktop={isDesktop}
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    <AccessTimeIcon />
                                                    <IconSpan
                                                        isDarkTheme={
                                                            isDarkTheme
                                                        }
                                                    >
                                                        {TimeCounting(
                                                            post.createdAt,
                                                            timeOption,
                                                        )}
                                                    </IconSpan>
                                                </Icon>
                                            </>
                                        </IconContainer>
                                    )}
                                </PostContainer>
                                {!Comment && isMobile && (
                                    <IconContainer isDarkTheme={isDarkTheme}>
                                        <>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                <MdComment />
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.comment_count}
                                                </IconSpan>
                                            </Icon>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                <VisibilityIcon />
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.view_count}
                                                </IconSpan>
                                            </Icon>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                <AccessTimeIcon />
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {TimeCounting(
                                                        post.createdAt.replace(
                                                            /\-/g,
                                                            "/",
                                                        ),
                                                        timeOption,
                                                    )}
                                                </IconSpan>
                                            </Icon>
                                        </>
                                    </IconContainer>
                                )}

                                {Comment && (
                                    <CommentContent isDarkTheme={isDarkTheme}>
                                        <MyComment isDarkTheme={isDarkTheme}>
                                            {post.comment.content}
                                        </MyComment>
                                    </CommentContent>
                                )}
                            </React.Fragment>
                        ))}
                </InfinityScroll>
            </Content>
        </BoardContainer>
    );
};

//스타일 컴포넌트
const Content = styled.div``;
const CommentContent = styled.div`
    margin-bottom: 20px;
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(13)};
        ${props =>
            mixin.outline(
                "1px solid",
                props.isDarkTheme ? "darkLine" : "mainGray",
                "bottom",
            )};
    }
`;
const IconSpan = styled.span`
    ${props =>
        mixin.textProps(12, "semiBold", props.isDarkTheme ? "gray2" : "gray3")};
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                111,
                "semiBold",
                props.isDarkTheme ? "gray2" : "gray3",
            )};
    }
`;
const BoardContainer = styled.div`
    width: 100%;
`;
const PostTitle = styled.span`
    ${mixin.flexBox(null, "center")};
    ${props =>
        mixin.textProps(20, "semiBold", props.isDarkTheme ? "gray3" : "gray2")};
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                16,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )};
    }
`;

const PostContainer = styled.div`
    display: grid;
    cursor: pointer;
    margin-bottom: 12px;
    grid-template-columns: max-content 1fr max-content;

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }
`;
const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 50px);
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(16)};
        ${props =>
            mixin.outline(
                "1px solid",
                props.isDarkTheme ? "darkLine" : "mainGray",
                "bottom",
            )};
        margin-bottom: ${({ theme }) => theme.calRem(16)};
        display: flex;
        div {
            :nth-child(2) {
                margin: 0 ${({ theme }) => theme.calRem(17)};
            }
        }
    } ;
`;
const Icon = styled.div`
    display: flex;
    align-items: center;
    width: ${props => (props.isDesktop ? "100px" : null)};
    span {
        line-height: 1;
        font-size: ${({ theme }) => theme.fontSize["12"]};
    }
    svg {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.gray2
                : props.theme.color.gray3};
        font-size: ${props => (props.title || props.tag ? "17px" : "20px")};
    }
    @media ${({ theme }) => theme.mobile} {
        span {
            margin-left: ${({ theme }) => theme.calRem(4)};
        }
        svg {
            font-size: 16px;
        }
    } ;
`;
const MyComment = styled.span`
    margin-left: 11%;
    ${props =>
        mixin.textProps(
            20,
            "semiBold",
            props.isDarkTheme ? "mainGray" : "gray1",
        )};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                16,
                "semiBold",
                props.isDarkTheme ? "mainGray" : "gray1",
            )};
        margin-left: 0px;
    }
`;

export default MyPostBoardBox;
