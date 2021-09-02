import React from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin"; // 믹스인 css 객체
import theme from "../../Styles/theme";
import categories from "../../Shared/categories"; // 게시물 태그 객체
import { history } from "../../Redux/configureStore"; // 히스토리 객체
import { useSelector } from "react-redux";

//애니메이션
import Boop from "../../Elements/Animations/Boop";

//아이콘
import { MdComment } from "react-icons/md"; // 댓글 아이콘
import VisibilityIcon from "@material-ui/icons/Visibility"; // 조회수 아이콘
import FavoriteIcon from "@material-ui/icons/Favorite"; // 좋아요 아이콘
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"; // 좋아요 아이콘

//머테리얼 ui
import { makeStyles } from "@material-ui/core"; // material ui 스타일링 훅스

//컴포넌트
import SmallTag from "../../Elements/Tag/SmallTag";
import SmallAnnounceTag from "../../Elements/Tag/SmallAnnounceTag";

//국기
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
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

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

    //데스크탑 사이즈인지 아닌지 판별하는 값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    return (
        <BoardContainer>
            <Header isDarkTheme={isDarkTheme}>
                {tag && (
                    <LargeTag
                        isDarkTheme={isDarkTheme}
                        onClick={onToMoreClicked}
                    >
                        {tag.categoryName} 💬
                    </LargeTag>
                )}
                {title && (
                    <TitleHeading
                        isDarkTheme={isDarkTheme}
                        onClick={onToMoreClicked}
                    >
                        {title}
                    </TitleHeading>
                )}
                {myPostTitle && <TitleHeading>{myPostTitle}</TitleHeading>}
                <Boop rotation={15} timing={200}>
                    <More isDarkTheme={isDarkTheme} onClick={onToMoreClicked}>
                        더보기
                    </More>
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
                            <SmallAnnounceTag rightGap={theme.calRem(10)}>
                                공지
                            </SmallAnnounceTag>
                            <AnnounceTitle isDarkTheme={isDarkTheme}>
                                {post.title}
                            </AnnounceTitle>
                            <IconContainer>
                                {/* 데스크탑일때만 좋아요와 댓글수가 보입니다. */}
                                {isDesktop && (
                                    <>
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
                                    </>
                                )}
                                <Icon isDarkTheme={isDarkTheme}>
                                    <VisibilityIcon />
                                    <IconSpan isDarkTheme={isDarkTheme}>
                                        {post.view_count}
                                    </IconSpan>
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
                            <SmallTag
                                announcement={announcement}
                                rightGap={theme.calRem(10)}
                            >
                                {!announcement && boardName === "freeboard" && (
                                    <img
                                        style={{
                                            width: "15px",
                                            marginRight: "1px",
                                        }}
                                        src={
                                            categories.countrySelectorFlagList[
                                                post.country_id - 1
                                            ]?.icon
                                        }
                                        alt=""
                                    />
                                )}
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
                            <PostTitle isDarkTheme={isDarkTheme}>
                                {post.title}
                            </PostTitle>

                            <IconContainer>
                                {/* 데스크탑일때만 좋아요와 댓글수가 보입니다. */}
                                {isDesktop && (
                                    <>
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
                                        <Icon
                                            isDarkTheme={isDarkTheme}
                                            title={title}
                                            tag={tag}
                                        >
                                            <MdComment />
                                            <IconSpan isDarkTheme={isDarkTheme}>
                                                {post.comment_count}
                                            </IconSpan>
                                        </Icon>
                                    </>
                                )}

                                <Icon
                                    isDarkTheme={isDarkTheme}
                                    title={title}
                                    tag={tag}
                                >
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

//--------스타일 컴포넌트-----------

const BoardContainer = styled.div`
    width: 100%;
`;

const IconSpan = styled.span`
    ${props =>
        mixin.textProps(12, "semiBold", props.isDarkTheme ? "gray2" : "gray3")}
`;
const Header = styled.div`
    margin-bottom: ${({ theme }) => theme.calRem(10)};
    padding-bottom: ${({ theme }) => theme.calRem(10)};
    ${props =>
        mixin.outline(
            "1.5px solid",
            props.isDarkTheme ? "darkLine" : "gray4",
            "bottom",
        )}
    ${mixin.flexBox("space-between", "flex-end", null, null)}

    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(8)};
        padding-bottom: ${({ theme }) => theme.calRem(8)};
    }
`;

const LargeTag = styled.span`
    ${props =>
        mixin.textProps(30, "extraBold", props.isDarkTheme ? "white" : "black")}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )}
    }
`;
const TitleHeading = styled.span`
    cursor: pointer;
    ${props =>
        mixin.textProps(30, "extraBold", props.isDarkTheme ? "white" : "black")}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )}
    }
`;
const PostTitle = styled.p`
    ${props =>
        mixin.textProps(14, "semiBold", props.isDarkTheme ? "gray3" : "gray2")}
    ${mixin.textOverflow()}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )}
    }
`;
const AnnounceTitle = styled.p`
    ${props =>
        mixin.textProps(14, "semiBold", props.isDarkTheme ? "gray3" : "gray2")}
    ${mixin.textOverflow()}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )}
    }
`;

// 더보기 버튼
const More = styled.span`
    ${props =>
        mixin.textProps(14, "semiBold", props.isDarkTheme ? "gray2" : "gray3")}
    cursor: pointer;
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray2" : "gray3",
            )}
    }
`;

const Content = styled.div``;

const PostContainer = styled.div`
    display: grid;
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.calRem(12)};
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
`;

const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 40px);
    align-items: center;
    @media ${({ theme }) => theme.mobile} {
        display: block;
        width: 40px;
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
        font-size: ${({ theme }) => theme.fontSize["12"]};
        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["11"]};
        }
    }
    svg {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.gray2
                : props.theme.color.gray3};
        margin-right: ${({ theme }) => theme.calRem(2)};
        font-size: ${({ theme }) => theme.fontSize["16"]};
        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["14"]};
        }
    }
`;

export default PreviewBoardBox;
