import { css } from "styled-components";

const textProps = (fontSize, fontWeight, color, textAlign, lineHeight = 1) => {
    return css`
        font-size: ${({ theme }) => theme.fontSize[fontSize]};
        font-weight: ${({ theme }) => theme.fontWeight[fontWeight]};
        color: ${({ theme }) => theme.color[color]};
        line-height: ${lineHeight};
        ${textAlign && `text-align: ${textAlign}`};
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
