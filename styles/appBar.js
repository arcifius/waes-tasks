import css from 'styled-jsx/css';

const appBar = css`
    .app-bar {
        background-color: #2196F3;
        color: #FFF;
        text-transform: uppercase;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 0 15px 0 15px;
        cursor: default;
    }

    button {        
        background-color: transparent;
        color: white;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    }

    button:hover > span {
        opacity: 1;
        width: auto;
        overflow: auto;
        margin-right: 10px;
    }

    button svg {
        font-size: 1.6em;
    }

    button span {
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;

        opacity: 0;
        flex-grow: 0;
    }
`;

export default appBar;
