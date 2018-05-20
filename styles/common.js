import css from 'styled-jsx/css';

export const button = css`button { color: hotpink; }`;

export const reset = css`
    html, body {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
`;

export default {
    button,
    reset,
};
