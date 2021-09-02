import React from "react";
import styled from "styled-components";
import { history } from "../../Redux/configureStore";
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories";

import VisibilityIcon from "@material-ui/icons/Visibility";

import DefaultTag from "../../Elements/Tag/DefaultTag";
import { useSelector } from "react-redux";

const IssueBoardBox = ({ issueList, boardName, page }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드
    // 게시물 클릭시 이벤틀 헨들러
    const _onClick = postId => {
        //자유게시판일때,
        if (boardName === "freeboard")
            return history.push(`/freeboard/detail/${postId}`);
        //학교게시판일때,
        return history.push(`/univboard/detail/${postId}`);
    };

    return (
        <React.Fragment>
            {issueList &&
                issueList.map((post, idx) => (
                    <PostContainer
                        key={idx}
                        onClick={() => {
                            _onClick(post.post_id);
                        }}
                    >
                        <Title>
                            <DefaultTag rightGap="20px">
                                {
                                    <img
                                        style={{
                                            width: "20px",
                                            marginRight: "1px",
                                        }}
                                        src={
                                            categories.countrySelectorFlagList[
                                                post.free_board.country_id - 1
                                            ]?.icon
                                        }
                                        alt=""
                                    />
                                }
                                {boardName === "freeboard" &&
                                    categories.freeCategory[
                                        post.free_board.category
                                    ]?.categoryName}
                                {boardName === "univboard" &&
                                    categories.univCategory[post.category]
                                        ?.categoryName}
                            </DefaultTag>
                            <PostTitle isDarkTheme={isDarkTheme}>
                                {post.free_board.title}
                            </PostTitle>
                        </Title>

                        <IconContainer>
                            <Icon isDarkTheme={isDarkTheme}>
                                <VisibilityIcon />
                                <ViewCount isDarkTheme={isDarkTheme}>
                                    {post.free_board.view_count}
                                </ViewCount>
                            </Icon>
                        </IconContainer>
                    </PostContainer>
                ))}
        </React.Fragment>
    );
};

// 태그

const SmallTag = styled.span`
    height: 32px;
    line-height: 28px;
    min-width: 94px;
    margin-right: 20px;
    border-radius: 16px;
    background-color: white;
    ${mixin.outline("2px solid", "blue3")}
    ${mixin.textProps(18, "semiBold", "gray1", "center")}
`;
const PostTitle = styled.p`
    ${props =>
        mixin.textProps(20, "semiBold", props.isDarkTheme ? "gray3" : "gray2")}

    //모바일 사이즈
     @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "gray3" : "gray2",
            )}
    }
`;

const PostContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;
    cursor: pointer;

    @media ${({ theme }) => theme.mobile} {
        margin-bottom: 8px;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    width: 45px;
    display: flex;
    justify-content: flex-start;
    @media ${({ theme }) => theme.mobile} {
        width: 40px;
    }
`;

const Icon = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
        line-height: 1;
    }
    svg {
        color: ${props =>
            props.isDarkTheme
                ? props.theme.color.gray2
                : props.theme.color.gray3};
        font-size: 20px;
        margin-right: 10px;
    }

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        svg {
            font-size: 15px;
            margin-right: 5px;
        }
    }
`;

const ViewCount = styled.span`
    ${mixin.textProps(12, "semiBold", "gray2")}

    //모바일 사이즈
 @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(11, "semiBold", "gray2")}
    }
`;

export default IssueBoardBox;
