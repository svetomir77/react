const BURGER_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function apiFetch(url, state, setState, config) {
    setState({...state, hasError: false, isLoading: true});
    const someError = (error) => {
        setState({
            ...state,
            isLoading: false,
            hasError: error
        });
    }
    fetch(url, config || {})
        .then((response, config) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Произошла ошибка: ${response.status} ${response.statusText}`);
        })
        .then((responseJson) => {
            const {data, success, ...other} = responseJson;
            let result = data;

            if (success && !data) {
                result = other;
            }
            success ? setState({...state, data: result, isLoading: false})
                : someError('Что-то пошло не так...');
        })
        .catch((error) => {
            someError(error.toString());
        });
}

function loadIngredients({state, setState}) {
    apiFetch(BURGER_URL, state, setState);
}

function postOrder({state, setState, params}) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
    apiFetch(ORDER_URL, state, setState, config);
}

export { loadIngredients, postOrder };
