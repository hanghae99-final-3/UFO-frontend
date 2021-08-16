import { css } from "styled-components";

//
const flexBox = (hoz, ver, direction, height = "100%") => {
    return css`
        display: flex;
        height: ${`height: ${height}`};
        ${hoz && `justify-content: ${hoz}`};
        ${ver && `align-items: ${ver}`};
        ${direction && `flex-direction: ${direction}`}
    `;
};

// display:fixed or absolute or relative에 사용할 수 있습니다.
const floatBox = (position, top, right, bottom, left, zIndex) => {
    return css`
        position: ${position};
        top: ${top};
        right: ${right};
        bottom: ${bottom};
        left: ${left};
        ${zIndex && `z-index: ${zIndex}`};
    `;
};

const outline = (border, borderColor, direction) => {
    switch (direction) {
        case "top":
            return css`
                border-top: ${`${border} ${borderColor}`};
            `;

        case "right":
            return css`
                border-right: ${`${border} ${borderColor}`};
            `;

        case "bottom":
            return css`
                border-bottom: ${`${border} ${borderColor}`};
            `;

        case "left":
            return css`
                border-left: ${`${border} ${borderColor}`};
            `;

        default:
            return css`
                border: ${`${border} ${borderColor}`};
            `;
    }
};

export { flexBox, floatBox, outline };
