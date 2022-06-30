import React, {useState, useMemo, useContext} from 'react';
import burgerIngredients from "./burger-ingredients.module.css";
import TabBar from './tab-bar/tab-bar';
import IngredientSection from "./section/section";
import {IngredientsContext} from "../../services/user-context";

function BurgerIngredients () {
    const [currentTab, setCurrentTab] = useState('bun');
    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        if (el) el.scrollIntoView({behavior: "smooth"});
    }
    const ingredients = useContext(IngredientsContext);
    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    return (
        <div className={burgerIngredients.main}>
        <section>
            <TabBar onTabClick={onTabClick} currentTab={currentTab}/>
        </section>
        <section className={`${burgerIngredients.scrollWrap} scroller`}>
            <IngredientSection id='bun' ingredients={buns} title='Булки'/>
            <IngredientSection id='sauce' ingredients={sauce} title='Соусы'/>
            <IngredientSection id='main' ingredients={main} title='Начинки'/>
        </section>
        </div>
    )
}

export default BurgerIngredients;
