import {TIngredientsUid, TLogin, TOrderIngredients, TToken, TUser} from "./types";

const API_URL = 'https://norma.nomoreparties.space/api';
const BURGER_URL = `${API_URL}/ingredients`;
const ORDER_URL = `${API_URL}/orders`;
const PASSWORD_RESET_REQUEST_URL = `${API_URL}/password-reset`;
const PASSWORD_RESET_UPDATE_URL = `${API_URL}/password-reset/reset`;
const LOGIN_URL = `${API_URL}/auth/login`;
const REGISTER_URL = `${API_URL}/auth/register`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const TOKEN_URL = `${API_URL}/auth/token`;
const USER_URL = `${API_URL}/auth/user`;

function getPostCfg(params: {} | undefined = undefined) {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
}

function getAuthCfg(method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH', params: { token: string | null, body?: any }) {
    let cfg = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (params.token || '')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: (params.body && JSON.stringify(params.body)) || undefined,
    }


    return cfg;
}

async function checkResponse(res: Response) {
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : null;

    if (!res.ok) {
        // получаем ошибку из body или response status по умолчанию
        const error = (data && data.message) || res.status;
        return Promise.reject(error);
    }
    return data;
}

function apiFetch(url: string, config: object | undefined = undefined) {
    return fetch(url, config || {})
        .then(checkResponse);
}

export function loadIngredients() {
    return apiFetch(BURGER_URL);
}

export function postOrder(params: TToken & { body: TOrderIngredients }) {
    return apiFetch(ORDER_URL, getAuthCfg('POST', params));
}

export function postPasswordResetRequest(params: Pick<TLogin, 'email'>) {
    return apiFetch(PASSWORD_RESET_REQUEST_URL, getPostCfg(params));
}

export function postPasswordResetUpdate(params: Pick<TLogin, 'password'> & TToken) {
    return apiFetch(PASSWORD_RESET_UPDATE_URL, getPostCfg(params));
}

export function postLogin(params: TLogin) {
    return apiFetch(LOGIN_URL, getPostCfg(params));
}

export function postLogout(params: TToken) {
    return apiFetch(LOGOUT_URL, getPostCfg(params));
}

export function createUser(params: TUser) {
    return apiFetch(REGISTER_URL, getPostCfg(params));
}

export function postToken(params: TToken) {
    return apiFetch(TOKEN_URL, getPostCfg(params));
}

export function getUserRequest(params: TToken) {
    return apiFetch(USER_URL, getAuthCfg('GET', params));
}

export function updateUser(params: TToken & { body: TUser }) {
    return apiFetch(USER_URL, getAuthCfg('PATCH', params));
}
