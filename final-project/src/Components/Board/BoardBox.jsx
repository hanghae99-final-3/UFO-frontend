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

//컴포넌트
import AnnounceTag from "../../Elements/Tag/AnnounceTag";
import DefaultTag from "../../Elements/Tag/DefaultTag";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    heart: {
        fill: "#FF5372",
    },
});

const BoardBox = ({ postList, fixedList, boardName, announcement }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;
    const isMobile = document.documentElement.clientWidth < 798 ? true : false;
    // material ui css class
    const classes = useStyles();
    // 게시물 디테일 페지이 이동
    const _onClick = (postId, category) => {
        //자유게시판일때,
        // dispatch(setTagReducer(category));
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    return (
        <BoardContainer>
            <Content>
                {fixedList &&
                    fixedList.map((post, idx) => (
                        <PostContainer
                            isDarkTheme={isDarkTheme}
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id, post?.category);
                            }}
                        >
                            <GridContainer>
                                <AnnounceTag
                                    rightGap={isDesktop ? "20px" : "8px"}
                                >
                                    {boardName === "freeboard" && (
                                        <img
                                            style={{
                                                width: "15px",
                                                marginRight: "1px",
                                            }}
                                            src={
                                                categories
                                                    .countrySelectorFlagList[
                                                    post.country_id - 1
                                                ]?.icon
                                            }
                                            alt=""
                                        />
                                    )}
                                    {boardName === "freeboard" &&
                                        categories.freeCategory[post.category]
                                            ?.categoryName}
                                    {boardName === "univboard" &&
                                        categories.univCategory[post.category]
                                            ?.categoryName}
                                </AnnounceTag>
                                <PostTitle isDarkTheme={isDarkTheme}>
                                    {post.title}
                                </PostTitle>
                                {/* 데스크탑 */}
                                {isDesktop ? (
                                    <IconContainer>
                                        <>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                {post?.like?.is_like ===
                                                false ? (
                                                    <FavoriteBorder />
                                                ) : (
                                                    <FavoriteIcon
                                                        className={
                                                            classes.heart
                                                        }
                                                    />
                                                )}
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.like &&
                                                        post.like.all_like}
                                                </IconSpan>
                                            </Icon>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                <MdComment />
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.comment_count}
                                                </IconSpan>
                                            </Icon>
                                        </>
                                        <Icon isDarkTheme={isDarkTheme}>
                                            <VisibilityIcon />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.view_count}
                                            </IconSpan>
                                        </Icon>
                                    </IconContainer>
                                ) : null}
                            </GridContainer>
                            {isMobile && (
                                <IconContainer isDarkTheme={isDarkTheme}>
                                    <Username isDarkTheme={isDarkTheme}>
                                        Admin
                                    </Username>
                                    <IconWrapper>
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
                                        <Icon isDarkTheme={isDarkTheme}>
                                            <MdComment />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.comment_count}
                                            </IconSpan>
                                        </Icon>

                                        <Icon isDarkTheme={isDarkTheme}>
                                            <VisibilityIcon />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.view_count}
                                            </IconSpan>
                                        </Icon>
                                    </IconWrapper>
                                </IconContainer>
                            )}
                        </PostContainer>
                    ))}
                {postList &&
                    postList.map((post, idx) => (
                        <PostContainer
                            isDarkTheme={isDarkTheme}
                            key={idx}
                            onClick={() => {
                                _onClick(post.post_id, post?.category);
                            }}
                        >
                            <GridContainer>
                                <DefaultTag
                                    rightGap={isDesktop ? "20px" : "8px"}
                                >
                                    {boardName === "freeboard" && (
                                        <img
                                            style={{
                                                width: "15px",
                                                marginRight: "1px",
                                            }}
                                            src={
                                                categories
                                                    .countrySelectorFlagList[
                                                    post.country_id - 1
                                                ]?.icon
                                            }
                                            alt=""
                                        />
                                    )}
                                    {boardName === "freeboard" &&
                                        categories.freeCategory[post.category]
                                            ?.categoryName}
                                    {boardName === "univboard" &&
                                        categories.univCategory[post.category]
                                            ?.categoryName}
                                </DefaultTag>
                                <PostTitle isDarkTheme={isDarkTheme}>
                                    {post.title}
                                </PostTitle>
                                {/* 데스크탑 */}
                                {isDesktop ? (
                                    <IconContainer>
                                        <>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                {post?.like?.is_like ===
                                                false ? (
                                                    <FavoriteBorder />
                                                ) : (
                                                    <FavoriteIcon
                                                        className={
                                                            classes.heart
                                                        }
                                                    />
                                                )}
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.like &&
                                                        post.like.all_like}
                                                </IconSpan>
                                            </Icon>
                                            <Icon isDarkTheme={isDarkTheme}>
                                                <MdComment />
                                                <IconSpan
                                                    isDarkTheme={isDarkTheme}
                                                >
                                                    {post.comment_count}
                                                </IconSpan>
                                            </Icon>
                                        </>
                                        <Icon isDarkTheme={isDarkTheme}>
                                            <VisibilityIcon />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.view_count}
                                            </IconSpan>
                                        </Icon>
                                    </IconContainer>
                                ) : null}
                            </GridContainer>
                            {isMobile && (
                                <IconContainer isDarkTheme={isDarkTheme}>
                                    <Username isDarkTheme={isDarkTheme}>
                                        {post["user.nickname"]}
                                    </Username>
                                    <IconWrapper>
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
                                        <Icon isDarkTheme={isDarkTheme}>
                                            <MdComment />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.comment_count}
                                            </IconSpan>
                                        </Icon>

                                        <Icon isDarkTheme={isDarkTheme}>
                                            <VisibilityIcon />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.view_count}
                                            </IconSpan>
                                        </Icon>
                                    </IconWrapper>
                                </IconContainer>
                            )}
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
        line-height: 1;
        ${props =>
            mixin.textProps(
                16,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )};
    }
`;
const AnnounceTitle = styled.p`
    ${mixin.textProps(20, "semiBold", "gray2")};
`;

const Content = styled.div``;

const PostContainer = styled.div`
    cursor: pointer;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    margin-bottom: 12px;
    align-items: center;
    @media ${({ theme }) => theme.mobile} {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    div {
        :nth-child(2) {
            margin: 0 ${({ theme }) => theme.calRem(15)};
        }
    }
`;
const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 40px);

    @media ${({ theme }) => theme.mobile} {
        display: flex;
        justify-content: space-between;
        ${props =>
            mixin.outline(
                "1px solid",
                props.isDarkTheme ? "darkLine" : "gray4",
                "bottom",
            )};
        padding-bottom: 16px;
        margin-bottom: 16px;
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
            font-size: 16px;
        }
    }
`;

const IconSpan = styled.span`
    ${props =>
        mixin.textProps(12, "semiBold", props.isDarkTheme ? "gray2" : "gray3")}
`;

const Username = styled.span`
    ${props =>
        mixin.textProps(12, "semiBold", props.isDarkTheme ? "gray2" : "gray3")}
`;

export default BoardBox;
