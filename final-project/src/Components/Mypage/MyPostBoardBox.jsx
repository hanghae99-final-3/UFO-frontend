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

//컴포넌트
import InfinityScroll from "../Shared/InfinityScroll"; // 무한 스크롤 컴포넌트
import DefaultTag from "../../Elements/Tag/DefaultTag"; // 태그 스타일 컴포넌트

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
        console.log("clicked");
        if (board === "free")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    // 데스크탑 사이즈인지 아닌지 판별하는 변수
    const isMobile =
        document.documentElement.clientWidth <= 1080 ? true : false;

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
                                    <PostTitle>{post.title}</PostTitle>
                                    {Comment ? null : isMobile ? null : (
                                        <IconContainer>
                                            <>
                                                <Icon>
                                                    <MdComment />
                                                    <IconSpan>
                                                        {post.comment_count}
                                                    </IconSpan>
                                                </Icon>
                                                <Icon>
                                                    <VisibilityIcon />
                                                    <IconSpan>
                                                        {post.view_count}
                                                    </IconSpan>
                                                </Icon>
                                                <Icon>
                                                    <IconSpan>
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
                                    <IconContainer>
                                        <>
                                            <Icon>
                                                <MdComment />
                                                <IconSpan>
                                                    {post.comment_count}
                                                </IconSpan>
                                            </Icon>
                                            <Icon>
                                                <VisibilityIcon />
                                                <IconSpan>
                                                    {post.view_count}
                                                </IconSpan>
                                            </Icon>
                                            <Icon>
                                                <IconSpan>
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
                                    <CommentContent>
                                        <MyComment>
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
        ${mixin.outline("1px solid", "mainGray", "bottom")};
    }
`;
const IconSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")};
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(11, "semiBold", "gray3")}
    }
`;
const BoardContainer = styled.div`
    width: 100%;
`;
const PostTitle = styled.span`
    ${mixin.flexBox(null, "center")};
    ${mixin.textProps(20, "semiBold", "gray2")};
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "gray2")};
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
        ${mixin.outline("1px solid", "mainGray", "bottom")};
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
    span {
        line-height: 1;
        font-size: ${({ theme }) => theme.fontSize["12"]};
    }
    svg {
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
    ${mixin.textProps(20, "semiBold", "gray1")};
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "gray1")};
        margin-left: 0px;
    }
`;

export default MyPostBoardBox;
