import React, { Component } from 'react';
import google from 'utils/google';
import GoogleAuth from 'components/googleAuth';
import Loading from 'components/loading';

/**
 * This HOC will encapsulate google auth logic and provide google lib.
 * All components placed in "pages" folder should be wrapped by this.
 */
export default (WrappedComponent, initialState = { authorized: false, googleIsReady: false }) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authorized: initialState.authorized,
                googleIsReady: initialState.googleIsReady,
            };
        }

        componentDidMount() {
            // Initialize google's client
            google.initClient(this._configure);
        }

        /**
         * Configure the client for the app
         */
        _configure = (gapi) => {
            this._listenAuthorization(gapi);

            // Current authorization status
            const isAuthorized = gapi.auth2.getAuthInstance().isSignedIn.get();

            // Update with current authorization status
            this._updateAuthorization(isAuthorized);
        }

        /**
         * Listen changes of the authorization status
         */
        _listenAuthorization = (gapi) => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateAuthorization);
        }

        /**
         * Update authorization status with provided boolean
         * Loads tasks API if isAuthorized is true
         */
        _updateAuthorization = (isAuthorized) => {
            if (isAuthorized) {
                google.loadApi(`tasks`, `v1`, () => {
                    this.setState({
                        googleIsReady: true,
                        authorized: isAuthorized,
                    });
                });
            } else {
                this.setState({ googleIsReady: true, authorized: isAuthorized });
            }
        }

        render() {
            if (this.state.googleIsReady) {
                return this.state.authorized
                    ? <WrappedComponent {...this.props} {...this.state} google={google} />
                    : <GoogleAuth {...this.props} {...this.state} google={google} />;
            }

            return (
                <Loading />
            );
        }
    };
};
