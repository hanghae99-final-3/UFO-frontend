import React from "react";
import mixin from "../styles/Mixin"; // 믹스인 객체
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import categories from "../categories"; // 카테고리 객체
import TimeCounting from "time-counting"; // 타임 카운팅(게시물 작성일 표시) 라이브러리
import { history } from "../redux/configureStore"; // 히스토리 객체
import InfinityScroll from "../InfinityScroll"; // 무한 스크롤 컴포넌트
import moment from "moment"; // 모멘트 (날짜 생성) 라이브러리
import DefaultTag from "../Elements/Tag/DefaultTag"; // 태그 스타일 컴포넌트

import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘

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

    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
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
                                    <DefaultTag rightGap="20px">
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

                                    {Comment ? null : (
                                        <IconContainer>
                                            <>
                                                <Icon>
                                                    <IconSpan>
                                                        {TimeCounting(
                                                            post.createdAt,
                                                            timeOption,
                                                        )}
                                                    </IconSpan>
                                                </Icon>
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
                                            </>
                                        </IconContainer>
                                    )}
                                </PostContainer>
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
`;
const IconSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")}
`;
const BoardContainer = styled.div`
    width: 100%;
`;
const PostTitle = styled.p`
    ${mixin.flexBox(null, "center")}
    ${mixin.textProps(20, "semiBold", "gray2")}
`;

const PostContainer = styled.div`
    display: grid;
    cursor: pointer;
    margin-bottom: 12px;
    grid-template-columns: max-content 1fr max-content;
`;
const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 40px);
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
`;
const MyComment = styled.span`
    margin-left: 11%;
    ${mixin.textProps(20, "semiBold", "gray1")}
`;

export default MyPostBoardBox;
