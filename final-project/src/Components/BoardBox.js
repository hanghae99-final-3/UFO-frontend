import React from "react";

import categories from "../categories";
import styled from "styled-components";

import { BiHeart } from "react-icons/bi";
import { BiShareAlt } from "react-icons/bi";
import { MdComment } from "react-icons/md";

/**
 * @author heesung && junghoo
 * @param postList, title, tag, preview
 * @returns 게시글 with 게시글 layout
 * @역할 게시글 view component
 * @필수값 postList, title, tag, preview
 */

const BoardBox = ({ postList, title, tag, preview }) => {
    const _onClick = () => {
        window.alert("이동!");
    };
    return (
        <BoardContentContainer>
            <Header>
                {tag && <Tag># {tag}</Tag>}
                {title && <TitleHeading>{title}</TitleHeading>}
                {(title || tag) && <More>더보기</More>}
            </Header>
            <Content>
                {postList &&
                    postList.map((post, idx) => (
                        <PostContainer key={idx} onClick={_onClick}>
                            <Title>
                                <SmallTag>
                                    #{" "}
                                    {
                                        categories.freeCategory[post.category]
                                            .categoryName
                                    }
                                </SmallTag>
                                <p>{post.title}</p>
                            </Title>
                            {/* <ContentContainer>
                                {preview && (
                                    <PostContent>{post.content}</PostContent>
                                )}
                            </ContentContainer> */}

                            <IconContainer>
                                <Icon>
                                    <BiHeart />
                                    <span>5개</span>
                                </Icon>
                                <Icon>
                                    <MdComment />
                                    <span>3개</span>
                                </Icon>
                            </IconContainer>
                        </PostContainer>
                    ))}
            </Content>
        </BoardContentContainer>
    );
};

const BoardContentContainer = styled.div`
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Tag = styled.span`
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
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #fff;
    transition: 0.5s ease;
    :hover {
        cursor: pointer;
        border-bottom: 2px solid #e7e7e7;
    }
`;

const Title = styled.div`
    display: flex;
`;

const SmallTag = styled.span`
    padding: 0 10px;
    margin-right: 10px;
    border: 1px solid #3b3b3b;
    border-radius: 10px;
    background-color: white;
    color: #505050;
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

const ContentContainer = styled.div``;

const PostContent = styled.span``;
export default BoardBox;
