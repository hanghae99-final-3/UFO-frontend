import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import mixin from "../styles/Mixin";
import categories from "../categories";
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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
                            <SmallTag>
                                #
                                {boardName === "freeboard" &&
                                    categories.freeCategory[
                                        post.free_board.category
                                    ]?.categoryName}
                                {boardName === "univboard" &&
                                    categories.univCategory[post.category]
                                        ?.categoryName}
                            </SmallTag>
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
    min-width: 94px;
    height: 32px;
    ${mixin.textProps(18, "regular", "gray1")}
    text-align: center;
    margin-right: 20px;
    border: 2px solid ${props => props.theme.color.blue3};
    border-radius: 16px;
    background-color: white;
    line-height: 28px;
`;
const PostTitle = styled.p`
    ${mixin.textProps(20, "regular", "grey1")}
`;

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
