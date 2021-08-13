import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { addElectionDB } from "../redux/async/election";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import confirm from "../confirm";

//컴포넌트
import Message from "../Components/Message";

//alert 라이브러리
import Swal from "sweetalert2";

//머테리얼 ui
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(20), //폰트크기
        fontWeight: theme.typography.fontWeightBold, //폰트굵기
        marginRight: theme.typography.pxToRem(10),
    },
    button: {
        padding: theme.spacing(1),
    },
}));

const ElectionWrite = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false); //이미지가 업로드중인지 아닌지 판별하는 state (이미 이미지가 업로드 중이면(true면) 이미지 업로드를 막는 역할)
    const user = useSelector(state => state.user.user);

    //기본 선거시작시간은 현재로부터 10분뒤입니다.
    const defaultStartDate =
        moment().add(10, "minutes").format("YYYY-MM-DD HH:mm") + ":00";
    //기본 선거종료시간은 현재로부터 7일 10분 뒤 입니다.
    const defaultEndDate =
        moment().add({ minutes: 10, days: 7 }).format("YYYY-MM-DD HH:mm") +
        ":00";

    //입력값 통합 state (모든 입력값이 여기로 담겨진다.)
    const [post, setPost] = useState({
        candidates: [{}],
        start_date: defaultStartDate,
        end_date: defaultEndDate,
    });

    useEffect(() => {
        // 나중에 여기에 대학관리자만 들어올 수 있게 처리하자!
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
                    "http://3.36.90.60/util/image",
                    formData,
                    config,
                );
                setPost({
                    //통신 후 받아온 imgUrl을 post 안에 담아둔다. 이 imgUrl을 사용하여 화면에서 미리보기를 구현한다.
                    ...post,
                    candidates: post.candidates.map((ele, idx) => {
                        console.log(idx, currentIdx);
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
        let isWriteCandidatesInfo = true;
        for (let i = 0; i < post.candidates.length; i++)
            if (
                !post.candidates[i].name ||
                !post.candidates[i].content ||
                !post.candidates[i].major
            ) {
                isWriteCandidatesInfo = false;
                return;
            }
        if (!isWriteCandidatesInfo)
            return Swal.fire(
                "에러",
                "후보자의 정보를 모두 입력해주세요.",
                "error",
            );
        //----

        //----서버로 보낼 데이터를 정리하고, 선거게시글을 추가하는 미들웨어 함수로 보낸다.
        const req = {
            name: post.name,
            content: post.content,
            country_id: user.country_id,
            univ_id: user.univ_id,
            candidates: post.candidates,
            start_date: post.start_date,
            end_date: post.end_date,
        };
        dispatch(addElectionDB(req));
        //----
    };

    //대학 인증을 한 사람만 볼 수 있도록 예외처리를 합니다.
    if (!user.univ_id || !user.country_id)
        return (
            <Message
                message="대학인증을 한 사람만 선거게시글을 볼 수 있어요"
                link="/mypage"
                buttonValue="대학인증하러가기"
            />
        );

    return (
        <ElectionWriteContainer>
            {/* 선거 게시글의 제목, 내용, 시작일, 종료일을 입력하는 곳입니다. */}
            <WriteElectionInfoBox>
                {/* 선거게시글 제목입력란 */}
                <TextField
                    name="name"
                    label="제목"
                    type="text"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
                {/* 선거게시글 내용입력란 */}
                <TextField
                    name="content"
                    label="내용"
                    type="text"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
                {/* 선거시작일 입력란 */}
                <TextField
                    name="start_date"
                    id="datetime-local"
                    label="선거 시작일"
                    type="datetime-local"
                    defaultValue={moment(defaultStartDate).format(
                        "YYYY-MM-DDTHH:mm",
                    )}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
                {/* 선거종료일 입력란 */}
                <TextField
                    name="end_date"
                    id="datetime-local"
                    label="선거 종료일"
                    type="datetime-local"
                    defaultValue={moment(defaultEndDate).format(
                        "YYYY-MM-DDTHH:mm",
                    )}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
            </WriteElectionInfoBox>
            {/* 선거 후보자의 이름, 학과, 소개, 사진을 입력하는 곳입니다. */}
            <WriteCandidateBox className={classes.root}>
                {post &&
                    post.candidates.map((ele, idx) => (
                        // 머테리얼 ui의 Accordion을 적용한 부분입니다.
                        <Accordion key={idx}>
                            {/* 아코디언 디자인의 헤더 부분입니다. */}
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>
                                    기호 {idx + 1}번
                                </Typography>
                                <Button
                                    className={classes.button}
                                    onClick={() => deleteCard(idx)}
                                >
                                    삭제
                                </Button>
                            </AccordionSummary>
                            {/* 아코디언 디자인의 상세내용 부분입니다. */}
                            <AccordionDetails>
                                <CandidateWriteBox>
                                    {/* 후보자의 사진에 관련된 작업을 하는 공간입니다. */}
                                    <CandidateImage>
                                        {/* 후보자의 사진을 미리보기 할 수 있는 곳입니다. */}
                                        <Freeview>
                                            {/* 후보자의 이미지가 있으면 보여주고, 아니면 기본문자열을 보여줍니다. */}
                                            {ele.photo ? (
                                                <img
                                                    src={`http://3.36.90.60/${ele.photo}`}
                                                    alt={post.photo}
                                                />
                                            ) : (
                                                <span>
                                                    클릭하여 이미지를 추가해
                                                    주세요!
                                                </span>
                                            )}
                                            <Uploader
                                                type="file"
                                                onChange={e =>
                                                    selectFileImageUploadSetData(
                                                        e,
                                                        idx,
                                                    )
                                                }
                                                disabled={isLoading}
                                            />
                                        </Freeview>
                                        {/* Uploader은 type이 file인 input입니다. 브라우저 상에서는 보이지 않게 숨겨두었습니다. */}
                                    </CandidateImage>
                                    {/* 후보자의 상세 내용이 담길 곳입니다. */}
                                    <CandidateContent>
                                        {/* 후보자의 이름 */}
                                        <input
                                            name="name"
                                            placeholder="이름을 작성해주세요!"
                                            onChange={e =>
                                                setCandidateInfo(idx, e)
                                            }
                                        />
                                        {/* 후보자의 학과 */}
                                        <input
                                            name="major"
                                            placeholder="학과를 작성해주세요!"
                                            onChange={e =>
                                                setCandidateInfo(idx, e)
                                            }
                                        />
                                        {/* 후보자의 소개 */}
                                        <textarea
                                            name="content"
                                            placeholder="소개를 작성해주세요!"
                                            onChange={e =>
                                                setCandidateInfo(idx, e)
                                            }
                                        />
                                    </CandidateContent>
                                </CandidateWriteBox>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                <Button onClick={addCard}>후보자 추가</Button>
                <Button onClick={addElection}>저장</Button>
            </WriteCandidateBox>
        </ElectionWriteContainer>
    );
};

const ElectionWriteContainer = styled.div``;

const WriteElectionInfoBox = styled.div`
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
`;

const WriteCandidateBox = styled.div``;

const Freeview = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const CandidateWriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const CandidateImage = styled.div``;

const Uploader = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    left: 0;
    top: 0;
    opacity: 0;
`;

const CandidateContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    input,
    textarea {
        width: 100%;
        all: unset;
        border-bottom: 2px solid #707070;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
`;

export default ElectionWrite;
