import React from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import categories from "../categories";
import TimeCounting from "time-counting";
import { history } from "../redux/configureStore";

import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import mixin from "../styles/Mixin";
import InfinityScroll from "../InfinityScroll";
import moment from "moment";

const MyPostBoardBox = ({
    postList,
    Comment,
    nextCall,
    is_next,
    size,
    isLoading,
}) => {
    // 게시물 클릭시 이벤틀 헨들러
    const _onClick = postId => {};

    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    //-------리턴 컴포넌트----------
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
                                        _onClick(post.post_id);
                                    }}
                                >
                                    <SmallTag>
                                        #
                                        {post.board === "free"
                                            ? categories.freeBoardTags[
                                                  post.category
                                              ]
                                            : categories.univBoardTags[
                                                  post.category
                                              ]}
                                    </SmallTag>
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
                                            {post.board === "free"
                                                ? post["free_comments.content"]
                                                : post["univ_comments.content"]}
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
const SmallTag = styled.span`
    height: 32px;
    min-width: 94px;
    line-height: 28px;
    margin-right: 20px;
    border-radius: 16px;
    background-color: white;
    ${mixin.textProps(18, "semiBold", "gray1", "center")}
    ${mixin.outline("2px solid", "blue2")}
`;
const PostContainer = styled.div`
    display: grid;
    cursor: pointer;
    margin-bottom: 20px;
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
