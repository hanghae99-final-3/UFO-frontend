import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Boop from "../Elements/Boop";
import moment from "moment";
import styled from "styled-components";
import categories from "../categories";
import { history } from "../redux/configureStore";

//-----아이콘------
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import mixin from "../styles/Mixin";
//----

const BoardBox = ({
    postList,
    fixedList,
    title,
    tag,
    boardName,
    myPostTitle,
    mypage,
    announcement,
}) => {
    // 게시물 클릭시 이벤틀 헨들러
    const _onClick = postId => {
        //자유게시판일때,
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    // 더보기 클릭 이벤트 헨들러
    const onToMoreClicked = () => {
        history.push(boardName);
    };

    //-------리턴 컴포넌트----------
    return (
        <BoardContainer>
            <Header>
                {tag && <LargeTag># {tag.categoryName}</LargeTag>}
                {title && <TitleHeading>{title}</TitleHeading>}
                {myPostTitle && <TitleHeading>{myPostTitle}</TitleHeading>}
                {(title || tag) && (
                    <Boop rotation={15} timing={200}>
                        <More onClick={onToMoreClicked}>더보기</More>
                    </Boop>
                )}
            </Header>
            <Content>
                {fixedList &&
                    fixedList.map((post, idx) => (
                        <PostContainer
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id);
                            }}
                        >
                            <Title>
                                <SmallTag>공지</SmallTag>
                                <p>{post.title}</p>
                            </Title>

                            {!mypage && (
                                <IconContainer>
                                    {!tag ? (
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
                                    {!announcement && "#"}
                                    {boardName === "freeboard" &&
                                        !announcement &&
                                        categories.freeCategory[post.category]
                                            ?.categoryName}
                                    {boardName === "univboard" &&
                                        !announcement &&
                                        categories.univCategory[post.category]
                                            ?.categoryName}
                                    {boardName === "univboard" &&
                                        boardName &&
                                        announcement &&
                                        "공지"}
                                </SmallTag>
                                <PostTitle>{post.title}</PostTitle>
                            </Title>

                            {!mypage && (
                                <IconContainer>
                                    {!tag ? (
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
        </BoardContainer>
    );
};

//--------스타일 컴포넌트-----------

const BoardContainer = styled.div`
    margin-top: 15px;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

// 태그
const LargeTag = styled.span`
    padding: 0 1rem 0 1rem;
    border: none;
    border-radius: 5rem;
    background-color: #717171;
    color: white;
    font-size: 1.5rem;
`;

const SmallTag = styled.span`
    min-width: 94px;
    height: 32px;
    ${mixin.textProps(18, "regular", "gray1")}
    text-align: center;
    margin-right: 20px;
    border: 3px solid ${props => props.theme.color.blue3};
    border-radius: 16px;
    background-color: white;
    line-height: 28px;
`;

// 더보기 버튼
const More = styled.div`
    :hover {
        cursor: pointer;
    }
`;

// 텍스트

const PostTitle = styled.p`
    ${mixin.textProps(20, "regular", "grey1")}
`;
const Content = styled.div``;

const PostContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    display: flex;
    width: 130px;
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
