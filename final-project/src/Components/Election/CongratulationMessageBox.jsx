import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//통신
import { useSelector, useDispatch } from "react-redux";
import {
    getCongratulationDB,
    addCongratulationDB,
    editCongratulationDB,
    deleteCongratulationDB,
} from "../../Redux/Async/election";

//작성일자 (e.g 방금 전, 1시간전) 계산 라이브러리
import TimeCounting from "time-counting";
import moment from "moment";

//alert
import Swal from "sweetalert2";
import confirm from "../../Shared/confirm";

//컴포넌트
import DefaultButton from "../../Elements/Buttons/DefaultButton";

//체험용 더미데이터입니다.
const testCommentList = [
    {
        comment_id: 1,
        user_id: "",
        post_id: "",
        content: "너무 아름다워요!!",
        createdAt: "2021-09-02 00:21:21",
        updatedAt: "2021-09-02 00:21:21",
        user: {
            user_id: "",
            nickname: "UFO대장",
        },
    },
    {
        comment_id: 2,
        user_id: 1,
        post_id: "",
        content: "눈부셔!",
        createdAt: "2021-09-02 00:22:38",
        updatedAt: "2021-09-02 00:22:38",
        user: {
            user_id: "",
            nickname: "UFOUFO",
        },
    },
];

