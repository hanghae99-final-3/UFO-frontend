import { css } from "styled-components";

const calRem = size => `${size / 16}rem`;

const fontSize = {
    12: calRem(12),
    14: calRem(14),
    20: calRem(20),
    30: calRem(30),
    40: calRem(40),
};

const fontWeight = {
    extraBold: 800,
    semiBold: 600,
    regular: 400,
};

const color = {
    // 가장 진한 색이 1이며, 숫자가 커질수록 점점 옅은 색으로 셋팅해두었습니다.
    mainBlue: "#5327ff",
    mainMint: "#83ffca",
    mainGray: "#dfdfe0",
    white: "#fff",
    black: "#292b2d",
    mint: "#bcffe2",
    blue1: "#8689ff",
    blue2: "#afb1ff",
    blue3: "#d8d9ff",
    gray1: "#464b50",
    gray2: "#757b80",
    gray3: "#a6abb2",
    danger: "#ff8b6f",
};

// const deviceSize = {
//     mobile: 395,
//     tablet: 700,
// };

//참고 : https://wonit.tistory.com/367
// // 참고: https://www.styled-components.com/docs/advanced#media-templates
// const media = Object.keys(deviceSize).reduce((acc, label) => {
//     acc[label] = (...args) => css`
//         @media (max-width: ${deviceSize[label] / 16}em) {
//             ${css(...args)};
//         }
//     `;
// });

const theme = {
    fontSize,
    fontWeight,
    color,
};

export default theme;
