import React from 'react';
import burgerIngredients from "./burger-ingredients.module.css";
import TabBar from './tab-bar/tab-bar';
import IngredientList from './list/list';
import dataTypes from '../../utils/data-types.js';

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
                    <IngredientList data={this.props.data.filter(item => item.type === 'main')}></IngredientList>
                </section>
            </section>
            </div>
        )
    }
}

BurgerIngredients.propTypes = {
    data: dataTypes
};

export default BurgerIngredients;
