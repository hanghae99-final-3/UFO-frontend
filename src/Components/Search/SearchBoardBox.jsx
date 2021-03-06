import React from "react";
import mixin from "../../Styles/Mixin"; // 믹스인 css 객체
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import categories from "../../Shared/categories"; // 게시물 태그 카테고리 객체
import { history } from "../../Redux/configureStore"; // 히스토리 객체

import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; // 좋아요 아이콘
import { makeStyles } from "@material-ui/core"; // material ui 스타일링 훅스
import DefaultTag from "../../Elements/Tag/DefaultTag";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    heart: {
        fill: "#FF5372",
    },
});

const SearchBoardBox = ({ postList, fixedList, boardName, announcement }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

    // material ui css class
    const classes = useStyles();
    // 게시물 디테일 페지이 이동
    const _onClick = (postId, board) => {
        //자유게시판일때,
        if (board === "free")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    return (
        <BoardContainer>
            <Content>
                {postList &&
                    postList.map((post, idx) => (
                        <PostContainer
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id, post.board);
                            }}
                        >
                            <DefaultTag
                                rightGap={isDesktop ? "20px" : "8px"}
                                announcement={announcement}
                            >
                                {
                                    <img
                                        style={{
                                            width: "20px",
                                            marginRight: "1px",
                                        }}
                                        src={
                                            categories.countrySelectorFlagList[
                                                post.country_id - 1
                                            ]?.icon
                                        }
                                        alt=""
                                    />
                                }
                                {post.board === "free" &&
                                    categories.freeCategory[post.category]
                                        ?.categoryName}
                                {post.board === "univ" &&
                                    categories.univCategory[post.category]
                                        ?.categoryName}
                            </DefaultTag>
                            <PostTitle isDarkTheme={isDarkTheme}>
                                {post.title}
                            </PostTitle>
                            <IconContainer>
                                <>
                                    {isDesktop ? (
                                        <Icon isDarkTheme={isDarkTheme}>
                                            {post?.like?.is_like === false ? (
                                                <FavoriteBorder />
                                            ) : (
                                                <FavoriteIcon
                                                    className={classes.heart}
                                                />
                                            )}
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.like &&
                                                    post.like.all_like}
                                            </IconSpan>
                                        </Icon>
                                    ) : null}
                                    {isDesktop ? (
                                        <Icon isDarkTheme={isDarkTheme}>
                                            <MdComment />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.comment_count}
                                            </IconSpan>
                                        </Icon>
                                    ) : null}
                                </>
                                <Icon isDarkTheme={isDarkTheme}>
                                    <VisibilityIcon />
                                    <IconSpan isDarkTheme={isDarkTheme}>
                                        {post.view_count}
                                    </IconSpan>
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
const PostTitle = styled.span`
    ${props =>
        mixin.textProps(20, "semiBold", props.isDarkTheme ? "gray3" : "gray2")};

    @media ${({ theme }) => theme.mobile} {
        display: inline-flex;
        line-height: 2;
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )};
    }
`;
const SmallTag = styled.span`
    height: 32px;
    min-width: 94px;
    line-height: 28px;
    margin-right: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.color.white};
    ${mixin.textProps(18, "semiBold", "gray1", "center")};
    ${mixin.outline("2px solid", "blue2")};
`;

const Content = styled.div``;

const PostContainer = styled.div`
    display: grid;
    cursor: pointer;
    margin-bottom: 12px;
    grid-template-columns: max-content 1fr max-content;

    @media ${({ theme }) => theme.mobile} {
        /* display: flex;
        align-items: center;
        justify-content: space-between; */
    }
`;

const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 40px);
    @media ${({ theme }) => theme.mobile} {
        grid-template-columns: repeat(1, 40px);

        /* display: flex;
        align-items: center;
        justify-content: flex-end; */
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
        font-size: ${({ theme }) => theme.fontSize["12"]};
    }
    svg {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.gray2
                : props.theme.color.gray3};
        margin-right: 2px;
        font-size: 20px;
    }

    @media ${({ theme }) => theme.mobile} {
        svg {
            margin-right: 2px;
            font-size: 16px;
        }
    }
`;

const IconSpan = styled.span`
    ${props =>
        mixin.textProps(12, "semiBold", props.isDarkTheme ? "gray2" : "gray3")}
`;

export default SearchBoardBox;
