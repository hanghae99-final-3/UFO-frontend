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
            {tag || title ? (
                <Header>
                    {tag && <LargeTag>#{tag.categoryName}</LargeTag>}
                    {title && <TitleHeading>{title}</TitleHeading>}
                    {myPostTitle && <TitleHeading>{myPostTitle}</TitleHeading>}
                    {(title || tag) && (
                        <Boop rotation={15} timing={200}>
                            <More onClick={onToMoreClicked}>더보기</More>
                        </Boop>
                    )}
                </Header>
            ) : null}

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
                                <AnnounceTag title={title} tag={tag}>
                                    공지
                                </AnnounceTag>
                                <AnnounceTitle title={title} tag={tag}>
                                    {post.title}
                                </AnnounceTitle>
                            </Title>

                            {!mypage && (
                                <IconContainer>
                                    {!tag ? (
                                        <>
                                            <Icon title={title} tag={tag}>
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
                                            <Icon title={title} tag={tag}>
                                                <MdComment />
                                                <span>{post.coment_count}</span>
                                            </Icon>
                                        </>
                                    ) : null}

                                    <Icon title={title} tag={tag}>
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
                                <SmallTag
                                    title={title}
                                    tag={tag}
                                    announcement={announcement}
                                >
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
                                <PostTitle tag={tag} title={title}>
                                    {post.title}
                                </PostTitle>
                            </Title>

                            {!mypage && (
                                <IconContainer>
                                    {!tag || !title ? (
                                        <>
                                            <Icon title={title} tag={tag}>
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
                                            <Icon title={title} tag={tag}>
                                                <MdComment />
                                                <span>{post.coment_count}</span>
                                            </Icon>
                                        </>
                                    ) : null}

                                    <Icon title={title} tag={tag}>
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
    width: 100%;
`;
const Header = styled.div`
    margin-bottom: 10px;
    padding-bottom: 8px;
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
    ${mixin.flexBox("space-between", "flex-end", null, null)}
`;

const LargeTag = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
const TitleHeading = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
const PostTitle = styled.p`
    ${props =>
        props.title || props.tag
            ? mixin.textProps(14, "semiBold", "gray2")
            : mixin.textProps(20, "semiBold", "gray2")}
`;
const AnnounceTitle = styled.p`
    ${props =>
        props.title || props.tag
            ? mixin.textProps(14, "semiBold", "gray2")
            : mixin.textProps(20, "semiBold", "gray2")}
`;
const SmallTag = styled.span`
    margin-right: 20px;
    border-radius: 16px;
    background-color: white;
    height: ${props => (props.title || props.tag ? " 22px" : "32px")};
    min-width: ${props => (props.title || props.tag ? " 74px" : "94px")};
    line-height: ${props => (props.title || props.tag ? "18px" : "28px")};
    ${props =>
        props.title || props.tag
            ? mixin.textProps(12, "semiBold", "gray1", "center")
            : mixin.textProps(18, "semiBold", "gray1", "center")}
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue3")}
`;

const AnnounceTag = styled.span`
    margin-right: 20px;
    border-radius: 16px;
    background-color: white;
    height: ${props => (props.title || props.tag ? " 22px" : "32px")};
    min-width: ${props => (props.title || props.tag ? " 74px" : "94px")};
    line-height: ${props => (props.title || props.tag ? "18px" : "28px")};
    ${props =>
        props.title || props.tag
            ? mixin.textProps(12, "semiBold", "gray1", "center")
            : mixin.textProps(18, "semiBold", "gray1", "center")}
    ${mixin.outline("2px solid", "mint")}
`;

// 더보기 버튼
const More = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")}
    :hover {
        cursor: pointer;
    }
`;

// 텍스트

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
        font-size: ${props => (props.title || props.tag ? "17px" : "20px")};
        margin: 0 5px 0 10px;
    }
`;

export default BoardBox;
