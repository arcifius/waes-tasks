import css from 'styled-jsx/css';

export default css`
    .task-list {
        margin-bottom: 10px;
        padding: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        display: flex;
        flex-flow: column nowrap;
        background-color: white;
        cursor: pointer;
    }

    .task-list.active {
        box-shadow: 0 0 0;
        background-color: #2196F3;
        color: white;
    }

    .task-list.active .actions button {
        color: white;
    }

    .task-list.active .actions button:hover {
        color: #673AB7;
    }

    .task-list .item-wrapper {
        justify-content: space-between;
    }

    .task-list .task-counter {
        margin: 0;
        text-transform: uppercase;
        font-size: 0.8em;
    }

    .task-list input {
        border: 0px;
    }

    .task-list .actions {
        opacity: 0;
        margin-right: 10px;

        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    .task-list .actions button {
        background-color: transparent;
    }

    .task-list .actions button:hover {
        color: #2196F3;
    }

    .task-list:hover .actions {
        opacity: 1;
        margin-right: 0px;
    }    
`;
