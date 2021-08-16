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
//----

const BoardBox = ({
    postList,
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
                                    {!announcement && "# "}
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
                                        "공지"}
                                </SmallTag>
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
            </Content>
        </BoardContainer>
    );
};

const BoardContainer = styled.div`
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const SmallTag = styled.span`
    min-width: 74px;
    height: 22px;
    font-size: 12px;
    text-align: center;
    margin-right: 10px;
    border: 1px solid #3b3b3b;
    border-radius: 10px;
    background-color: white;
    color: #505050;
`;

const LargeTag = styled.span`
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
    display: flex;
    margin-bottom: 12px;
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
