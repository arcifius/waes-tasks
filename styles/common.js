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

    button {
        background-color: white;
        border: 0px;
        padding: 3px;
        cursor: pointer;

        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    button::-moz-focus-inner {
        border: 0;
    }
`;

export default {
    button,
    reset,
};
