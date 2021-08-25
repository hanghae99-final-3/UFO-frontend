import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import { CongratulationMessageApi } from "../../api";
import Swal from "sweetalert2";
import TimeCounting from "time-counting";
import moment from "moment";

const CongratulationMessageBox = ({ electionPostId }) => {
    const [messageList, setMessageList] = useState([]);
    const [content, setContent] = useState("");
    useEffect(() => {
        if (electionPostId) {
            //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.
            const req = {
                election_id: electionPostId,
            };
            CongratulationMessageApi.getMessage(req).then(res => {
                if (res.data.ok) setMessageList(res.data.result);
            });
        }
    }, []);

    const addMessage = () => {
        const addMessageDB = async () => {
            //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.
            const req = {
                election_id: electionPostId,
                content: content,
            };
            const res = await CongratulationMessageApi.addMessage(req);
            if (res.data.ok)
                setMessageList({ ...messageList, ...res.data.result });
            else Swal.fire("에러", "메세지를 추가할 수 없어요!", "error");
        };
        addMessageDB();
    };

    return (
        <Container>
            <Title>축하 한마디</Title>
            <InputCongratulation>
                <input
                    placeholder="당선자에게 축하와 응원 메시지를 남겨주세요"
                    type="text"
                    onChange={e => setContent(e.target.value)}
                />
                <DefaultButton onClick={() => addMessage()}>등록</DefaultButton>
            </InputCongratulation>
            <CommentBox>
                {messageList &&
                    messageList.map(massage => (
                        // 각 댓글의 데이터들이 들어가는 공간입니다.
                        <Comment
                            key={massage.comment_id}
                            comment={massage}
                            electionPostId={electionPostId}
                        />
                    ))}
            </CommentBox>
        </Container>
    );
};

const Container = styled.div``;
const Title = styled.h5`
    ${mixin.textProps(18, "extraBold", "white")}
    margin: 30px 0 20px 0;
`;

const InputCongratulation = styled.div`
    padding-bottom: 5px;
    ${mixin.flexBox("space-between")}
    ${mixin.outline("1px solid", "blue3", "bottom")}
    input {
        all: unset;
        width: 100%;
        ${mixin.textProps(18, "semiBold", "white")}
        ::placeholder {
            ${mixin.textProps(18, "semiBold", "blue2")};
        }
    }
`;

const CommentBox = styled.div``;

const Comment = ({ comment }) => {
    const [content, setContent] = useState(
        comment.content ? comment.content : "",
    );
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const editComment = () => {
        const req = {
            comment_id: comment.comment_id,
            content: content,
        };
        CongratulationMessageApi.editMessage(req).then(res => {
            if (res.data.ok) console.log(res);
        });
        setContent(content);
        setIsEdit(false);
    };

    const deleteComment = () => {
        const req = {
            comment_id: comment.comment_id,
        };
        CongratulationMessageApi.deleteMessage(req).then(res => {
            if (res.data.ok) console.log(res);
        });
        setIsEdit(false);
    };

    // 댓글 작성 시간 표기 기본 옵션 설정
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    return (
        <CommentContainer>
            <Header>
                <UserImage
                    src={require("../../assets/pngegg2.webp").default}
                    alt="user"
                />
                <UserName>{comment.user.nickname}</UserName>
                <Time>
                    {/* {TimeCounting(comment.createdAt, timeOption)} */}
                </Time>
                <Controls>
                    {isEdit ? (
                        <>
                            <button onClick={() => setIsEdit(false)}>
                                취소
                            </button>
                            <button onClick={editComment}>저장</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEdit(true)}>
                                수정
                            </button>
                            <button onClick={deleteComment}>삭제</button>
                        </>
                    )}
                </Controls>
            </Header>
            <Content>
                {/* 수정모드면 input이 나타나고, 아니면 text가 나타납니다. */}
                {isEdit ? (
                    <EditInput
                        type="text"
                        value={content}
                        placeholder="댓글을 적어주세요"
                        onChange={e => setContent(e.target.value)}
                    />
                ) : (
                    <CommentContent>{comment.content}</CommentContent>
                )}
            </Content>
        </CommentContainer>
    );
};
const CommentContainer = styled.div``;

const Header = styled.div`
    ${mixin.flexBox(null, "center")}
    > * {
        height: 100%;
    }
    > :not(:last-child) {
        margin-right: 10px;
    }
`;
const Time = styled.span`
    ${mixin.textProps(14, "semiBod", "gray2")}
`;
const UserName = styled.span`
    ${mixin.textProps(14, "semiBod", "gray2")}
`;

const UserImage = styled.img`
    height: 25px;
    width: 25px;
`;
const Content = styled.div``;
const EditInput = styled.input``;
const CommentContent = styled.p``;
const Controls = styled.div``;
export default CongratulationMessageBox;
