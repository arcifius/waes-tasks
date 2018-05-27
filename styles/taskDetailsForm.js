import css from 'styled-jsx/css';

const taskDetailsForm = css`
    form {
        display: flex;
        flex-flow: column nowrap;
    }

    .input-group {
        width: 100;
        display: flex;
        flex-flow: row nowrap;
        margin-bottom: 35px;
    }

    label {
        margin-bottom: 10px;
    }
    
    label span {
        width: 100%;
        display: inline-block;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
    }

    label textarea {
        width: 100%;
        resize: none;
        height: 80px;
    }

    input {
        flex: 1;
        border: none;
        border-bottom: 1px solid grey;
    }

    input[type="checkbox"]:focus {
        border: 0;
        outline: 0;
    }

    .actions {
        justify-content: flex-end;
    }

    .actions .submit-task-details {
        background-color: #4CAF50;
        color: white;
        padding: 5px 15px 5px 15px;
        margin-top: 15px;
        text-transform: uppercase;
    }
`;

export default taskDetailsForm;
