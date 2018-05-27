import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import style from 'styles/appBar';

const AppBar = (props) => {
    /**
     * Sign out upon button click
     */
    const _signout = () => {
        props.google.gapi.auth2.getAuthInstance().signOut();
    };

    return (
        <div className="app-bar noselect">
            <p>Task Manager</p>
            <button onClick={_signout}>
                <span>sign out</span>
                <i className="fas fa-sign-out-alt" />
            </button>
            <style jsx>{style}</style>
        </div>
    );
};

AppBar.propTypes = {
    google: PropTypes.object.isRequired,
};

export default inject(`google`)(AppBar);
