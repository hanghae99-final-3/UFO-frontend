import { css } from "styled-components";

const textProps = (fontSize, fontWeight, color, textAlign, lineHeight) => {
    return css`
        font-size: ${({ theme }) => theme.fontSize[fontSize]};
        font-weight: ${({ theme }) => theme.fontWeight[fontWeight]};
        color: ${({ theme }) => theme.color[color]};
        ${textAlign && `text-align: ${textAlign}`};
        ${textAlign && `line-height: ${lineHeight}`};
    `;
};

const textOverflow = () => {
    return css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `;
};

export { textProps, textOverflow };
