const API_URL = 'https://norma.nomoreparties.space/api';
const BURGER_URL = `${API_URL}/ingredients`;
const ORDER_URL = `${API_URL}/orders`;
const PASSWORD_RESET_REQUEST_URL = `${API_URL}/password-reset`;
const PASSWORD_RESET_UPDATE_URL = `${API_URL}/password-reset/reset`;
const LOGIN_URL = `${API_URL}/auth/login`;
const REGISTER_URL = `${API_URL}/auth/register`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const TOKEN_URL = `${API_URL}/auth/token`;

function getPostCfg (params) {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
}

function apiFetch(url, config) {
    return fetch(url, config || {})
        .then((res) => res.json())
        .then((res) => res);
}

export function loadIngredients() {
    return apiFetch(BURGER_URL);
}

export function postOrder(params) {
    return apiFetch(ORDER_URL, getPostCfg(params));
}

export function postPasswordResetRequest(params) {
    return apiFetch(PASSWORD_RESET_REQUEST_URL, getPostCfg(params));
}

export function postPasswordResetUpdate(params) {
    return apiFetch(PASSWORD_RESET_UPDATE_URL, getPostCfg(params));
}

export function postLogin(params) {
    return apiFetch(LOGIN_URL, getPostCfg(params));
}

export function postLogout(params) {
    return apiFetch(LOGOUT_URL, getPostCfg(params));
}

export function postRegister(params) {
    return apiFetch(REGISTER_URL, getPostCfg(params));
}

export function postToken(params) {
    return apiFetch(TOKEN_URL, getPostCfg(params));
}

