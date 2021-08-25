import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import confirm from "../../confirm";
import Swal from "sweetalert2";

//작성일자 (e.g 방금 전, 1시간전) 계산 라이브러리
import TimeCounting from "time-counting";
import moment from "moment";
//

//통신
import { CongratulationApi } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import {
    getCongratulationDB,
    addCongratulationDB,
    editCongratulationDB,
    deleteCongratulationDB,
} from "../../redux/async/election";

//컴포넌트
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const CongratulationMessageBox = ({ electionPostId }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.election.congratulationList);
    const [content, setContent] = useState("");
    useEffect(() => {
        if (electionPostId) {
            //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.
            const req = {
                election_id: electionPostId,
            };
            dispatch(getCongratulationDB(req));
        }
    }, []);

    const addComment = () => {
        //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.
        const req = {
            election_id: electionPostId,
            content: content,
        };
        confirm.addConfirm(() => dispatch(addCongratulationDB(req)));

        setContent("");
    };

    return (
        <Container>
            <Title>축하 한마디</Title>
            <InputCongratulation>
                <input
                    placeholder="당선자에게 축하와 응원 메시지를 남겨주세요"
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <DefaultButton onClick={addComment}>등록</DefaultButton>
            </InputCongratulation>
            <CommentBox>
                {commentList &&
                    commentList.map(comment => (
                        // 각 댓글의 데이터들이 들어가는 공간입니다.
                        <Comment
                            key={comment.comment_id}
                            comment={comment}
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
    margin-bottom: 20px;
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
const CommentBox = styled.div`
    overflow-y: scroll;
    width: 100%;
    height: 250px;
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        height: 17%;
        background-color: ${({ theme }) => theme.color.mainMint};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.color.blue1};
    }
`;

const Comment = ({ comment }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content); //댓글 입력값을 저장할 곳입니다.
    const user = useSelector(state => state.user.user); //유저정보
    const isAuthor = user.user_id === comment.user_id ? true : false; //댓글의 작성자 인지 아닌지 판별해주는 값
    const [isEdit, setIsEdit] = useState(false);

    const clickEditBtn = () => {
        //isEdit가 false가 되면 text가 나타나고, true면 input이 나타나게 하는 스위치작동함수
        setIsEdit(!isEdit);
    };

    const cancelEdit = () => {
        //수정을 하다가 취소버튼을 누를 때, 사용하는 기능
        setContent(comment.content);
        setIsEdit(false);
    };

    const editComment = () => {
        const req = {
            comment_id: comment.comment_id,
            content: content,
        };
        dispatch(editCongratulationDB(req));
        setIsEdit(false);
    };

    const deleteComment = () => {
        const req = {
            comment_id: comment.comment_id,
        };
        confirm.deleteConfirm(() => dispatch(deleteCongratulationDB(req)));
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
                <UserName>{comment.user?.nickname}</UserName>
                <Time>{TimeCounting(comment.createdAt, timeOption)}</Time>
                <Controls>
                    {isAuthor && (
                        <>
                            {isEdit ? (
                                <>
                                    <button onClick={cancelEdit}>취소</button>
                                    <button onClick={editComment}>저장</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setIsEdit(true)}>
                                        수정
                                    </button>
                                    <button onClick={deleteComment}>
                                        삭제
                                    </button>
                                </>
                            )}
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
const CommentContainer = styled.div`
    :not(:last-child) {
        margin-bottom: 20px;
    }
`;

const Header = styled.div`
    ${mixin.flexBox(null, "center")}
    > :not(:last-child) {
        margin-right: 10px;
    }
    margin-bottom: 2px;
`;
const Time = styled.span`
    ${mixin.textProps(14, "semiBod", "blue2")}
`;
const UserName = styled.span`
    ${mixin.textProps(14, "semiBod", "blue2")}
`;

const UserImage = styled.img`
    height: 25px;
    width: 25px;
`;
const Content = styled.div`
    ${mixin.textProps(20, "regular", "white")}
`;
const EditInput = styled.input`
    transition: border-bottom 0.5s ease;
    width: 40%;
    all: unset;
    ${mixin.outline("1px solid", "blue3", "bottom")}
    :focus {
        ${mixin.outline("1px solid", "white", "bottom")}
    }
    ::placeholder {
        ${mixin.textProps(20, "regular", "gray4")}
    }
`;
const CommentContent = styled.p``;
const Controls = styled.div`
    line-height: 1;
    button {
        ${mixin.textProps(14, "semiBod", "blue2")}
        border-radius: 10px;
        background: transparent;
    }
    button:not(:last-child) {
        margin-right: 10px;
    }
`;
export default CongratulationMessageBox;
