export default class Requests {
    static baseUrl = 'http://localhost:9000';

    static login(username, password) {
        return Requests.post(`${Requests.baseUrl}/login`, { username, password });
    }

    static post(url, data) {
        return (async function () {
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

            return Requests.processResponse(response);
        })();
    }

    static processResponse(response) {
        if (!response.ok) {
            throw response;
        }

        return response.json();
    }
}
