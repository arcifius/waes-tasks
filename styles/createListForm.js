import css from 'styled-jsx/css';

const createListForm = css`
    input {
        border: none;
        border-bottom: 1px solid grey;
        width: 100%;
    }

    .actions {
        justify-content: flex-end;
    }

    .actions .submit-list {
        background-color: #4CAF50;
        color: white;
        padding: 5px 15px 5px 15px;
        margin-top: 15px;
        text-transform: uppercase;
    }
`;

export default createListForm;
