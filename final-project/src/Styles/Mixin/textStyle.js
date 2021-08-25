import { css } from "styled-components";

const textProps = (fontSize, fontWeight, color, textAlign, lineHeight) => {
    return css`
        font-size: ${({ theme }) => theme.fontSize[fontSize]};
        font-weight: ${({ theme }) => theme.fontWeight[fontWeight]};
        color: ${({ theme }) => theme.color[color]};
        ${textAlign && `text-align: ${textAlign}`};
        ${lineHeight && `line-height: ${lineHeight}`};
    `;
};

const textOverflow = () => {
    return css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
    `;
};

const textboxOverflow = (line = 2, lineHeight = 1.5) => {
    return css`
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
        line-height: ${lineHeight};
        height: ${line * lineHeight}em;
        word-wrap: break-word;
        word-break: break-all;
    `;
};

export { textProps, textOverflow, textboxOverflow };
