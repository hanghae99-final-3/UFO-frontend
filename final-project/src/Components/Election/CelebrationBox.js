import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const CelebrationBox = () => {
    return (
        <Container>
            <Title>축하 한마디</Title>
            <InputCelebration>
                <input
                    placeholder="당선자에게 축하와 응원 메시지를 남겨주세요"
                    type="text"
                />
                <DefaultButton onClick={() => {}}>등록</DefaultButton>
            </InputCelebration>
        </Container>
    );
};

const Container = styled.div``;
const Title = styled.h5`
    ${mixin.textProps(18, "extraBold", "white")}
    margin: 30px 0 20px 0;
`;

const InputCelebration = styled.div`
    padding-bottom: 5px;
    ${mixin.flexBox("space-between")}
    ${mixin.outline("1px solid", "blue3", "bottom")}
    input {
        all: unset;
        width: 100%;
        ${mixin.textProps(18, "semiBold", "white")}
        ::placeholder {
            ${mixin.textProps(18, "semiBold", "blue2")}
        }
    }
`;

export default CelebrationBox;
