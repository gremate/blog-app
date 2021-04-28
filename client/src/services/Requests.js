export default class Requests {
    static baseUrl = 'http://localhost:9000';

    static login(username, password) {
        return Requests._post(`${Requests.baseUrl}/login`, { username, password });
    }

    static getPosts() { }

    //#region 'private' methods

    static _get(url, jwtToken) {
        return (async function () {
            const headers = new Headers();
            Requests._addAuthorization(headers, jwtToken);

            const response = await fetch(url, { method: 'GET', headers });

            return Requests._processResponse(response);
        })();
    }

    static _post(url, data, jwtToken) {
        return (async function () {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            Requests._addAuthorization(headers, jwtToken);

            const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(data) });

            return Requests._processResponse(response);
        })();
    }

    static _processResponse(response) {
        if (!response.ok) {
            throw response;
        }

        return response.json();
    }

    static _addAuthorization(headers, jwtToken) {
        if (jwtToken) {
            headers.set('Authorization', `Bearer ${jwtToken}`);
        }
    }

    //#endregion
}
