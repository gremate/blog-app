import { setJwtToken } from '../store/slice';

export default class Requests {
    /**
     * @private 
     */
    static _baseUrl = 'http://localhost:9000';

    static login(username, password) {
        return Requests._post(`${Requests._baseUrl}/login`, { username, password });
    }

    static getPosts(jwtToken, dispatch) {
        return Requests._get(`${Requests._baseUrl}/posts`, jwtToken, dispatch);
    }

    static createPost(title, content, jwtToken, dispatch) {
        return Requests._post(`${Requests._baseUrl}/posts`, { title, content }, jwtToken, dispatch);
    }

    static deletePost(postId, jwtToken, dispatch) {
        return Requests._delete(`${Requests._baseUrl}/posts/${postId}`, jwtToken, dispatch);
    }

    /**
     * For GET requests 
     * @private 
     */
    static _get(url, jwtToken, dispatch) {
        return (async function () {
            const headers = new Headers();
            Requests._addAuthorization(headers, jwtToken);

            const response = await fetch(url, { method: 'GET', headers });

            return Requests._processResponse(response, dispatch);
        })();
    }

    /**
     * For POST requests 
     * @private 
     */
    static _post(url, data, jwtToken, dispatch) {
        return (async function () {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            Requests._addAuthorization(headers, jwtToken);

            const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(data) });

            return Requests._processResponse(response, dispatch);
        })();
    }

    /**
     * For DELETE requests
     * @private
     */
    static _delete(url, jwtToken, dispatch) {
        return (async function () {
            const headers = new Headers();
            Requests._addAuthorization(headers, jwtToken);

            const response = await fetch(url, { method: 'DELETE', headers });

            return Requests._processResponse(response, dispatch);
        })();
    }

    /**
     * Process a Response object 
     * @private 
     */
    static _processResponse(response, dispatch) {
        if (!response.ok) {
            switch (response.status) {
                case 401:
                case 403:
                    dispatch?.(setJwtToken(null));
                    return;
                default:
                    throw response;
            }
        }

        return response.json();
    }

    /**
     * Add jwt token to Authorization header 
     * @private 
     */
    static _addAuthorization(headers, jwtToken) {
        if (jwtToken) {
            headers.set('Authorization', `Bearer ${jwtToken}`);
        }
    }
}
