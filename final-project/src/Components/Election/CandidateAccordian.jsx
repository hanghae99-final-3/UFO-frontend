import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { useSelector } from "react-redux";

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
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
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
            <CandidateControls isDarkTheme={isDarkTheme}>
                <span>현재 후보자 인원: {candidates?.length}명</span>
                <DefaultButton onClick={addCard}>후보자 추가</DefaultButton>
            </CandidateControls>
            {candidates?.map((ele, idx) => (
                // 머테리얼 ui의 Accordion을 적용한 부분입니다.
                <StyledAccordion
                    key={idx}
                    isDarkTheme={isDarkTheme}
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
                            <CandidateTitle isDarkTheme={isDarkTheme}>
                                <span>기호 {idx + 1}번</span>
                                <span>{ele?.name}</span>
                            </CandidateTitle>
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
                                    <Freeview isDarkTheme={isDarkTheme}>
                                        {/* 후보자의 이미지가 있으면 보여주고, 아니면 기본문자열을 보여줍니다. */}
                                        {ele.photo ? (
                                            <img
                                                src={
                                                    process.env
                                                        .REACT_APP_API_URL +
                                                    ele.photo
                                                }
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
                                <CandidateContent isDarkTheme={isDarkTheme}>
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

    .MuiPaper-root {
        transition: all 0.5s ease;
        ${props =>
            props.isDarkTheme &&
            `background-color: ${props.theme.color.black};`};
    }
    .MuiPaper-root.MuiAccordion-root.Mui-expanded.MuiAccordion-rounded.MuiPaper-elevation1.MuiPaper-rounded {
        transition: all 0.5s ease;
        ${props =>
            props.isDarkTheme &&
            `background-color: ${props.theme.color.black};`};
    }

    .MuiAccordionSummary-content {
        ${mixin.flexBox("space-between", "center")}
    }

    .MuiPaper-elevation1 {
        box-shadow: none;
    }
`;

const CandidateTitle = styled.span`
    ${mixin.textProps(30, "extraBold", "gray2")}
    span:first-child {
        ${props =>
            mixin.textProps(
                30,
                "extraBold",
                props.isDarkTheme ? "white" : "gray2",
            )}
        margin-right: ${({ theme }) => theme.calRem(10)};
    }
`;

const CandidateControls = styled.div`
    margin: ${({ theme }) => theme.calRem(10)} 0;
    ${mixin.flexBox("space-between", "center")}
    span {
        ${props =>
            props.isDarkTheme
                ? mixin.textProps(20, "extraBold", "mainGray")
                : mixin.textProps(20, "extraBold", "gray1")};
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                props.isDarkTheme
                    ? mixin.textProps(16, "extraBold", "mainGray")
                    : mixin.textProps(16, "extraBold", "gray1")};
        }
    }
`;

const Freeview = styled.div`
    ${mixin.floatBox("relative")}
    width: ${({ theme }) => theme.calRem(210)};
    border-radius: 25px;
    ${mixin.flexBox("center", "center", null, `${theme.calRem(250)}`)}
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    margin-right: ${theme.calRem(80)};
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    span {
        ${props =>
            mixin.textProps(
                20,
                "regular",
                props.isDarkTheme ? "gray3" : "gray1",
            )}
    }
`;
const CandidateWriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: ${({ theme }) => `${theme.calRem(30)} ${theme.calRem(70)}`};
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
    gap: ${({ theme }) => `${theme.calRem(40)} ${theme.calRem(10)}`};
    width: 100%;
    align-items: flex-start;
    span {
        ${props =>
            mixin.textProps(
                20,
                "semiBold",
                props.isDarkTheme ? "white" : "gray1",
            )}//이름,전공,소개를 작성해주세요
    }
    input,
    textarea {
        width: 100%;
        all: unset;
        padding-bottom: ${({ theme }) => theme.calRem(10)};
        ${props =>
            mixin.outline(
                "1px solid",
                props.isDarkTheme ? "gray2" : "gray4",
                "bottom",
            )}
        ${mixin.textProps(20, "regular", "gray2")}
        transition: border-bottom 1s ease;
        ::placeholder {
            ${props =>
                mixin.textProps(
                    20,
                    "regular",
                    props.isDarkTheme ? "gray3" : "gray4",
                )}
        }
        :focus {
            ${mixin.outline("1px solid", "gray1", "bottom")}
        }
    }
    textarea {
        height: ${({ theme }) => theme.calRem(100)};
    }
`;

export default CandidateAccordian;
