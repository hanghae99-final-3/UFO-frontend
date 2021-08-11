import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { addElectionDB } from "../redux/async/election";
import { useDispatch } from "react-redux";
import moment from "moment";

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
    const [post, setPost] = useState({ candidate: [{}] }); //입력값이 여기로 담겨진다.
    const [isLoading, setIsLoading] = useState(false); //업로드중인지 아닌지 판별하는 state
    const fileInput = useRef();

    const addCard = () => {
        //카드 추가하기
        setPost({ ...post, candidate: [...post.candidate, {}] });
    };

    const deleteCard = currentIdx => {
        //카드 삭제하기
        setPost({
            ...post,
            candidate: post.candidate.filter((ele, idx) => currentIdx !== idx),
        });
    };

    const setElectionInfo = event => {
        //선거의 정보들을 받아와서 post에 정보를 넣어주는 함수입니다.
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
    console.log(post);
    const setCandidateInfo = (currentIdx, event) => {
        //후보자들의 정보들을 받아와서 post에 정보를 넣어주는 함수입니다.
        const keyName = event.target.attributes.getNamedItem("name").value; //post에 넣어줄 key 입니다.
        const value = event.target.value; //post에 넣어줄 value 입니다.
        console.log(currentIdx, keyName, value);
        setPost({
            ...post,
            candidate: post.candidate.map((ele, idx) =>
                idx === currentIdx ? { ...ele, [keyName]: value } : ele,
            ),
        });
    };

    const selectFileImageUploader = currentIdx => {
        if (isLoading) return; //업로드중이 아닐때에만 파일선택하게 한다.
        setIsLoading(true);

        setPost({
            //파일객체를 post에 담아둔다.
            ...post,
            candidate: post.candidate.map((ele, idx) =>
                idx === currentIdx ? { ...ele, photo: "" } : ele,
            ),
        });

        //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
        const file = fileInput.current.files[0]; //파일객체;

        const req = { img: file }; //서버에서 사용할 데이터

        //----multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
        let formData = new FormData();
        for (let entry of Object.entries(req)) {
            formData.append(entry[0], entry[1]);
        }
        //----

        //----통신헤더설정
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        //----

        async function sendImg() {
            try {
                const {
                    data: { result: imgUrl },
                } = await axios.post(
                    "http://3.36.90.60/util/image",
                    formData,
                    config,
                );

                setPost({
                    //통신 후 받아온 imgUrl을 post 안에 담아둔다. 이 imgUrl을 사용하여 화면에서 미리보기를 구현한다.
                    ...post,
                    candidate: post.candidate.map((ele, idx) =>
                        idx === currentIdx ? { ...ele, imgUrl } : ele,
                    ),
                });
            } catch (err) {
                alert("이미지를 등록할 수 없습니다.");
            }
        }
        sendImg();

        setIsLoading(false);
        //----
    };

    const addElection = () => {
        dispatch(addElectionDB(post));
    };

    return (
        <ElectionContainer>
            <ElectionInfoBox>
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
                <TextField
                    name="start_date"
                    id="datetime-local"
                    label="선거 시작일"
                    type="datetime-local"
                    defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
                <TextField
                    name="end_date"
                    id="datetime-local"
                    label="선거 종료일"
                    type="datetime-local"
                    defaultValue={moment()
                        .add(7, "d")
                        .format("YYYY-MM-DDTHH:mm")}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setElectionInfo(e)}
                />
            </ElectionInfoBox>
            <CandidateInfoBox className={classes.root}>
                {post &&
                    post.candidate.map((ele, idx) => (
                        <Accordion key={idx}>
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
                            <AccordionDetails>
                                <CandidateWriteBox>
                                    <CandidateImage>
                                        <Freeview
                                            onClick={() =>
                                                fileInput.current.click()
                                            }
                                        >
                                            {/* 후보자의 이미지가 있으면 보여주고, 아니면 default string을 보여준다. */}
                                            {ele.imgUrl ? (
                                                <img
                                                    src={`http://3.36.90.60/${ele.imgUrl}`}
                                                    alt={post.imgurl}
                                                />
                                            ) : (
                                                <span>
                                                    클릭하여 이미지를 추가해
                                                    주세요!
                                                </span>
                                            )}
                                        </Freeview>
                                        <Uploader
                                            ref={fileInput}
                                            type="file"
                                            onChange={() =>
                                                selectFileImageUploader(idx)
                                            }
                                            disabled={isLoading}
                                        />
                                    </CandidateImage>
                                    <CandidateContent>
                                        <input
                                            name="name"
                                            placeholder="이름을 작성해주세요!"
                                            onChange={e =>
                                                setCandidateInfo(idx, e)
                                            }
                                        />
                                        <input
                                            name="major"
                                            placeholder="학과를 작성해주세요!"
                                            onChange={e =>
                                                setCandidateInfo(idx, e)
                                            }
                                        />
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
            </CandidateInfoBox>
        </ElectionContainer>
    );
};

const ElectionContainer = styled.div``;

const ElectionInfoBox = styled.div`
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
`;

const CandidateInfoBox = styled.div``;

const Freeview = styled.div`
    height: 100%;
    width: 300px;
`;
const CandidateWriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const CandidateImage = styled.div``;

const Uploader = styled.input`
    display: none;
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
