/**
 * We are going to mock all google functions used by the app.
 * This class should be used ONLY when testing.
 */
class MockedGoogle {
    constructor() {
        this.signedIn = false;

        this.tasks = {
            tasklists: {
                list: async () => {
                    return { result: { items: [] } };
                },
            },
        };

        this.gapi = {
            client: {
                load: (api, version, callback) => { callback(this.gapi.client.tasks); },
                tasks: this.tasks,
            },
            auth2: {
                getAuthInstance: () => {
                    return {
                        signIn: () => {},
                        signOut: () => {},
                        isSignedIn: {
                            get: () => {
                                return this.signedIn;
                            },
                            listen: () => { },
                            unlisten: () => { },
                        },
                    };
                },
            },
        };

        this.apis = {
            tasks: this.tasks,
        };
    }

    setSignedIn(value) {
        this.signedIn = value;
    }

    initClient(callback) {
        callback(this.gapi);
    }

    loadApi(name, version, callback) {
        if (this.gapi) {
            this.gapi.client.load(`tasks`, `v1`, () => {
                this.apis[name] = this.gapi.client.tasks;
                callback(this.gapi.client.tasks);
            });
        } else {
            throw new Error(`You must initialize the client first!`);
        }
    }
}

export default new MockedGoogle();
