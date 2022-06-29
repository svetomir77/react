import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';
import {loadIngredients} from "../../utils/api";
import {DataContext} from "../../utils/user-context";

function App() {

    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });


    useEffect(() => {
        loadIngredients({state, setState});
    }, []);

    const {data, isLoading, hasError} = state;

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                <section className={styles.container}>
                    {isLoading && <div className="centerText">Загрузка...</div>}
                    {hasError && <div className="centerText error">{hasError}</div>}
                    {!isLoading &&
                    !hasError &&
                    data.length &&
                    <>
                    <DataContext.Provider value={data}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DataContext.Provider>
                    </>
                    }
                </section>
            </main>
        </div>
    );
}

export default App;
