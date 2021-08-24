import React from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../styles/Mixin"; // 믹스인 css 객체

import Boop from "../Elements/Boop"; // 에니메이션 boop 컴포넌트
import categories from "../categories"; // 게시물 태그 객체
import { history } from "../redux/configureStore"; // 히스토리 객체

import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; // 좋아요 아이콘
import { makeStyles } from "@material-ui/core"; // material ui 스타일링 훅스
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    heart: {
        fill: "#FF5372",
    },
});

const PreviewBoardBox = ({
    postList,
    fixedList,
    title,
    tag,
    boardName,
    myPostTitle,
    announcement,
}) => {
    const classes = useStyles();

    // 로그인 유무
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    // 게시물 클릭시 이벤틀 헨들러
    const handleOnClick = postId => {
        //자유게시판일때,
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    // 더보기 클릭 이벤트 헨들러
    const onToMoreClicked = () => {
        if (tag) {
            history.push(`${boardName}/${tag?.categoryId}`);
        } else {
            history.push(boardName);
        }
    };

    return (
        <BoardContainer>
            <Header>
                {tag && <LargeTag>#{tag.categoryName}</LargeTag>}
                {title && <TitleHeading>{title}</TitleHeading>}
                {myPostTitle && <TitleHeading>{myPostTitle}</TitleHeading>}
                <Boop rotation={15} timing={200}>
                    <More onClick={onToMoreClicked}>더보기</More>
                </Boop>
            </Header>
            <Content>
                {fixedList &&
                    fixedList.map((post, idx) => (
                        <PostContainer
                            key={idx}
                            onClick={() => {
                                handleOnClick(post.post_id);
                            }}
                        >
                            <AnnounceTag>공지</AnnounceTag>
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
                                handleOnClick(post.post_id);
                            }}
                        >
                            <SmallTag announcement={announcement}>
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

                            <IconContainer>
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
                                <Icon title={title} tag={tag}>
                                    <MdComment />
                                    <IconSpan>{post.comment_count}</IconSpan>
                                </Icon>

                                <Icon title={title} tag={tag}>
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

//--------스타일 컴포넌트-----------

const BoardContainer = styled.div`
    width: 100%;
`;

const IconSpan = styled.span`
    ${mixin.textProps(12, "semiBold", "gray3")}
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
    ${mixin.textProps(14, "semiBold", "gray2")}
`;
const AnnounceTitle = styled.p`
    ${mixin.textProps(14, "semiBold", "gray2")}
`;
const SmallTag = styled.span`
    height: 22px;
    line-height: 18px;
    min-width: 74px;
    margin-right: 20px;
    border-radius: 16px;
    background-color: ${props =>
        props.announcement ? props.theme.color.mint : "white"};
    ${props =>
        mixin.textProps(
            12,
            "semiBold",
            props.announcement ? "black" : "gray1",
            "center",
        )}
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue2")}
`;

const AnnounceTag = styled.span`
    height: 22px;
    min-width: 74px;
    line-height: 18px;
    margin-right: 20px;
    border-radius: 16px;
    ${mixin.outline("2px solid", "mint")}
    background-color: ${props => props.theme.color.mint};
    ${props => mixin.textProps(12, "semiBold", "black", "center")};
`;

// 더보기 버튼
const More = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")}
    :hover {
        cursor: pointer;
    }
`;

const Content = styled.div``;

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
        font-size: 17px;
    }
`;

export default PreviewBoardBox;
