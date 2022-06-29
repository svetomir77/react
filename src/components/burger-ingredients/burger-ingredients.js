import React, {useState, useMemo, useContext} from 'react';
import burgerIngredients from "./burger-ingredients.module.css";
import TabBar from './tab-bar/tab-bar';
import IngredientSection from "./section/section";
import {DataContext} from "../../utils/user-context";

function BurgerIngredients () {
    const [currentTab, setCurrentTab] = useState('bun');
    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        if (el) el.scrollIntoView({behavior: "smooth"});
    }
    const data = useContext(DataContext);
    const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
    const sauce = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);
    const main = useMemo(() => data.filter(item => item.type === 'main'), [data]);

    return (
        <div className={burgerIngredients.main}>
        <section>
            <TabBar onTabClick={onTabClick} currentTab={currentTab}/>
        </section>
        <section className={`${burgerIngredients.scrollWrap} scroller`}>
            <IngredientSection id='bun' list={buns} title='Булки'/>
            <IngredientSection id='sauce' list={sauce} title='Соусы'/>
            <IngredientSection id='main' list={main} title='Начинки'/>
        </section>
        </div>
    )
}

export default BurgerIngredients;
