import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';
import {fetchIngredients} from "../../services/slices/ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {
    const dispatch = useDispatch();
    const {items: ingredients, isLoading, hasError} = useSelector(store => store.ingredients);
    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                <DndProvider backend={HTML5Backend}>
                    <section className={styles.container}>
                        {isLoading && <div className="centerText">Загрузка...</div>}
                        {hasError && <div className="centerText error">{hasError}</div>}
                        {!isLoading &&
                        !hasError &&
                        ingredients.length &&
                        <>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </>
                        }
                    </section>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
