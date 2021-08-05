import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnivBoardDB } from "../redux/async/univBoard";
import { history } from "../redux/configureStore";
import { BiHeart } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import { BiShareAlt } from "react-icons/bi";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import Input from "@material-ui/core/Input";

const UniBoardList = props => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    let postList = useSelector(state => state.univBoard.list);
    useEffect(() => {
        const univBoardQueryDB ={
            pageSize : 10,
            pageNum : page
        }
        dispatch(getUnivBoardDB(univBoardQueryDB));
    }, [dispatch, page]);
    
    const handlePage = (e,value)=>{
        setPage(value)
    }
    const CommentCnt = useSelector(state=> state.univBoard.commentList.length)
    console.log('Comment Cnt',CommentCnt)

    // search에 해당하는 애들을 filter를 돌린다.
    // filter 내에서는 includes or findIndex > -1 인 경우로 로직을 잡는다.
    // filter처리가 된 변수를 map을 돌린다.
    
    const a = postList.filter((c) => {
        return c.title.includes(search)
            })
    return (
        <React.Fragment>
            {/* <SearchBox /> */}
            <SearchForm>
                <Input
                    placeholder="제목을 검색해보세요!"
                    fullWidth
                    onChange={(e) => {setSearch(e.target.value)}}
                />
            </SearchForm>
            <BoardContentContainer>
                <Header>
                    {/* <Tag>#태그</Tag> */}
                    {/* <More>더보기</More> */}
                </Header>
                <Content>
                    {/* map 돌려서 return 값으로 postContainer을 넣어주고, history.push에 path 넣어주세요!! */}
                    {postList &&
                        a.map((post, idx) => {
                            return (
                                <PostContainer
                                    key={idx}
                                    onClick={() => {
                                        history.push(
                                            `/univboard/detail/${post.post_id}`,
                                        );
                                    }}
                                >
                                    <Title>
                                        <SmallTag>#정보</SmallTag>
                                        <p>{post.title}</p>
                                    </Title>
                                    <IconContainer>
                                        <Icon>
                                            <BiHeart />
                                            <span>5개</span>
                                        </Icon>
                                        <Icon>
                                            <MdComment />
                                            <span>3개</span>
                                        </Icon>
                                        <Icon>
                                            <BiShareAlt />
                                            <span>7개</span>
                                        </Icon>
                                    </IconContainer>
                                </PostContainer>
                            );
                        })}
                </Content>
            </BoardContentContainer>
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage}/>
            </PaginationContainer>
        </React.Fragment>
    );
};
const SearchForm = styled.form``;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 100px;
`;
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
    & :hover {
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
    & span {
        line-height: 1;
    }
    & svg {
        font-size: 20px;
        margin: 0 5px 0 10px;
    }
`;

export default UniBoardList;
