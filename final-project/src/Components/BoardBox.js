import React, { useEffect } from "react";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import categories from "../categories";
import { BiHeart } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

/**
 * @author heesung && junghoo
 * @param postList, title, tag, preview
 * @returns 게시글 with 게시글 layout
 * @역할 게시글 view component
 * @필수값 postList, title, tag, preview
 */

const BoardBox = ({
    postList,
    title,
    tag,
    preview,
    boardName,
    myPostTitle,
    mypage,
}) => {
    const dispatch = useDispatch();
    const _onClick = postId => {
        //자유게시판일때,
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };
    const isLike = useSelector(state =>
        boardName === "freeBoard" ? state.freeBoard.list : state.univBoard.list,
    );
    return (
        <BoardContentContainer>
            <Header>
                {tag && <Tag># {tag.categoryName}</Tag>}
                {title && <TitleHeading>{title}</TitleHeading>}
                {myPostTitle && <TitleHeading>{myPostTitle}</TitleHeading>}
                {(title || tag) && (
                    <More onClick={() => history.push(boardName)}>더보기</More>
                )}
            </Header>
            <Content>
                {postList &&
                    postList.map((post, idx) => (
                        <PostContainer
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id);
                            }}
                        >
                            <Title>
                                <SmallTag>
                                    #{" "}
                                    {boardName === "freeboard"
                                        ? categories.freeCategory[post.category]
                                              ?.categoryName
                                        : categories.univCategory[post.category]
                                              ?.categoryName}
                                </SmallTag>
                                <p>{post.title}</p>
                            </Title>
                            {/* <ContentContainer>
                                {preview && (
                                    <PostContent>{post.content}</PostContent>
                                )}
                            </ContentContainer> */}
                            {!mypage && (
                                <IconContainer>
                                    {!tag ? (
                                        <>
                                            <Icon>
                                                <BiHeart />
                                                <span>
                                                    {post.like &&
                                                        post.like.all_like}
                                                </span>
                                            </Icon>
                                            <Icon>
                                                <MdComment />
                                                <span>{post.coment_count}</span>
                                            </Icon>
                                        </>
                                    ) : null}

                                    <Icon>
                                        <VisibilityIcon />
                                        <span>{post.view_count}</span>
                                    </Icon>
                                </IconContainer>
                            )}
                            {mypage && (
                                <IconContainer>
                                    <span>
                                        {post &&
                                            moment(post.createdAt).format(
                                                "YYYY.MM.DD",
                                            )}
                                    </span>
                                </IconContainer>
                            )}
                        </PostContainer>
                    ))}
            </Content>
        </BoardContentContainer>
    );
};

const BoardContentContainer = styled.div`
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Tag = styled.span`
    padding: 0 1rem 0 1rem;
    border: none;
    border-radius: 5rem;
    background-color: #717171;
    color: white;
    font-size: 1.5rem;
`;

const More = styled.div`
    :hover {
        cursor: pointer;
    }
`;

const Content = styled.div``;

const PostContainer = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #fff;
    transition: 0.3s ease;
    :hover {
        cursor: pointer;
        border-bottom: 2px solid #e7e7e7;
        box-shadow: 0px 8px 7px -9px #34495e;
    }
`;

const Title = styled.div`
    display: flex;
`;

const SmallTag = styled.span`
    padding: 0 10px;
    margin-right: 10px;
    border: 1px solid #3b3b3b;
    border-radius: 10px;
    background-color: white;
    color: #505050;
`;

const IconContainer = styled.div`
    display: flex;
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

const TitleHeading = styled.span`
    font-size: 30px;
`;

export default BoardBox;
