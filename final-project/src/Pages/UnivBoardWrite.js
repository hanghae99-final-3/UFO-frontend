import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addUnivBoardPostDB,
    editUniBoardCommentDB,
} from "../redux/async/univBoard";
import categories from "../categories";
import Editor from "../Components/Editor";

const UnivboardWrite = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(undefined);
    console.log(
        `title:::${title}, content:::${content}, category:::${category}`,
    );
    const getContentFromEditor = content => {
        //에디터로부터 content 값 가져오기
        setContent(content);
    };

    const onChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = () => {
        if (category === undefined) return alert("카테고리를 설정해주세요!");
        if (title && content && user.isLoggedIn) {
            const data = {
                title,
                content,
                category,
                univId: user.user.univ_id,
            };
            dispatch(addUnivBoardPostDB(data));
            setTitle("");
            setContent("");
        } else if (!user.isLoggedIn) {
            alert("게시글 작성은 로그인이 필요합니다.");
        }
    };

    return (
        <React.Fragment>
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
            <div>
                <input
                    name="title"
                    placeholder={"TITLE"}
                    onChange={onChange}
                    value={title}
                />
            </div>
            <Editor getContentFromEditor={getContentFromEditor} />

            <button onClick={handleSubmit}>입력</button>
        </React.Fragment>
    );
};

export default UnivboardWrite;
