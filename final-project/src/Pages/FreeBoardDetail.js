import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { getFreePostDB, deleteFreePostDB } from "../redux/async/freeBoard";
import Comment from "../Components/Comment";

/**
 * @author kwonjiyeong
 * @param props : {history, location, match}
 * @returns 자유게시판 게시물 상세페이지 뷰
 * @역할 자유게시판 게시물 상세페이지 뷰 렌더링
 * @필수값 없음
 */

const FreeBoardDetail = props => {
    const dispatch = useDispatch();
    const postId = Number(props.match.params.id);
    const post = useSelector(state => state.freeBoard.post);

    useEffect(() => {
        dispatch(getFreePostDB(postId));
    }, []);

    const deleteFreePost = () => {
        //서버에 필요한 정보를 정리하고, 포스트를 삭제하는 미들웨어 함수로 보낸다.
        const req = {
            post_id: post.post_id,
            user_id: post.user.user_id,
        };
        dispatch(deleteFreePostDB(req));
    };

    return (
        <>
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <button onClick={() => history.push("/freeboard")}>
                        뒤로가기
                    </button>
                    <button
                        onClick={() =>
                            history.push(`/freeboard/edit/${postId}`)
                        }
                    >
                        수정하기
                    </button>
                    <button onClick={deleteFreePost}>삭제하기</button>
                </>
            )}
            <Comment postId={postId} />
        </>
    );
};

export default FreeBoardDetail;
