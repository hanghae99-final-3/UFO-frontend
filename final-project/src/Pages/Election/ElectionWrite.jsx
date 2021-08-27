import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../Redux/configureStore";
import { useParams } from "react-router";
import moment from "moment";
import mixin from "../../Styles/Mixin";

//통신
import axios from "axios";
import { electionApi } from "../../Shared/api";
import { addElectionDB, editElectionDB } from "../../Redux/Async/election";

//컴포넌트
import Message from "../../Components/Shared/Message";
import DateTimePicker from "../../Components/Election/DateTimePicker";
import CandidateAccordian from "../../Components/Election/CandidateAccordian";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

//alert
import confirm from "../../Shared/confirm";
import Swal from "sweetalert2";

const ElectionWrite = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false); //이미지가 업로드중인지 아닌지 판별하는 state (이미 이미지가 업로드 중이면(true면) 이미지 업로드를 막는 역할)
    const userInfo = useSelector(state => state.user.user);
    const { id: electionPostId } = useParams(); //선거게시글의 포스트아이디입니다.
    const isEdit = electionPostId ? true : false; //수정모드인지 아닌지 판별해주는 값
    const isAdmin = useSelector(state => state.user.isAdmin); //관리자인지 아닌지 판별해주는 값
    const electionPostFromState = useSelector(
        state =>
            state.election.post?.election_id == electionPostId &&
            state.election.post,
    ); //기존 선거게시글의 내용이 담겨있습니다.
    //기본시간설정
    const defaultDate = {
        //기본 선거시작시간은 현재로부터 10분뒤입니다.
        start: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm") + ":00",
        //기본 선거종료시간은 현재로부터 7일 10분 뒤 입니다.
        end:
            moment().add({ minutes: 10, days: 7 }).format("YYYY-MM-DD HH:mm") +
            ":00",
    };

    //입력값 통합 state (모든 입력값이 여기로 담겨진다.)
    const [post, setPost] = useState({
        candidates: [{}],
        start_date: defaultDate.start,
        end_date: defaultDate.end,
    });

    useEffect(() => {
        if (!isAdmin) {
            Swal.fire("에러", "관리자만 선거를 열 수 있어요!", "error");
            return history.goBack();
        }

        //선거게시글ID와 state로부터 원본 게시글 정보를 불러올 수 있으면 입력값 통합 state에 저장한다.
        if (electionPostId && electionPostFromState)
            return setPost(electionPostFromState);
        if (electionPostId && !electionPostFromState) {
            //만약 스테이트에 post값이 없으면, api 요청해서 바로 값을 가져와서 post에 집어넣어준다.
            electionApi
                .getElection(electionPostId)
                .then(res => setPost(res.data.result));
        }
    }, []);

    const addCard = () => {
        //카드 추가하기
        setPost({ ...post, candidates: [...post.candidates, {}] });
    };

    const deleteCard = currentIdx => {
        //카드 삭제하기
        confirm.deleteConfirm(() => {
            setPost({
                ...post,
                candidates: post.candidates.filter(
                    (ele, idx) => currentIdx !== idx,
                ),
            });
        });
    };

    const setElectionInfo = event => {
        //선거의 메인정보들을 받아와서 post에 정보를 넣어주는 함수입니다.
        const keyName = event.target.attributes.getNamedItem("name").value; //post에 넣어줄 key 입니다.
        let value = event.target.value; //post에 넣어줄 value 입니다.

        if (keyName.includes("date"))
            //날짜데이터는 지정된 형식으로 변환시켜준다.
            value = moment(value).format("YYYY-MM-DD HH:mm") + ":00";
        setPost({
            ...post,
            [keyName]: value,
        });
    };

    const setCandidateInfo = (currentIdx, event) => {
        //후보자들의 정보들을 받아와서 post에 정보를 넣어주는 함수입니다.
        const keyName = event.target.attributes.getNamedItem("name").value; //post에 넣어줄 key 입니다.
        const value = event.target.value; //post에 넣어줄 value 입니다.
        setPost({
            ...post,
            candidates: post.candidates.map((ele, idx) =>
                idx === currentIdx ? { ...ele, [keyName]: value } : ele,
            ),
        });
    };

    const selectFileImageUploadSetData = (event, currentIdx) => {
        //유저가 파일을 선택하면 post 안에 파일객체를 저장하고, 서버에 파일객체를 보내고, imgUrl을 받아서 post 안에 imgUrl을 저장하는 역할을 합니다.
        if (isLoading) return; //업로드중이 아닐때에만 파일선택하게 한다.
        setIsLoading(true);

        //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
        const file = event.target.files[0]; //파일객체;
        const req = { img: file }; //서버에서 사용할 데이터

        //multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
        let formData = new FormData();
        for (let entry of Object.entries(req)) {
            formData.append(entry[0], entry[1]);
        }

        //통신헤더설정
        const config = {
            header: { "content-type": "multipart/form-data" },
        };

        async function sendImg() {
            //서버에 파일 객체를 보내서 imgUrl을 얻어온다.
            try {
                const {
                    data: { result: photo },
                } = await axios.post(
                    "https://yzkim9501.site",
                    formData,
                    config,
                );
                setPost({
                    //통신 후 받아온 imgUrl을 post 안에 담아둔다. 이 imgUrl을 사용하여 화면에서 미리보기를 구현한다.
                    ...post,
                    candidates: post.candidates.map((ele, idx) => {
                        return idx === currentIdx ? { ...ele, photo } : ele;
                    }),
                });
            } catch (err) {
                Swal.fire("에러", "이미지를 등록할 수 없습니다.", "error");
            }
        }
        sendImg();

        setIsLoading(false);
        //----
    };

    const addElection = () => {
        //서버로 보낼 데이터를 정리하고, 선거를 추가하는 미들웨어함수로 보낸다.
        //----선거게시글에 대한 내용이 빠져있으면 return 한다.
        if (!post.name || !post.content || !post.start_date || !post.end_date)
            return Swal.fire(
                "에러",
                "선거게시글에 대한 내용을 입력해주세요.",
                "error",
            );
        //----

        //----선거 시작일이 현재보다 전이거나 같으면 return한다.
        if (
            moment(post.start_date).isBefore(moment()) ||
            moment(post.start_date).isSame(moment())
        )
            return Swal.fire(
                "에러",
                "시작일을 현재시간보다 후로 설정해주세요.",
                "error",
            );
        //----

        //----선거 종료일이 시작일보다 전이거나 같으면 return한다.
        if (
            moment(post.end_date).isBefore(post.start_date) ||
            moment(post.end_date).isSame(post.start_date)
        )
            return Swal.fire(
                "에러",
                "종료일을 시작일 후로 설정해주세요.",
                "error",
            );
        //----

        // 후보자에 대한 정보가 있는지 없는지 알아보고, 없으면 return한다.
        for (let i = 0; i < post.candidates.length; i++)
            if (
                !post.candidates[i].name ||
                !post.candidates[i].content ||
                !post.candidates[i].major
            ) {
                Swal.fire(
                    "에러",
                    "후보자의 정보를 모두 입력해주세요.",
                    "error",
                );
                return;
            }

        //----

        //----서버로 보낼 데이터를 정리하고, 선거게시글을 수정하는 미들웨어 함수로 보낸다.
        if (isEdit) {
            const req = {
                name: post.name,
                content: post.content,
                country_id: userInfo.country_id,
                univ_id: userInfo.univ_id,
                candidates: post.candidates,
                start_date: post.start_date,
                end_date: post.end_date,
                election_id: post.election_id,
            };
            return dispatch(editElectionDB(req));
        }

        //----서버로 보낼 데이터를 정리하고, 선거게시글을 추가하는 미들웨어 함수로 보낸다.
        const req = {
            name: post.name,
            content: post.content,
            country_id: userInfo.country_id,
            univ_id: userInfo.univ_id,
            candidates: post.candidates,
            start_date: post.start_date,
            end_date: post.end_date,
        };
        dispatch(addElectionDB(req));
        //----
    };

    //대학 인증을 한 사람만 볼 수 있도록 예외처리를 합니다.
    if (!userInfo.univ_id || !userInfo.country_id)
        return (
            <Message
                message="대학인증을 한 사람만 선거게시글을 볼 수 있어요"
                link="/mypage"
                buttonValue="대학인증하러가기"
            />
        );
    return (
        <ElectionWriteContainer>
            {/* 선거 게시글의 제목, 내용을 입력하는 곳입니다. */}
            <WriteElectionInfoBox>
                <Title>투표 정보</Title>
                {/* 선거게시글 제목입력란 */}
                <InputTitle
                    name="name"
                    type="text"
                    placeholder="투표 제목을 입력해주세요."
                    value={post.name ? post.name : ""}
                    onChange={e => setElectionInfo(e)}
                />
                {/* 선거게시글 내용입력란 */}
                <InputContent
                    name="content"
                    type="text"
                    placeholder="투표 내용을 입력해주세요."
                    value={post.content ? post.content : ""}
                    onChange={e => setElectionInfo(e)}
                />
            </WriteElectionInfoBox>

            {/* 투표기간을 입력하는 공간입니다. */}
            <WriteElectionDurationBox>
                <Title>투표 기간</Title>
                <DateTimePicker
                    defaultDate={defaultDate}
                    originStartDate={post?.start_date}
                    originEndDate={post?.end_date}
                    getDateInfo={setElectionInfo}
                />
            </WriteElectionDurationBox>

            {/* 선거 후보자의 이름, 학과, 소개, 사진을 입력하는 곳입니다. */}
            <WriteCandidateBox>
                <Title bottomGap>후보자 정보</Title>
                <CandidateAccordian
                    candidates={post?.candidates}
                    getData={setCandidateInfo}
                    getImageData={selectFileImageUploadSetData}
                    isLoading={isLoading}
                    addCard={addCard}
                    deleteCard={deleteCard}
                />
            </WriteCandidateBox>
            <Controls>
                <DefaultButton onClick={addElection}>등록</DefaultButton>
            </Controls>
        </ElectionWriteContainer>
    );
};
const ElectionWriteContainer = styled.div``;

