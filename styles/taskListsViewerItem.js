import css from 'styled-jsx/css';

export default css`
    .task-list-viewer-item {
        box-shadow: 0 0 0;
        background-color: transparent;
        height: 100%;
        overflow: hidden;

        display: flex;
        flex-flow: column nowrap;
    }

    .task-list-viewer-item h1 {
        flex: 1;
    }

    .task-list-viewer-item .fixed-actions-bar, .task-list-viewer-item .situational-actions-bar {
        padding: 5px;
        flex: 1;
    }

    .task-list-viewer-item .fixed-actions-bar button, .task-list-viewer-item .situational-actions-bar button {
        margin: 0 8px 0 8px;
        background-color: transparent;
        text-transform: uppercase;
    }

    .task-list-viewer-item .new-task {
        color: #4CAF50;
    }

    .task-list-viewer-item .clear-completed {
        color: #00BCD4;
    }

    .task-list-viewer-item .situational-actions-bar span {
        font-weight: bold;
    }

    .task-list-viewer-item .situational-actions-bar button {
        color: #FF9800;
    }

    .task-list-viewer-item .list-wrapper {
        height: 100%;
        overflow: hidden;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }

    .task-list-viewer-item ul {
        overflow: auto;
        height: 100%;
        margin-top: 0px;
        padding: 5px;
    }

    .task-list-viewer-item ul li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }    
`;
