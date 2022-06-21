import React from 'react';
import './app.css';
import data from './utils/data.js';
import { Typography, Box} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/app_header/app_header.js';
import BurgerIngredients from './components/burger_ingredients/burger_ingredients.js';
import BurgerConstructor from './components/burger_constructor/burger_constructor.js';

function App() {
  return (
    <div className='app'>
      <AppHeader/>
      <main className='main'>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className='container'>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data}/>
        </div>
      </main>
    </div>
  );
}

export default App;
