import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class GoogleAuth extends Component {
    static propTypes = {
        google: PropTypes.object.isRequired,
    }

    /**
     * Authorize app upon button click
     */
    _handleAuthorization = () => {
        this.props.google.gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        return (
            <div className="google-auth">
                <button onClick={this._handleAuthorization}>
                    Authorize waes task
                </button>
            </div>
        );
    }
}
