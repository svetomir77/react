import React, { useState } from 'react';
import burgerIngredients from "./burger-ingredients.module.css";
import TabBar from './tab-bar/tab-bar';
import IngredientList from './list/list';
import dataTypes from '../../utils/data-types.js';

function BurgerIngredients (props) {
    const [currentTab, setCurrentTab] = useState('bun');
    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        if (el) el.scrollIntoView({behavior: "smooth"});
    }
    return (
        <div className={burgerIngredients.main}>
        <section>
            <TabBar onTabClick={onTabClick} currentTab={currentTab}/>
        </section>
        <section className={`${burgerIngredients.scrollWrap} scroller`}>
            <section className='mt-10'>
                <h2 className='text text_type_main-medium' id='bun'>Булки</h2>
                <IngredientList data={props.data.filter(item => item.type === 'bun')}></IngredientList>
            </section>
            <section className='mt-2'>
                <h2 className='text text_type_main-medium' id='sauce'>Соусы</h2>
                <IngredientList data={props.data.filter(item => item.type === 'sauce')}></IngredientList>
            </section>
            <section className='mt-2'>
                <h2 className='text text_type_main-medium' id='main'>Начинки</h2>
                <IngredientList data={props.data.filter(item => item.type === 'main')}></IngredientList>
            </section>
        </section>
        </div>
    )
}

BurgerIngredients.propTypes = {
    data: dataTypes
};

export default BurgerIngredients;
