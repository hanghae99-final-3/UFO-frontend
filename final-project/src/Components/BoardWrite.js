import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { useParams } from "react-router";
import instance, { freeBoardApi, univBoardApi } from "../api";
import { addFreePostDB, editFreePostDB } from "../redux/async/freeBoard";
import {
    addUnivBoardPostDB,
    editUnivBoardPostDB,
} from "../redux/async/univBoard";
import categories from "../categories";
import Editor from "../Components/Editor";
import mixin from "../styles/Mixin";

/**
 * @author jiyeong
 * @param  boardName:게시판명
 * @returns 자유게시판 게시글 작성페이지 or 자유게시판 특정 게시글 수정페이지
 * @역할 props.match.params.id이 없으면 게시글 작성페이지, 있으면 수정페이지로 렌더링.
 * @필수값 boardName:게시판명, postId:포스트아이디, user:유저정보
 */

const BoardWrite = ({ boardName }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [post, setPost] = useState(null); //이 state는 입력값들이 들어갈 공간입니다!
    const { id: postId } = useParams();
    const isEdit = postId ? true : false; //수정모드인지 아닌지 판별 state
    const [isAnnouncement, setIsAnnouncement] = useState(false); // 게시물 공지 설정 값
    const [isAdmin, setIsAdmin] = useState(false);

    const getContentFromEditor = content => {
        //에디터로부터 content 값 가져오기
        setPost({ ...post, content: content });
    };

    //┏-----------------게시글 수정파트-----------------┓
    //----state에 있는 post 정보 불러오기. boardName이 freeboard면 자유게시판, 아니면 대학게시판을 가져온다.
    const postFromState = useSelector(state =>
        boardName === "freeboard" ? state.freeBoard.post : state.univBoard.post,
    );

    const goBackPostDetail = () => {
        //뒤로가기를 누르면 원래 상세페이지로 돌아갑니다.
        if (boardName === "freeboard")
            history.push(`/freeboard/detail/${postId}`);
        if (boardName === "univboard")
            history.push(`/univboard/detail/${postId}`);
    };

    //----state로부터 post값을 얻어올 수 있으면 중지하고, 아니면 서버로부터 post값을 받아온다.
    useEffect(() => {
        if (postId && postFromState) setPost(postFromState); //디테일페이지에 갔다가 수정페이지에오면 디테일페이지에 있는 내용들이 state에 실리게 되어서 마운트가 되고, 원본값을 넣기로 함!
        if (postId && !postFromState) {
            //만약 스테이트에 post값이 없으면, api 요청해서 바로 값을 가져와서 post에 집어넣어준다.
            if (boardName === "freeboard")
                freeBoardApi
                    .getPost(postId)
                    .then(res => setPost(res.data.result));
            if (boardName === "univboard") {
                univBoardApi
                    .getPostDetail(postId)
                    .then(res => setPost(res.data.result));
            }
        }
        const checkAdmin = async () => {
            await instance.get("/api/is-admin").then(res => {
                if (res.data.ok && res.data?.result?.admin_id) {
                    setIsAdmin(true);
                }
            });
        };
        checkAdmin();
    }, []);
    //----

    const editfreePost = () => {
        //서버에 필요한 정보를 정리하고, 포스트를 수정하는 미들웨어 함수로 보낸다.
        if (!user.user_id) return alert("로그인을 해주세요!");
        if (user.user_id && user.user_id !== post.user_id)
            return alert("일치하는 사용자가 아니예요!");
        if (user.user_id && !post.title) return alert("제목을 적어주세요!");
        if (user.user_id && typeof post.content === "object")
            //CKEditor 특성상 입력값 없음은 객체다.
            return alert("내용을 적어주세요!");

        if (boardName === "freeboard") {
            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                country_id: post.country_id,
                post_id: post.post_id,
            };
            history.push(`/freeboard/detail/${postId}`);
            dispatch(editFreePostDB(req));
        }
        if (boardName === "univboard") {
            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                post_id: post.post_id,
                is_fixed: false,
                univ_id: user.univ_id,
            };
            dispatch(editUnivBoardPostDB(req));
            history.push(`univboard/detail/${postId}`);
        }
    };
    //┗-----------------게시글 수정파트-----------------┛

    //┏-----------------게시글 작성파트-----------------┓

    //---- boardName이 freeboard면 자유게시판카테고리를 가져오고, 아니면 대학카테고리를 가져온다.
    const categoryList =
        boardName === "freeboard"
            ? categories.freeCategory
            : categories.univCategory;
    //----

    const goBackBoard = () => {
        //뒤로가기를 누르면 원래 게시판페이지로 돌아갑니다.
        if (boardName === "freeboard") history.push(`/freeboard`);
        if (boardName === "univboard") history.push(`/univboard`);
    };

    const setCategory = (keyName, value) => {
        // 선택한 카테고리 값을 가져와서 setPost해주는 함수입니다.
        setPost({
            ...post,
            [keyName]: value,
        });
    };

    const addPost = () => {
        //서버에 필요한 정보를 정리하고, 포스트를 추가하는 미들웨어 함수로 보낸다.
        if (!user.user_id) return alert("로그인을 해주세요!");

        if (user.user_id && !post.category)
            return alert("카테고리를 설정해주세요!");

        if (user.user_id && !post.title) return alert("제목을 적어주세요!");
        if (user.user_id && !post.content) return alert("내용을 적어주세요!");

        if (boardName === "freeboard") {
            if (user.user_id && !post.country_id)
                return alert("국가를 설정해주세요!");

            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                country_id: post.country_id,
            };
            dispatch(addFreePostDB(req));
            history.push("/freeboard");
        }

        if (boardName === "univboard") {
            console.log(isAnnouncement);
            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                is_fixed: isAnnouncement,
                univ_id: user.univ_id,
            };
            dispatch(addUnivBoardPostDB(req));
            history.push("/univboard");
        }
    };
    //┗-----------------게시글 작성파트-----------------┛
    if (isEdit && post) {
        return (
            //게시글 수정모드
            <>
                {/* 게시판제목 */}
                <BoardTitle>
                    <h3>
                        {boardName === "freeboard"
                            ? "자유게시판"
                            : "대학게시판"}
                    </h3>
                </BoardTitle>
                <InputTitle
                    placeholder="제목을 입력해주세요!"
                    onChange={e => setPost({ ...post, title: e.target.value })}
                    value={post.title}
                />
                <Editor
                    originContent={post.content}
                    getContentFromEditor={getContentFromEditor}
                />

                <Controls>
                    <button onClick={goBackPostDetail}>취소</button>
                    <button onClick={editfreePost}>수정</button>
                </Controls>
            </>
        );
    }

    console.log(post);

    return (
        // 게시글 작성모드
        <>
            {/* 게시판제목 */}
            <BoardTitle>
                <h3>
                    {boardName === "freeboard" ? "자유게시판" : "대학게시판"}
                </h3>
            </BoardTitle>

            {/* 태그선택 */}
            <SelectBox>
                {boardName === "freeboard" && (
                    <CountrySelect>
                        {/* 자유게시판이면 국가선택란이 나타난다. */}
                        <SelectTitle>국가 설정</SelectTitle>
                        {categories.country.map(ele => (
                            <SelectBtn
                                selected={post?.country_id === ele.countryId}
                                key={ele.countryId}
                                onClick={() =>
                                    setCategory("country_id", ele.countryId)
                                }
                            >
                                {ele.countryName}
                            </SelectBtn>
                        ))}
                    </CountrySelect>
                )}
                <TagSelect>
                    {/* 카테고리 중  선택하기 */}
                    <SelectTitle>태그 설정</SelectTitle>
                    {categoryList.map(ele => (
                        <SelectBtn
                            selected={Number(post?.category) === ele.categoryId}
                            key={ele.categoryId}
                            onClick={() =>
                                setCategory("category", ele.categoryId)
                            }
                        >
                            #{ele.categoryName}
                        </SelectBtn>
                    ))}
                </TagSelect>
                {boardName === "univboard" && isAdmin && (
                    <TagSelect>
                        {/* 카테고리 중 카테고리 선택하기 */}
                        <SelectTitle>공지 설정</SelectTitle>
                        <SelectBtn
                            selected={isAnnouncement}
                            onClick={() => setIsAnnouncement(!isAnnouncement)}
                        >
                            공지글
                        </SelectBtn>
                    </TagSelect>
                )}
            </SelectBox>

            {/* 제목입력란 */}
            <InputTitle
                placeholder="제목을 입력해주세요!"
                onChange={e => setPost({ ...post, title: e.target.value })}
            />

            {/* 컨텐츠입력란 (에디터) */}
            <Editor getContentFromEditor={getContentFromEditor} />

            {/* 컨트롤 버튼 */}
            <Controls>
                <button onClick={goBackBoard}>취소</button>
                <button onClick={addPost}>등록</button>
            </Controls>
        </>
    );
};

