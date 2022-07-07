const BURGER_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function apiFetch(url, config) {
    return fetch(url, config || {})
        .then((res) => res.json())
        .then((res) => res);
}

function loadIngredients() {
    return apiFetch(BURGER_URL);
}

function postOrder(params) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
    return apiFetch(ORDER_URL, config);
}

export {loadIngredients, postOrder};
