import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addUnivBoardPostDB,
    editUniBoardCommentDB,
} from "../redux/async/univBoard";
import categories from "../categories";

const UnivboardWrite = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(undefined);

    const onChange = e => {
        const {
            target: { name, value },
        } = e;
        if (name === "title") {
            setTitle(value);
        } else {
            setContent(value);
        }
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
            <div>
                <input
                    name="content"
                    placeholder={"CONTENT"}
                    onChange={onChange}
                    value={content}
                />
            </div>
            <button onClick={handleSubmit}>입력</button>
        </React.Fragment>
    );
};

export default UnivboardWrite;
