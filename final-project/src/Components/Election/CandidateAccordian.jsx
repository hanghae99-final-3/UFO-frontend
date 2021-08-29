import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//컴포넌트
import DefaultButton from "../../Elements/Buttons/DefaultButton";

//머테리얼 ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// isLoading은 유저가 사진을 선택해서 다운로드받을때에는 파일을 선택할 수 없게 막기 위한 판별값입니다.
const CandidateAccordian = ({
    candidates,
    getData,
    getImageData,
    isLoading,
    addCard,
    deleteCard,
}) => {
    const [focusCardList, setFocusCardList] = useState([]);

    const setFocusList = idx => {
        //---- 포커스가 된 아코디언카드의 idx를 가져와서 focusCardList에 저장한다. 이미 focusCardList에 있는 값이라면 삭제한다.
        if (focusCardList.includes(idx)) {
            const updateList = focusCardList.filter(ele => ele !== idx);
            return setFocusCardList(updateList);
        }

        setFocusCardList([...focusCardList, idx]);
    };

    return (
        <Container>
            <CandidateControls>
                <span>현재 후보자 인원: {candidates?.length}명</span>
                <DefaultButton onClick={addCard}>후보자 추가</DefaultButton>
            </CandidateControls>
            {candidates?.map((ele, idx) => (
                // 머테리얼 ui의 Accordion을 적용한 부분입니다.
                <StyledAccordion
                    key={idx}
                    isFocus={focusCardList.includes(`${idx}`)}
                >
                    <Accordion>
                        {/* 아코디언 디자인의 헤더 부분입니다. */}
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            onClick={() => setFocusList(`${idx}`)}
                        >
                            <CandidateTitle>기호 {idx + 1}번</CandidateTitle>
                            <DefaultButton onClick={() => deleteCard(idx)}>
                                삭제
                            </DefaultButton>
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
                                                alt={ele.name}
                                            />
                                        ) : (
                                            <span>이미지를 추가해 주세요!</span>
                                        )}
                                        <Uploader
                                            type="file"
                                            onChange={e => getImageData(e, idx)}
                                            disabled={isLoading}
                                        />
                                    </Freeview>
                                    {/* Uploader은 type이 file인 input입니다. 브라우저 상에서는 보이지 않게 숨겨두었습니다. */}
                                </CandidateImage>
                                {/* 후보자의 상세 내용이 담길 곳입니다. */}
                                <CandidateContent>
                                    {/* 후보자의 이름 */}
                                    <span>이름</span>
                                    <input
                                        name="name"
                                        placeholder="이름을 작성해주세요!"
                                        value={ele.name ? ele.name : ""}
                                        onChange={e => getData(idx, e)}
                                    />
                                    {/* 후보자의 학과 */}
                                    <span>전공</span>
                                    <input
                                        name="major"
                                        placeholder="학과를 작성해주세요!"
                                        value={ele.major ? ele.major : ""}
                                        onChange={e => getData(idx, e)}
                                    />
                                    {/* 후보자의 소개 */}
                                    <span>소개</span>
                                    <textarea
                                        name="content"
                                        placeholder="소개를 작성해주세요!"
                                        value={ele.content ? ele.content : ""}
                                        onChange={e => getData(idx, e)}
                                    />
                                </CandidateContent>
                            </CandidateWriteBox>
                        </AccordionDetails>
                    </Accordion>
                </StyledAccordion>
            ))}
        </Container>
    );
};

const Container = styled.div``;

const StyledAccordion = styled.div`
    margin-bottom: 1px;
    position: relative;

    /* 아코디언의 border설정 */
    ${props =>
        props.isFocus
            ? mixin.outline("4px solid", "mainMint", "top")
            : mixin.outline("4px solid", "blue2", "top")}

    /* 아코디언을 접고펴는 아이콘 스타일링 */
    ${props =>
        props.isFocus
            ? `.MuiAccordionSummary-expandIcon {
        color: ${props.theme.color.mainMint};
    }`
            : `.MuiAccordionSummary-expandIcon {
        color: ${props.theme.color.gray2};
    }`}
    
    .MuiAccordionSummary-content {
        ${mixin.flexBox("space-between", "center")}
    }

    .MuiPaper-elevation1 {
        box-shadow: none;
    }
`;

const CandidateTitle = styled.span`
    ${mixin.textProps(30, "extraBold", "gray2")}
    margin-right: 10px;
`;

const CandidateControls = styled.div`
    margin: 10px 0;
    ${mixin.flexBox("space-between", "center")}
`;

const Freeview = styled.div`
    ${mixin.floatBox("relative")}
    width: 210px;
    border-radius: 25px;
    ${mixin.flexBox("center", "center", null, "250px")}
    ${mixin.boxShadow()};
    margin-right: 80px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    span {
        ${mixin.textProps(20, "regular", "gray1")}
    }
`;
const CandidateWriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 30px 70px;
`;
const CandidateImage = styled.div``;

const Uploader = styled.input`
    ${mixin.floatBox("absolute", "0", null, null, "0")}
    width: 100%;
    height: 100%;
    z-index: 99;
    opacity: 0;
`;

const CandidateContent = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 40px 10px;
    width: 100%;
    align-items: flex-start;
    span {
        ${mixin.textProps(20, "semiBold", "gray1")}
    }
    input,
    textarea {
        width: 100%;
        all: unset;
        padding-bottom: 10px;
        ${mixin.outline("1px solid", "gray4", "bottom")}
        ${mixin.textProps(20, "regular", "gray2")}
        transition: border-bottom 1s ease;
        ::placeholder {
            ${mixin.textProps(20, "regular", "gray4")}
        }
        :focus {
            ${mixin.outline("1px solid", "gray1", "bottom")}
        }
    }
    textarea {
        height: 100px;
    }
`;

export default CandidateAccordian;
