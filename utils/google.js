// Google script url
const GOOGLE_SCRIPT = `https://apis.google.com/js/api.js`;

// We could make this more dynamic if needed
const API_KEY = ``;
const CLIENT_ID = ``;
const SCOPES = `https://www.googleapis.com/auth/tasks`;


class Google {
    constructor() {
        // Reference to google lib
        this.gapi = undefined;
        this.apis = {};
    }

    initClient(callback) {
        if (document && window && !this.gapi) {
            const script = document.createElement(`script`);
            script.src = GOOGLE_SCRIPT;
            script.async = true;
            script.onload = () => {
                this.gapi = window.gapi;

                this.gapi.load(`client:auth2`, async () => {
                    try {
                        await this.gapi.client.init({
                            apiKey: API_KEY,
                            clientId: CLIENT_ID,
                            scope: SCOPES,
                        });

                        callback(this.gapi);
                    } catch (error) {
                        throw new Error(error);
                    }
                });
            };
            document.body.appendChild(script);
        } else if (this.gapi) {
            callback(this.gapi);
        } else {
            throw new Error(`You need a web browser to use task manager`);
        }
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

export default new Google();
