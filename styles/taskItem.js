import css from 'styled-jsx/css';

const taskItem = css`
    .task-item {
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;

        background-color: white;
        color: #313131;
        text-transform: uppercase;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start !important;
        padding: 0 15px 0 15px;
        cursor: pointer;
    }

    .task-item p {        
        margin-left: 5px;
    }

    .task-item span {
        font-size: 0.7em;
        margin-left: 25px;
    }

    input[type="checkbox"]:focus {
        border: 0;
        outline: 0;
    }

    .task-item.active {
        background-color: #2196F3;
        color: white;
    }

    .task-item.active .actions button:hover {
        color: #673AB7;
    }

    .task-item.active button {
        color: white;
    }

    .task-item .actions {
        opacity: 0;
        overflow: hidden;
        margin-left: 10px;
        width: 0px;
        height: 23px;

        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    .task-item .actions button {
        background-color: transparent;
    }

    .task-item .actions button:hover {
        color: #2196F3;
    }

    .task-item:hover {
        box-shadow: 0 0 0;
    }

    .task-item:hover .actions {
        opacity: 1;
        width: 50px;
        margin-left: 0px;
    }
`;

export default taskItem;
