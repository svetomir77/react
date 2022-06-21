import React from 'react';
import PropTypes from 'prop-types';
import { Counter, Icons, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from "./burger_ingredients.module.css";
import TabBar from './tab_bar/tab_bar';
import IngredientList from './list/list';

class BurgerIngredients extends React.Component {
    render() {
        return (
            <div className={burgerIngredients.main}>
            <section>
                <TabBar/>
            </section>
            <section className={`${burgerIngredients.scrollWrap} scroller`}>
                <section className='mt-10'>
                    <h2 className='text text_type_main-medium'>Булки</h2>
                    <IngredientList data={this.props.data.filter(item => item.type === 'bun')}></IngredientList>
                </section>
                <section className='mt-2'>
                    <h2 className='text text_type_main-medium'>Соусы</h2>
                    <IngredientList data={this.props.data.filter(item => item.type === 'sauce')}></IngredientList>
                </section>
                <section className='mt-2'>
                    <h2 className='text text_type_main-medium'>Начинки</h2>
                </section>
            </section>
            </div>
        )
    }
}

export default BurgerIngredients;