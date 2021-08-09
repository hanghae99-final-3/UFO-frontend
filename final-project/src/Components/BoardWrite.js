import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { useParams } from "react-router";
import { freeBoardApi, univBoardApi } from "../api";
import { addFreePostDB, editFreePostDB } from "../redux/async/freeBoard";
import {
    addUnivBoardPostDB,
    editUnivBoardPostDB,
} from "../redux/async/univBoard";
import categories from "../categories";
import Editor from "../Components/Editor";

/**
 * @author kwonjiyeong
 * @param  boardName:게시판명
 * @returns 자유게시판 게시글 작성페이지 or 자유게시판 특정 게시글 수정페이지
 * @역할 props.match.params.id이 없으면 게시글 작성페이지, 있으면 수정페이지로 렌더링.
 * @필수값 boardName:게시판명, postId:포스트아이디, userId:유저아이디, univId:학교번호
 */

const FreeBoardWrite = ({ boardName }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [post, setPost] = useState(null); //이 state는 입력값들이 들어갈 공간입니다!
    const { id: postId } = useParams();
    const isEdit = postId ? true : false; //수정모드인지 아닌지 판별 state

    const getContentFromEditor = content => {
        //에디터로부터 content 값 가져오기
        setPost({ ...post, content: content });
    };

    //┏-----------------게시글 수정파트-----------------┓
    //----state에 있는 post 정보 불러오기. boardName이 freeboard면 자유게시판, 아니면 대학게시판을 가져온다.
    const postFromState = useSelector(state =>
        boardName === "freeboard"
            ? state.freeBoard.post
            : state.univBoard.postDetail,
    );

    const goBackPostDetail = () => {
        //뒤로가기를 누르면 원래 상세페이지로 돌아갑니다.
        if (boardName === "freeboard")
            history.push(`/freeboard/detail/${postId}`);
        if (boardName === "univboard")
            history.push(`/univboard/detail/${postId}`);
    };
    //----

    //----state로부터 post값을 얻어올 수 있으면 중지하고, 아니면 서버로부터 post값을 받아온다.
    useEffect(() => {
        if (postId && postFromState) setPost(postFromState); //디테일페이지에 갔다가 수정페이지에오면 디테일페이지에 있는 내용들이 state에 실리게 되어서 마운트가 되고, 원본값을 넣기로 함!

        if (postId && !postFromState) {
            //만약 스테이트에 post값이 없으면, api 요청해서 바로 값을 가져와서 post에 집어넣어준다.
            if (boardName === "freeboard")
                freeBoardApi
                    .getPost(postId)
                    .then(res => setPost(res.data.result));
            else
                univBoardApi
                    .getPostDetail(postId)
                    .then(res => setPost(res.data.result));
        }
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
            dispatch(editFreePostDB(req));
        }
        if (boardName === "univboard") {
            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                post_id: post.post_id,
                is_fixed: false,
                univ_id: user.user.univ_id,
            };
            dispatch(editUnivBoardPostDB(req));
        }
    };
    //┗-----------------게시글 수정파트-----------------┛

    //┏-----------------게시글 작성파트-----------------┓

    console.log(post);
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
            const req = {
                title: post.title,
                category: post.category,
                content: post.content,
                is_fixed: false,
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
                <input
                    onChange={e => setPost({ ...post, title: e.target.value })}
                    value={post.title}
                />
                <Editor
                    originContent={post.content}
                    getContentFromEditor={getContentFromEditor}
                />

                <button onClick={goBackPostDetail}>뒤로가기</button>
                <button onClick={editfreePost}>수정완료</button>
            </>
        );
    }

    return (
        // 게시글 작성모드
        <>
            {/* 자유게시판이면 국가선택란이 나타난다. */}
            {boardName === "freeboard" && (
                <div>
                    {categories.country.map(ele => (
                        <button
                            key={ele.countryId}
                            onClick={() =>
                                setPost({
                                    ...post,
                                    country_id: ele.countryId,
                                })
                            }
                        >
                            {ele.countryName}
                        </button>
                    ))}
                </div>
            )}

            <div>
                {/* 카테고리 중 카테고리 선택하기 */}
                {categoryList.map(ele => (
                    <button
                        key={ele.categoryId}
                        onClick={() => {
                            setPost({
                                ...post,
                                category: `${ele.categoryId}`,
                            });
                        }}
                    >
                        {ele.categoryName}
                    </button>
                ))}
            </div>
            <input
                onChange={e => setPost({ ...post, title: e.target.value })}
            />
            <Editor getContentFromEditor={getContentFromEditor} />

            <button onClick={goBackBoard}>뒤로가기</button>
            <button onClick={addPost}>제출완료</button>
        </>
    );
};

export default FreeBoardWrite;
