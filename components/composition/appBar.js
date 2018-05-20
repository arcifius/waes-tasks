import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

const AppBar = (props) => {
    /**
     * Sign out upon button click
     */
    const _signout = () => {
        props.google.gapi.auth2.getAuthInstance().signOut();
    };

    return (
        <div>
            <p>app bar</p>
            <button onClick={_signout}>sign out</button>
        </div>
    );
};

AppBar.propTypes = {
    google: PropTypes.object.isRequired,
};

export default inject(`google`)(AppBar);