const Title = styled.h5`
    ${mixin.textProps(30, "extraBold", "black")};
    ${mixin.outline("1px solid", "gray4", "bottom")}
    padding-bottom: ${({ theme }) => theme.calRem(10)};

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(22, "extraBold", "black")};
        padding-bottom: ${({ theme }) => theme.calRem(8)};
    }
`;

const WriteElectionInfoBox = styled.div`
    ${mixin.flexBox(null, null, "column")};
    margin-bottom: ${({ theme }) => theme.calRem(70)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(48)};
    }
`;

const InputTitle = styled.input`
    border: none;
    padding: ${({ theme }) => theme.calRem(20)} 0;
    transition: border-bottom 1s ease;
    ${mixin.outline("1px solid", "gray4", "bottom")}
    ${mixin.textProps(40, "extraBold", "gray2")};
    ::placeholder {
        ${mixin.textProps(40, "extraBold", "gray4")};
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(22, "extraBold", "gray4")};
        }
    }
    :focus {
        ${mixin.outline("1px solid", "black", "bottom")};
    }

    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(16)} 0;
        ${mixin.textProps(22, "extraBold", "gray2")};
    }
`;
const InputContent = styled.textarea`
    border: none;
    padding: ${({ theme }) => theme.calRem(30)} 0;
    transition: border-bottom 1s ease;
    ${mixin.outline("1px solid", "gray4", "bottom")}
    ${mixin.textProps(20, "regular", "gray2")};
    ::placeholder {
        ${mixin.textProps(20, "regular", "gray4")};
    }
    :focus {
        ${mixin.outline("1px solid", "black", "bottom")};
    }
    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(24)} 0;
    }
`;

const WriteElectionDurationBox = styled.div``;

const WriteCandidateBox = styled.div``;

const Controls = styled.div`
    margin-top: ${({ theme }) => theme.calRem(30)};
    text-align: center;
`;

export default ElectionWrite;
