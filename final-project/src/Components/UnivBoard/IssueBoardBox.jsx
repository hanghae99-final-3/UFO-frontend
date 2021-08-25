import React from "react";
import styled from "styled-components";
import { history } from "../../Redux/configureStore";
import mixin from "../../Styles/Mixin";
import categories from "../../Shared/categories";
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import DefaultTag from "../../Elements/Tag/DefaultTag";

const IssueBoardBox = ({ issueList, boardName }) => {
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
                                #
                                {boardName === "freeboard" &&
                                    categories.freeCategory[
                                        post.free_board.category
                                    ]?.categoryName}
                                {boardName === "univboard" &&
                                    categories.univCategory[post.category]
                                        ?.categoryName}
                            </DefaultTag>
                            <PostTitle>{post.free_board.title}</PostTitle>
                        </Title>

                        <IconContainer>
                            <>
                                <Icon>
                                    <MdComment />
                                    <span>{post.free_board.coment_count}</span>
                                </Icon>
                            </>

                            <Icon>
                                <VisibilityIcon />
                                <span>{post.free_board.view_count}</span>
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
    ${mixin.textProps(20, "semiBold", "gray2")}
`;

const PostContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;
    cursor: pointer;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    width: 10%;
    display: flex;
    justify-content: space-between;
`;

const Icon = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
        line-height: 1;
    }
    svg {
        font-size: 20px;
        margin: 0 5px 0 10px;
    }
`;

export default IssueBoardBox;
