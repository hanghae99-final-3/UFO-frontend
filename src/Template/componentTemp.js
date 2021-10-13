import React from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const a = props => {
    return <React.Fragment>{/* something... */}</React.Fragment>;
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

// default props 작성 위치
a.defaultProps = {};

export default a;
