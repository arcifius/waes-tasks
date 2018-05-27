import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from 'styles/googleAuth';


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
                <div className="box">
                    <h1>Welcome to Task Manager</h1>
                    <span className="sub-message">We need your authorization to start</span>

                    <div className="content">
                        <button className="authorize" onClick={this._handleAuthorization}>
                            <i className="fab fa-google" />
                            <span>Authorize Task Manager</span>
                        </button>
                    </div>
                </div>
                <style global jsx>{style}</style>
            </div>
        );
    }
}
