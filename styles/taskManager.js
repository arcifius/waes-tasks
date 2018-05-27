import css from 'styled-jsx/css';

export default css`
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    .taskManager {
        background-color: #F5F5F5;
        font-family: 'Roboto', sans-serif;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-flow: column nowrap;
    }

    .flex-row {
        display: flex;
        flex-flow: row wrap;
        height: calc(100% - 51px);
    }

    .noselect {
        -webkit-touch-callout: none;
          -webkit-user-select: none;
           -khtml-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
    }

    .appModal {
        background-color: white;
        width: 300px;
        margin: 0 auto;
        margin-top: 15%;
        font-family: 'Roboto', sans-serif;
        position: relative;
    }
    
    .appModal header {
        padding: 15px;
    }

    .appModal header h1 {
        margin: 0;
        padding: 0;
    }

    .appModal header .close {
        font-size: 1.3em;
        right: 3px;
        top: 0px;
        margin: 0;
        padding: 0;
        position: absolute;
    }

    .appModal header .close:hover {
        color: #f44336;
    }

    .appModal section {
        padding: 15px;
    }

    .appOverlay {
        background-color: rgba(31,31,31, .7);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`;
