/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) =>
    fetch(path, options)
        .then((res) => res.json())
        .catch((err) => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
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
}
