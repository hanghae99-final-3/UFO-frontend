import React from "react";
import mixin from "../styles/Mixin"; // 믹스인 css 객체
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import categories from "../categories"; // 게시물 태그 카테고리 객체
import { history } from "../redux/configureStore"; // 히스토리 객체

import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; // 좋아요 아이콘
import { makeStyles } from "@material-ui/core"; // material ui 스타일링 훅스

//컴포넌트
import AnnounceTag from "../Elements/Tag/AnnounceTag";
import DefaultTag from "../Elements/Tag/DefaultTag";

const useStyles = makeStyles({
    heart: {
        fill: "#FF5372",
    },
});

const BoardBox = ({ postList, fixedList, boardName, announcement }) => {
    // material ui css class
    const classes = useStyles();
    // 게시물 디테일 페지이 이동
    const _onClick = postId => {
        //자유게시판일때,
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    console.log("🦄💖💖" + fixedList);

    return (
        <BoardContainer>
            <Content>
                {fixedList &&
                    fixedList.map((post, idx) => (
                        <PostContainer
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id);
                            }}
                        >
                            <AnnounceTag rightGap="20px">공지</AnnounceTag>
                            <AnnounceTitle>{post.title}</AnnounceTitle>
                            <IconContainer>
                                <>
                                    <Icon>
                                        {post?.like?.is_like === false ? (
                                            <FavoriteBorder />
                                        ) : (
                                            <FavoriteIcon
                                                className={classes.heart}
                                            />
                                        )}
                                        <IconSpan>
                                            {post.like && post.like.all_like}
                                        </IconSpan>
                                    </Icon>
                                    <Icon>
                                        <MdComment />
                                        <IconSpan>
                                            {post.comment_count}
                                        </IconSpan>
                                    </Icon>
                                </>
                                <Icon>
                                    <VisibilityIcon />
                                    <IconSpan>{post.view_count}</IconSpan>
                                </Icon>
                            </IconContainer>
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
                            <DefaultTag
                                announcement={announcement}
                                rightGap="20px"
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
                            </DefaultTag>
                            <PostTitle>{post.title}</PostTitle>

                            <IconContainer>
                                <>
                                    <Icon>
                                        {post?.like?.is_like === false ? (
                                            <FavoriteBorder />
                                        ) : (
                                            <FavoriteIcon
                                                className={classes.heart}
                                            />
                                        )}
                                        <IconSpan>
                                            {post.like && post.like.all_like}
                                        </IconSpan>
                                    </Icon>
                                    <Icon>
                                        <MdComment />
                                        <IconSpan>
                                            {post.comment_count}
                                        </IconSpan>
                                    </Icon>
                                </>
                                <Icon>
                                    <VisibilityIcon />
                                    <IconSpan>{post.view_count}</IconSpan>
                                </Icon>
                            </IconContainer>
                        </PostContainer>
                    ))}
            </Content>
        </BoardContainer>
    );
};

// 스타일 컴포넌트
const BoardContainer = styled.div`
    width: 100%;
`;
const PostTitle = styled.p`
    ${mixin.textProps(20, "semiBold", "gray2")};
`;
const AnnounceTitle = styled.p`
    ${mixin.textProps(20, "semiBold", "gray2")};
`;

const Content = styled.div``;

const PostContainer = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    margin-bottom: 12px;
    cursor: pointer;
    align-items: center;
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
        margin-right: 2px;
        font-size: 20px;
    }
`;

const IconSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")}
`;

export default BoardBox;
