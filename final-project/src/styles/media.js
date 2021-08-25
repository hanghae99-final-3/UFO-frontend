import { css } from "styled-components";

const deviceSizes = {
    mobile: 390, //컨텐츠가 들어갈 사이즈는 360
    tablet: 798, //컨텐츠가 들어갈 사이즈는 768
    pc: 1080, //컨텐츠가 들어갈 사이즈는 1050
};

//참고 : https://wonit.tistory.com/367
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const mediaQuery = {
    mobile: `screen and (max-width: ${deviceSizes.pc}px)`,

    // 추후, tablet 버전이 완성되면 사용할 코드
    // mobile: `screen and (max-width: ${deviceSizes.tablet}px)`,
    // tablet: `screen and (max-width: ${deviceSizes.pc}px)`,
};

export default mediaQuery;
