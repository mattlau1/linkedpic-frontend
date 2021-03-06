/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) =>
    fetch(path, options)
        .then((res) => res.json())
        .catch((err) => console.warn(`API_ERROR: ${err.message}`));

export default class API {
    /** @param {String} url */
    constructor(url) {
        this.url = url;
    }

    /** @param {String} path */
    getAPIRequest(path) {
        return getJSON(`${this.url}/${path}`);
    }

    /** @param {String} path */
    /** @param {Object} body */
    postAPIRequest(path, body) {
        return fetch(`${this.url}/${path}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    /** @param {String} path */
    /** @param {Object} body */
    /** @param {String} token */
    postAPIRequest(path, body, token) {
        return fetch(`${this.url}/${path}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
        });
    }

    /** @param {String} path */
    /** @param {Object} query */
    /** @param {String} token */
    getAPIRequestTokenQuery(path, query, token) {
        return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });
    }

    // Gets user data from given token
    /** @param {String} path */
    /** @param {Object} query */
    /** @param {String} token */
    getAPIUserData(token) {
        return fetch(`${this.url}/user/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                return responseData;
            })
            .catch((error) => console.warn(error));
    }

    /** @param {String} path */
    /** @param {Object} query */
    /** @param {String} token */
    putAPIRequestTokenQuery(path, query, token) {
        return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });
    }

    /** @param {String} path */
    /** @param {Object} query */
    /** @param {Object} body */
    /** @param {String} token */
    putAPIRequestTokenBodyQuery(path, query, body, token) {
        return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
        });
    }

    /** @param {String} path */
    /** @param {Object} body */
    /** @param {String} token */
    putAPIRequestTokenBody(path, body, token) {
        return fetch(`${this.url}/${path}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
        });
    }

    /** @param {String} path */
    /** @param {Object} query */
    /** @param {String} token */
    deleteAPIRequestTokenQuery(path, query, token) {
        return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });
    }
}
