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
import SearchBox from './SearchBox'
import categories from "../categories";
import BoardBox from './BoardBox'

const UniBoardList = props => {
    const dispatch = useDispatch(); 
    const [page, setPage] = useState(1) // pagination 현재 페이지 값
    const [searchTerm, setSearchTerm] = useState('') // 유저 검색어 input 값
    
    const univId = useSelector(state => state.user?.user?.univ_id) // 로그인의 인증 대학교 아이디
    const UnivPostList = useSelector(state => state.univBoard.list); // 대학교 게시판 게시글
    const selectedTag = useSelector(state => state.freeBoard.selectedTag); // 현재 선택된 카테고리 구독

    // 현재 페이지가 변하면 useEffect 발동, 다음 페이지 대학 게시글 요청
    useEffect(() => {
    // 유저가 대학교 아이디 값을 가지고 있을 경우에만 실행
        if(univId){
            if(selectedTag===null){
                const univBoardQueryDB ={
                    pageSize : 10,
                    pageNum : page,
                    univ_id :univId
                }
                dispatch(getUnivBoardDB(univBoardQueryDB));
            }else{
                const univBoardQueryDB ={
                    pageSize : 10,
                    pageNum : page,
                    univ_id :univId,
                    category:selectedTag
                }
                dispatch(getUnivBoardDB(univBoardQueryDB));
            }
        }
    }, [dispatch, page, univId, selectedTag]);
    
    // 페이지 이동 이벤트 핸들링
    const handlePage = (e,value)=>{
        setPage(value)
    }

    return (
        <React.Fragment>
            {/* <SearchBox /> */}
            
            <SearchBox searchTag={categories.uniBoardTags}/>
            
            <BoardContentContainer>
                <Header>
                    {/* <Tag>#태그</Tag> */}
                    {/* <More>더보기</More> */}
                </Header>
                <Content>
                <BoardBox
                    postList={UnivPostList && UnivPostList}
                    preview={true}
                    page={"univBoard"}
                />
                </Content>
            </BoardContentContainer>
            <PaginationContainer>
                <Pagination count={10} page={page} onChange={handlePage}/>
            </PaginationContainer>
        </React.Fragment>
    );
};


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
