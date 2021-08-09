import React, { useState, useEffect } from "react";
import {
    addUnivBoardCommentDB,
    deleteUnivBoardPostDB,
    detailUnivBoardPostDB,
    editUnivBoardPostDB,
    getUnivBoardCommentDB,
} from "../redux/async/univBoard";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { withRouter } from "react-router-dom";
import categories from "../categories";
import Editor from "../Components/Editor";
import BoardComment from "../Components/BoardComment";
import SearchBox from "../Components/SearchBox";
import BoardDetail from "../Components/BoardDetail";

const UnivBoardDetail = props => {
    const dispatch = useDispatch();
    const postFromState = useSelector(state => state.univBoard.postDetail);
    const user = useSelector(state => state.user);
    const commentList = useSelector(state => state.univBoard.commentList);
    const postId = Number(props.match.params.id);
    const [isEditing, setIsEditing] = useState(false);

    const getContentFromEditor = content => {
        //에디터로부터 content 값 가져오기
        setContent(content);
    };

    useEffect(() => {
        //state로부터 post 정보를 받아오면, 바로 넣어주기!
        //isEditing이 바뀔 때마다 아래의 항목이 실행된다.\
        if (isEditing && postFromState) {
            console.log("state들에게 setState 해주는 중!");
            //isEditing이랑 postFromState가 있을때마다 setstate를 해주고있으므로, 따로 리셋 처리 안해줘도 됨!
            setCategory(postFromState.category);
            setTitle(postFromState.title);
            setContent(postFromState.content);
            return;
        }
        //여기 물어봐야지(정후)
        if (!postFromState.title && postFromState.post_id !== postId) {
            console.log(
                "post 값이 없거나 id가 일치하는 게시글이 아니면 실행됨!",
            );
            console.log(postFromState.post_id, postId);
            // 그냥 !postFromState를 하니까 있는 걸로 판단해서 .title 까지 넣어줌.
            dispatch(detailUnivBoardPostDB(postId));
            dispatch(getUnivBoardCommentDB(postId));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing]);

    const handleDelete = () => {
        const data = {
            postId: postFromState.post_id,
        };
        dispatch(deleteUnivBoardPostDB(data));
        history.replace("/univBoard");
    };

    //------------------------댓글 기능-----------------------//
    const [comment, setComment] = useState("");

    const handleCommentChange = e => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = () => {
        const data = {
            postId,
            content: comment,
        };
        dispatch(addUnivBoardCommentDB(data));
        setComment("");
    };

    //----------------------------수정------------------------
    const [category, setCategory] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [content, setContent] = useState(undefined);

    const handleEditSubmit = () => {
        const data = {
            postId: postFromState.post_id,
            category,
            title,
            content,
            univId: user.user.univ_id,
        };
        dispatch(editUnivBoardPostDB(data));
        setIsEditing(false);
    };

    if (isEditing)
        return (
            // 수정페이지
            <>
                <div>
                    {categories.univCategory.map(ele => (
                        <button
                            key={ele.categoryId}
                            onClick={() => {
                                setCategory(ele.categoryId);
                            }}
                        >
                            {ele.categoryName}
                        </button>
                    ))}
                </div>
                <input
                    name="title"
                    value={title || ""}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <Editor
                    originContent={content || ""}
                    getContentFromEditor={getContentFromEditor}
                />
                <button onClick={handleEditSubmit}>수정완료</button>
                <button onClick={() => setIsEditing(!isEditing)}>
                    뒤로가기
                </button>
            </>
        );

    return (
        //디테일페이지
        <>
            <SearchBox searchTag={categories.univBoardTags} page="univboard" />
            <BoardDetail page="univboard" />
            <BoardComment
                boardName="univboard"
                postId={postId}
                commentList={commentList}
            />
        </>
    );
};

export default withRouter(UnivBoardDetail);