const BoardTitle = styled.div`
    ${mixin.outline("1px solid", "gray3", "bottom")}
    h3 {
        ${mixin.textProps(30, "extraBold", "black")}
        margin-bottom: 10px;
    }
`;

const SelectBox = styled.div``;

const CountrySelect = styled.div`
    padding: 15px 0;
    ${mixin.outline("1px solid", "gray3", "bottom")}
`;

const TagSelect = styled.div`
    padding: 15px 0;
    ${mixin.outline("1px solid", "gray3", "bottom")}
`;

const SelectTitle = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")}
    margin-right: 10px;
`;

const SelectBtn = styled.button`
    min-width: 79px;
    box-sizing: border-box;
    border-radius: 16px;
    transition: all 0.3s ease;
    ${props =>
        props.selected
            ? `box-shadow: inset -1px 5px 5px -5px #cdcdcd;`
            : `box-shadow:  0 5px 5px -5px #cdcdcd;`}
    background-color: ${({ theme }) => theme.color.white};
    color: ${props => props.selected && props.theme.color.black};
    ${props =>
        props.selected
            ? mixin.outline("2px solid", "mainMint")
            : mixin.outline("2px solid", "blue3")}
    ${mixin.textProps(18, "semiBold", "gray3")}
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const InputTitle = styled.input`
    all: unset;
    ${mixin.outline("1px solid", "gray3", "bottom")};
    ${mixin.textProps(30, "extraBold", "black")};
    padding: 20px 0;
    width: 100%;
`;

const Controls = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button {
        padding: 10px 0;
        width: 80px;
        border-radius: 16px;
        background: ${({ theme }) => theme.color.blue1};
        ${mixin.textProps(18, "semiBold", "white")};
        :not(:last-child) {
            margin-right: 15px;
        }
        &:hover {
            background: ${({ theme }) => theme.color.mainBlue};
        }
    }
`;

export default BoardWrite;
