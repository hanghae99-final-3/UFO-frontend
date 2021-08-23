import React from "react";

import styled from "styled-components";
import categories from "../categories";
import { history } from "../redux/configureStore";

//-----아이콘------
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import mixin from "../styles/Mixin";
import InfinityScroll from "../InfinityScroll";
//----

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
                                                    {post?.like?.is_like ===
                                                    false ? (
                                                        <FavoriteBorder />
                                                    ) : (
                                                        <FavoriteIcon
                                                            style={{
                                                                fill: "#FF5372",
                                                            }}
                                                        />
                                                    )}
                                                    <span>
                                                        {post.like &&
                                                            post.like.all_like}
                                                    </span>
                                                </Icon>
                                                <Icon>
                                                    <MdComment />
                                                    <span>
                                                        {post.comment_count}
                                                    </span>
                                                </Icon>
                                                <Icon>
                                                    <VisibilityIcon />
                                                    <span>
                                                        {post.view_count}
                                                    </span>
                                                </Icon>
                                            </>
                                        </IconContainer>
                                    )}
                                </PostContainer>
                                {/* <Comment>sds</Comment> */}
                            </React.Fragment>
                        ))}
                </InfinityScroll>
            </Content>
        </BoardContainer>
    );
};

//스타일 컴포넌트
const Content = styled.div``;
const BoardContainer = styled.div`
    width: 100%;
`;
const PostTitle = styled.p`
    ${props =>
        props.title || props.tag
            ? mixin.textProps(14, "semiBold", "gray2")
            : mixin.textProps(20, "semiBold", "gray2")}
`;
const SmallTag = styled.span`
    margin-right: 20px;
    border-radius: 16px;
    background-color: ${props =>
        props.announcement ? props.theme.color.mint : "white"};
    height: ${props => (props.title || props.tag ? " 22px" : "32px")};
    min-width: ${props => (props.title || props.tag ? " 74px" : "94px")};
    line-height: ${props => (props.title || props.tag ? "18px" : "28px")};
    ${props =>
        props.title || props.tag
            ? mixin.textProps(12, "semiBold", "gray1", "center")
            : mixin.textProps(
                  18,
                  "semiBold",
                  props.announcement ? "black" : "gray1",
                  "center",
              )}
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue2")}
`;
const PostContainer = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    margin-bottom: 12px;
    cursor: pointer;
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

export default MyPostBoardBox;
