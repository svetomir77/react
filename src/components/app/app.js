import React from 'react';
import data from '../../utils/data.js';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <section className={styles.container}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data} bun={data[0]}/>
        </section>
      </main>
    </div>
  );
}

export default App;
