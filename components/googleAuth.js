import React, { Component } from 'react';
import Router from 'next/router';
import { Provider } from 'mobx-react';

export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);

        this.API_KEY = `AIzaSyDHAdePQ9vLkq6H8jTeCwMue2d3kr6CQ-o`;
        this.CLIENT_ID = `322131878986-pj57jc6lcepai5jq65crhcbmk3g0ne95.apps.googleusercontent.com`;
        this.SCOPES = `https://www.googleapis.com/auth/tasks.readonly`;

        this.state = {
            gapiReady: false,
            authorized: false,
        };
    }

    componentDidMount() {
        this._loadGoogleClient();
    }

    /**
     * Authorize our app upon button click
     */
    handleAuthorization = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    /**
     * Revoke authorization upon button click
     */
    handleRevokeAuthorization = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    _loadGoogleClient = () => {
        const script = document.createElement(`script`);
        script.src = `https://apis.google.com/js/api.js`;

        script.onload = () => {
            window.gapi.load(`client:auth2`, async () => {
                try {
                    await window.gapi.client.init({
                        apiKey: this.API_KEY,
                        clientId: this.CLIENT_ID,
                        scope: this.SCOPES,
                    });

                    // Listen for changes in the authorized state.
                    window.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateAuthorizedStatus);

                    // Update with the current authorized status.
                    this._updateAuthorizedStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
                } catch (error) {
                    // TODO: show this as a warn to user
                    console.log(`Couldnt load gapi!`);
                }
            });
        };

        document.body.appendChild(script);
    }

    /**
     * Update authorized state.
     */
    _updateAuthorizedStatus = (authorized) => {
        this.setState({ authorized });

        // After state update, check if we can redirect to "taskManager"
        setImmediate(() => {
            if (this.state.authorized) {
                Router.push(`/taskManager`);
            }
        });
    }

    render() {
        return (
            <Provider gapiReady={this.state.gapiReady}>
                <div className="google-auth">
                    {this.state.authorized ? `OK` : `NOT OKAY`}
                    <button onClick={this.handleAuthorization}>
                        Authorize waes task
                    </button>
                </div>
            </Provider>
        );
    }
}
