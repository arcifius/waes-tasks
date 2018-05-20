import React, { Component } from 'react';
import google from 'utils/google';
import GoogleAuth from 'components/googleAuth';
import Loading from 'components/loading';

export default (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authorized: false,
                googleIsReady: false,
            };
        }

        componentDidMount() {
            // Initialize google's client
            google.initClient(this._configure);
        }

        componentWillUnmount() {
            google._unlistenAuthorization();
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
                google.loadApi(`tasks`, `v1`, () => {
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
        * Unlisten changes of the authorization status
        */
        _unlistenAuthorization = () => {
            google.gapi.auth2.getAuthInstance().isSignedIn.unlisten(this._updateAuthorization);
        }

        /**
         * Update authorization status with provided boolean
         */
        _updateAuthorization = (authorized) => {
            this.setState({ authorized });
        }

        render() {
            if (this.state.googleIsReady) {
                return this.state.authorized
                    ? <WrappedComponent {...this.props} />
                    : <GoogleAuth />;
            }

            return (
                <Loading />
            );
        }
    };
};
