import React, { Component } from 'react';
import google from 'utils/google';
import GoogleAuth from 'components/googleAuth';
import Loading from 'components/loading';

export default (WrappedComponent, mockedGoogle = false, initialState = { authorized: false, googleIsReady: false }) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authorized: initialState.authorized,
                googleIsReady: initialState.googleIsReady,
            };

            this.google = !mockedGoogle ? google : mockedGoogle;
        }

        componentDidMount() {
            // Initialize google's client
            this.google.initClient(this._configure);
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

            // If is authorized ask for tasks api
            if (isAuthorized) {
                this.google.loadApi(`tasks`, `v1`, () => {
                    // All initial google resources are ready to use
                    this.setState({
                        googleIsReady: true,
                    });
                });
            } else {
                this.setState({
                    googleIsReady: true,
                });
            }
        }

        /**
         * Listen changes of the authorization status
         */
        _listenAuthorization = (gapi) => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateAuthorization);
        }

        /**
         * Update authorization status with provided boolean
         */
        _updateAuthorization = (isAuthorized) => {
            if (isAuthorized) {
                this.google.loadApi(`tasks`, `v1`, () => {
                    // All initial google resources are ready to use
                    this.setState({
                        googleIsReady: true,
                        authorized: isAuthorized,
                    });
                });
            } else {
                this.setState({ authorized: isAuthorized });
            }
        }

        render() {
            if (this.state.googleIsReady) {
                return this.state.authorized
                    ? <WrappedComponent {...this.props} {...this.state} google={this.google} />
                    : <GoogleAuth {...this.props} {...this.state} google={this.google} />;
            }

            return (
                <Loading />
            );
        }
    };
};