//isTest는 테스트용인지 아닌지 알 수 있는 판별값입니다.
const CongratulationMessageBox = ({ electionPostId, isTest }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.election.congratulationList);
    const [content, setContent] = useState("");
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state

    useEffect(() => {
        if (!isTest && electionPostId) {
            //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.
            const req = {
                election_id: electionPostId,
            };
            dispatch(getCongratulationDB(req));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const addComment = () => {
        //필요한 정보들을 정리하고, 당선축하메세지를 불러오는 api를 연결합니다.

        if (isTest)
            return Swal.fire(
                "잠깐!",
                "체험용 선거에서는 댓글기능을 사용할 수 없어요!",
                "error",
            );

        const req = {
            election_id: electionPostId,
            content: content,
        };
        confirm.addEditConfirm(() => dispatch(addCongratulationDB(req)));

        setContent("");
    };

    return (
        <Container>
            <Title isDarkTheme={isDarkTheme}>축하 한마디</Title>
            <InputCongratulation isDarkTheme={isDarkTheme}>
                <input
                    placeholder="당선자에게 축하와 응원 메시지를 남겨주세요"
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <DefaultButton onClick={addComment}>등록</DefaultButton>
            </InputCongratulation>
            <CommentBox>
                {isTest &&
                    testCommentList.map(comment => (
                        <Comment
                            key={comment.comment_id}
                            comment={comment}
                            electionPostId={electionPostId}
                            isDarkTheme={isDarkTheme}
                        />
                    ))}
                {commentList &&
                    commentList.map(comment => (
                        // 각 댓글의 데이터들이 들어가는 공간입니다.
                        <Comment
                            key={comment.comment_id}
                            comment={comment}
                            electionPostId={electionPostId}
                            isDarkTheme={isDarkTheme}
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
    @media ${({ theme }) => theme.mobile} {
        margin: 24px 0 16px 0;
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(16, "extraBold", "white")
                : mixin.textProps(16, "extraBold", "black")}
    }
`;

const InputCongratulation = styled.div`
    margin-bottom: 20px;
    padding-bottom: 5px;
    ${mixin.flexBox("space-between")}
    ${mixin.outline("1px solid", "blue3", "bottom")}
     @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(16)};
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(16, "extraBold", "white")
                : mixin.textProps(16, "extraBold", "black")}
    }
    input {
        all: unset;
        width: 100%;
        ${mixin.textProps(18, "semiBold", "white")}
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                props.isDarkTheme
                    ? mixin.textProps(14, "semiBold", "white")
                    : mixin.textProps(14, "semiBold", "black")};
        }
        ::placeholder {
            ${mixin.textProps(18, "semiBold", "blue2")};
            @media ${({ theme }) => theme.mobile} {
                ${props =>
                    props.isDarkTheme
                        ? mixin.textProps(14, "semiBold", "gray2")
                        : mixin.textProps(14, "semiBold", "gray3")};
            }
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

const Comment = ({ comment, isDarkTheme }) => {
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
                    src={require("../../Assets/pngegg2.webp").default}
                    alt="user"
                />
                <UserName isDarkTheme={isDarkTheme}>
                    {comment.user?.nickname}
                </UserName>
                <Time isDarkTheme={isDarkTheme}>
                    {TimeCounting(comment.createdAt, timeOption)}
                </Time>
                <Controls isDarkTheme={isDarkTheme}>
                    {isAuthor && (
                        <>
                            {isEdit ? (
                                <>
                                    <button onClick={cancelEdit}>취소</button>
                                    <button onClick={editComment}>저장</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={clickEditBtn}>수정</button>
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
                        isDarkTheme={isDarkTheme}
                        type="text"
                        value={content}
                        placeholder="댓글을 적어주세요"
                        onChange={e => setContent(e.target.value)}
                    />
                ) : (
                    <CommentContent isDarkTheme={isDarkTheme}>
                        {comment.content}
                    </CommentContent>
                )}
            </Content>
        </CommentContainer>
    );
};
const CommentContainer = styled.div`
    :not(:last-child) {
        margin-bottom: 20px;
        @media ${({ theme }) => theme.mobile} {
            margin-bottom: 16px;
        }
    }
`;

const Header = styled.div`
    ${mixin.flexBox(null, "center")}
    > :first-child {
        margin-right: 8px;
    }
    > :not(:first-child, :last-child) {
        margin-right: 16px;
    }
    margin-bottom: 8px;
`;

const UserImage = styled.img`
    height: 24px;
    width: 24px;
`;

const UserName = styled.span`
    ${mixin.textProps(14, "semiBold", "blue2")}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(12, "semiBold", "gray3")
                : mixin.textProps(12, "semiBold", "gray2")}
    }
`;

const Time = styled.span`
    ${mixin.textProps(14, "semiBold", "blue2")}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(12, "semiBold", "gray3")
                : mixin.textProps(12, "semiBold", "gray2")}
    }
`;

const Content = styled.div`
    ${mixin.textProps(20, "regular", "white")}
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(16, "semiBold", "mainGray")
                : mixin.textProps(16, "semiBold", "black")}
    }
`;

const EditInput = styled.input`
    all: unset;
    width: 70%;
    ${mixin.outline("1px solid", "blue3", "bottom")}
    transition: border-bottom .5s ease;
    ${mixin.textProps(20, "regular", "white")}

    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(16, "regular", "white")
                : mixin.textProps(16, "regular", "black")};

        ${props =>
            props.isDarkTheme
                ? mixin.outline("1px solid", "gray3", "bottom")
                : mixin.outline("1px solid", "gray2", "bottom")};
    }
    :focus {
        ${mixin.outline("1px solid", "white", "bottom")}
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                props.isDarkTheme
                    ? mixin.outline("1px solid", "white", "bottom")
                    : mixin.outline("1px solid", "black", "bottom")}
        }
    }
    ::placeholder {
        ${mixin.textProps(20, "regular", "gray4")}
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                props.isDarkTheme
                    ? mixin.textProps(16, "semiBold", "gray3")
                    : mixin.textProps(16, "semiBold", "gray2")}
        }
    }
`;
const CommentContent = styled.p`
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(16, "semiBold", "mainGray")
                : mixin.textProps(16, "semiBold", "black")}
    }
`;
const Controls = styled.div`
    ${mixin.flexBox(null, "center")}
    button {
        ${mixin.textProps(14, "semiBold", "blue2")}
        border-radius: 10px;
        background: transparent;
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                props.isDarkTheme
                    ? mixin.textProps(12, "semiBold", "gray3")
                    : mixin.textProps(12, "semiBold", "gray2")}
        }
    }
    button:not(:last-child) {
        margin-right: 10px;
    }
`;
export default CongratulationMessageBox;
