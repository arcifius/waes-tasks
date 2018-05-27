import css from 'styled-jsx/css';

export default css`
    .task-lists {
        flex: 1;
        min-width: 300px;
        padding: 0 5px 5px 5px;
    }

    h1 {
        text-transform: uppercase;
        font-size: 1.5em;
        margin-bottom: 5px;
    }

    .new-list-button {
        padding: 5px;
        background-color: transparent;
        color: #009688;
        width: 100%;
        text-align: left;
    }

    .new-list-button:hover {
        font-weight: bold;
    }

    .new-list-button span {
        margin-left: 5px;
        text-transform: uppercase;
    }

    ul {
        list-style: none;
        margin-top: 10px;
        padding: 0;
    }
`;
