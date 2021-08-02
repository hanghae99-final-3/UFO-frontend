import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUnivBoardPostDB } from "../redux/async/univBoardAsync";

const UniboardWrite = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(0);

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
        }
    };

    return (
        <React.Fragment>
            <div>
                <button onClick={() => setCategory(0)}>수업</button>
                <button onClick={() => setCategory(1)}>맛집</button>
                <button onClick={() => setCategory(2)}>스터디</button>
                <button onClick={() => setCategory(3)}>알바</button>
                <button onClick={() => setCategory(4)}>익명</button>
                <button onClick={() => setCategory(5)}>기타</button>
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

export default UniboardWrite;
