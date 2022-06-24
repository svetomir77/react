import React, {useState, useEffect} from 'react';
import data from '../../utils/data.js';
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
        let data = [];
        setState({...state, hasError: false, isLoading: true});
        const fetchData = await fetch(DATA_URL);
        try {
            const {data, success} = await fetchData.json();
            success ? data.length && setState({...state, data, isLoading: false}) : setState({
                ...state,
                isLoading: false,
                hasError: 'Что-то пошло не так...'
            });
        } catch (err) {
            setState({...state, isLoading: false, hasError: err.toString()})
        }
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
                    {hasError && <div className={`${styles.centerText} ${styles.error}`}>Произошла ошибка</div>}
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
