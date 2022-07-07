import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';
import {loadIngredients} from "../../utils/api";
import {IngredientsContext} from "../../services/user-context";

function App() {

    const [loaderState, setLoaderState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });


    useEffect(() => {
        loadIngredients({loaderState, setLoaderState});
    }, []);

    const {data: ingredients, isLoading, hasError} = loaderState;

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
                    ingredients.length &&
                    <>
                    <IngredientsContext.Provider value={ingredients}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </IngredientsContext.Provider>
                    </>
                    }
                </section>
            </main>
        </div>
    );
}

export default App;
