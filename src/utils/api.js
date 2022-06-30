const BURGER_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function apiFetch(url, loaderState, setLoaderState, config) {
    setLoaderState({...loaderState, hasError: false, isLoading: true});
    const setError = (error) => {
        setLoaderState({
            ...loaderState,
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

            success ? setLoaderState({...loaderState, data: result, isLoading: false})
                : setError('Что-то пошло не так...');
        })
        .catch((error) => {
            setError(error.toString());
        });
}

function loadIngredients({loaderState, setLoaderState}) {
    apiFetch(BURGER_URL, loaderState, setLoaderState);
}

function postOrder({loaderState, setLoaderState, params}) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
    apiFetch(ORDER_URL, loaderState, setLoaderState, config);
}

export { loadIngredients, postOrder };
