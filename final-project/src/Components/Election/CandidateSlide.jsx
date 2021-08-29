import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const CandidateSlide = ({ candidate }) => {
    return (
        <Container>
            <CandidateImage
                src={`http://3.36.90.60/${candidate.photo}`}
                alt={candidate.name}
            />
            <CandidateName>
                <span>{candidate.name}</span>
            </CandidateName>
        </Container>
    );
};

const Container = styled.div`
    border-radius: 25px;
    height: 300px;
    ${mixin.boxShadow()}
`;

const CandidateImage = styled.img`
    width: 100%;
    height: 83%;
    object-fit: cover;
    border-radius: 25px 25px 0 0;
`;
const CandidateName = styled.div`
    width: 100%;
    ${mixin.flexBox("center", "center", null, "16%")}
    background: ${({ theme }) => theme.color.white};
    text-align: center;
    border-radius: 0 0 25px 25px;
    span {
        line-height: 1;
        ${mixin.textProps(18, "semiBold", "gray2")}
    }
`;

export default CandidateSlide;
