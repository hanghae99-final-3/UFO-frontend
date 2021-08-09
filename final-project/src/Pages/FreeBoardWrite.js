import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { freeBoardApi } from "../api";
import { addFreePostDB, editFreePostDB } from "../redux/async/freeBoard";
import categories from "../categories";
import Editor from "../Components/Editor";

/**
 * @author kwonjiyeong
 * @param props={history,location,match}
 * @returns 자유게시판 게시글 작성페이지 or 자유게시판 특정 게시글 수정페이지
 * @역할 props.match.params.id이 없으면 게시글 작성페이지, 있으면 수정페이지로 렌더링.
 * @필수값 postId(게시글 아이디)
 */

const FreeBoardWrite = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user.user_id);

    const getContentFromEditor = content => {
        //에디터로부터 content 값 가져오기
        setPost({ ...post, content: content });
    };

    //┏-----------------게시글 수정파트-----------------┓
    const postFromState = useSelector(state => state.freeBoard.post); //state에 있는 post 정보 불러오기.
    const postId = Number(props.match.params.id);
    let [post, setPost] = useState(null);

    useEffect(() => {
        //----state로부터 post값을 얻어올 수 있으면 중지하고, 아니면 서버로부터 post값을 받아온다.
        if (postId && postFromState) setPost(postFromState); //디테일페이지에 갔다가 수정페이지에오면 디테일페이지에 있는 내용들이 state에 실리게 되어서 마운트가 되고, 원본값을 넣기로 함!
        if (postId && !postFromState)
            freeBoardApi.getPost(postId).then(res => setPost(res.data.result));
        //----
    }, []);
    const editfreePost = () => {
        //서버에 필요한 정보를 정리하고, 포스트를 수정하는 미들웨어 함수로 보낸다.
        if (!userId) return alert("로그인을 해주세요!");
        if (userId && !post.title) return alert("제목을 적어주세요!");
        if (userId && typeof post.content === "object")
            //CKEditor 특성상 입력값 없음은 객체다.
            return alert("내용을 적어주세요!");
        const req = {
            user_id: post.user_id,
            title: post.title,
            category: post.category,
            content: post.content,
            country_id: post.country_id,
            post_id: post.post_id,
        };
        dispatch(editFreePostDB(req));
    };
    //┗-----------------게시글 수정파트-----------------┛

    //┏-----------------게시글 작성파트-----------------┓
    // ----게시글 수정모드인지 확인하고, 수정모드가 아니면 user_id를 추가시켜준다.
    const isEdit = props.match.params.id ? true : false;
    if (!isEdit) post = { ...post, user_id: userId }; //이렇게 하면 useState 중 post를 let으로 설정해야 한다! 불변성 유지 잘 시켜주자!
    // ----
    console.log(post);
    const addPost = () => {
        //서버에 필요한 정보를 정리하고, 포스트를 추가하는 미들웨어 함수로 보낸다.
        if (!userId) return alert("로그인을 해주세요!");
        if (userId && !post.country_id) return alert("국가를 설정해주세요!");
        if (userId && !post.category)
            //카테고리 중 0이 falsy한 값이라서 이렇게 설정해주었다.
            return alert("카테고리를 설정해주세요!");

        if (userId && !post.title) return alert("제목을 적어주세요!");
        if (userId && !post.content) return alert("내용을 적어주세요!");
        const req = {
            user_id: post.user_id,
            title: post.title,
            category: post.category,
            content: post.content,
            country_id: post.country_id,
        };
        dispatch(addFreePostDB(req));
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

                <button
                    onClick={() => history.push(`/freeboard/detail/${postId}`)} //뒤로가기를 누르면 원래 상세페이지로 돌아갑니다.
                >
                    뒤로가기
                </button>
                <button onClick={editfreePost}>수정완료</button>
            </>
        );
    }

    return (
        // 게시글 작성모드
        <>
            <div>
                {/* 카테고리 중 국가 선택하기 */}
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
            <div>
                {/* 카테고리 중 카테고리 선택하기 */}
                {categories.freeCategory.map(ele => (
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

            <button onClick={() => history.push("/freeboard")}>뒤로가기</button>
            <button onClick={addPost}>제출완료</button>
        </>
    );
};

export default FreeBoardWrite;
