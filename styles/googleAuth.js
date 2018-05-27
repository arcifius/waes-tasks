import css from 'styled-jsx/css';

const googleAuth = css`
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    .google-auth {
        background: linear-gradient(to bottom right, #2196F3, #3F51B5);
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .box {
        color: #313131;
        background-color: white;
        max-width: 450px;
        min-width: 300px;
    }

    .box h1 {
        padding: 0 15px 0 15px;
        margin-bottom: 0;
        font-size: 1.5em;
        text-transform: uppercase;
    }

    .box .sub-message {
        padding-left: 20px;
        display: block;
    }

    .box .content {
        padding: 85px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .authorize {
        background-color: #009688;
        color: white;
        padding: 15px;
        width: 300px;
        font-size: 1.4em;
        text-transform: uppercase;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .authorize span, .authorize svg {
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    .authorize span {
        font-size: 0.8em;
        margin-left: 10px;
        flex: 10;
        text-align: left;
    }

    .authorize svg {
        flex: 1;
    }

    .authorize:hover {
        background-color: #607D8B;
    }
`;

export default googleAuth;
