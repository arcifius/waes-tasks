import css from 'styled-jsx/css';

const loading = css`
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    .loading {
        background: linear-gradient(to bottom right, #2196F3, #3F51B5);
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        color: white;
        text-transform: uppercase;
        font-size: 3em;
    }
`;

export default loading;
