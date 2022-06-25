import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';

function App() {
    const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const getData = async () => {
        setState({...state, hasError: false, isLoading: true});
        const someError = (error) => {
            setState({
                ...state,
                isLoading: false,
                hasError: error
            });
        }
        fetch(DATA_URL).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Произошла ошибка: ${response.status} ${response.statusText}`);
        }).then((responseJson) => {
            const {data, success} = responseJson;
            success ? data.length && setState({...state, data, isLoading: false})
                : someError('Что-то пошло не так...');
        })
        .catch((error) => {
            someError(error.toString());
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const {data, isLoading, hasError} = state;

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                <section className={styles.container}>
                    {isLoading && <div className={styles.centerText}>Загрузка...</div>}
                    {hasError && <div className={`${styles.centerText} ${styles.error}`}>{hasError}</div>}
                    {!isLoading &&
                    !hasError &&
                    data.length &&
                    <>
                        <BurgerIngredients data={data}/>
                        <BurgerConstructor data={data} bun={data[0]}/>
                    </>
                    }
                </section>
            </main>
        </div>
    );
}

export default App;
