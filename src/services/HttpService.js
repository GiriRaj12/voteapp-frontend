let baseUrl = "https://pacific-tundra-32930.herokuapp.com";

let [POST, PUT, DELETE, PATCH] = ['POST', 'PUT', 'DELETE', 'PATCH']

//Forms Headder {default : 'GET'}
function formHeadder(method = 'GET', payload) {
    return {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
}

/**
 * 
 * @param {*} params 
 * @param {*} extensionUrl 
 * Returns Fetch API 
 */
export function get(params, extensionUrl) {
    return fetch(getFormattedURL(params, extensionUrl))
        .then(res => res.json());
}

/**
 * 
 * @param {*} payload 
 * @param {*} extensionUrl 
 * Returns Fetch API 
 */
export function post(payload, extensionUrl) {
    return fetchAPI(getFormattedURL(null, extensionUrl), formHeadder(POST, payload));
}

/**
 * 
 * @param {*} params 
 * @param {*} payload 
 * @param {*} extensionUrl 
 * Returns Fetch API 
 */
export function put(params, payload, extensionUrl) {
    return fetch(getFormattedURL(params, extensionUrl), formHeadder(PUT, payload))
        .then(res => res.json())
}

/**
 * 
 * @param {*} params 
 * @param {*} extensionUrl 
 * Returns Fetch API 
 */
export function del(params, extensionUrl) {
    return fetch(getFormattedURL(params, extensionUrl), formHeadder(DELETE))
        .then(res => res.json())
}

/**
 * 
 * @param {*} payload 
 * @param {*} extensionUrl 
 * Returns Fetch API 
 */
export function patch(payload, extensionUrl) {
    return fetch(getFormattedURL(null, extensionUrl), formHeadder(PATCH, payload))
        .then(res => res.json())
}



function fetchAPI(url, headder) {
    return fetch(url, headder).then(response => response.json());
}



export function getFormattedURL(params, extensionURL) {
    return baseUrl + extensionURL + getParams(params);
}


/**
 * 
 * @param {*} params 
 * @requires params
 * @returns String ( Formatted URL ) 
 * Accepts an object as a param which will intern be added in the url as query params.
 * 
 * For Example : {'key':'value','secondKey':'secondValue'} => 'baseURL/extension? key=value & secondKey=secondValue'
 */

export function getParams(params) {
    let formattedURL = String('');
    if (params) {
        let i = 0;
        for (let key in params) {
            if (i === 0) {
                formattedURL = formattedURL + '?' + key + '=' + params[key];
                i++;
            }
            else
                formattedURL = formattedURL + '&' + key + '=' + params[key];
        }
    }
    return formattedURL;
}