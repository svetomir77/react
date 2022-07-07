import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import burgerIngredients from "./burger-ingredients.module.css";
import TabBar from './tab-bar/tab-bar';
import IngredientSection from "./section/section";

function BurgerIngredients() {
    const scrollContainerRef = useRef();
    const [currentTab, setCurrentTab] = useState('bun');

    const getClosestTabContainer = (containerBox, headers) => {
        const positions = [];
        let closest = Number.POSITIVE_INFINITY;
        let activeTab = 'bun';
        headers.forEach((header) => {
            const headerBox = header.getBoundingClientRect();
            const delta = Math.abs(headerBox.top - containerBox.top);
            if (delta < closest) {
                closest = delta;
                activeTab = header.id;
            }

        });
        return activeTab;
    }

    const listenScrollEvent = (headers, event) => {
        const containerBox = event.target.getBoundingClientRect();
        const activeTab = getClosestTabContainer(containerBox, headers);

        setCurrentTab(activeTab);
    }

    useEffect(function () {
        const headers = Array.from(scrollContainerRef.current.querySelectorAll('h2'));
        const onScrollEvent = listenScrollEvent.bind(this, headers);
        scrollContainerRef.current.addEventListener("scroll", onScrollEvent);
        return () => {
            scrollContainerRef.current.removeEventListener("scroll", onScrollEvent);
        }
    }, []);

    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        if (el) el.scrollIntoView({behavior: "smooth"});
    }
    const ingredients = useSelector(store => store.ingredients.items);
    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    return (
        <div className={burgerIngredients.main}>
            <section>
                <TabBar onTabClick={onTabClick} currentTab={currentTab}/>
            </section>
            <section className={`${burgerIngredients.scrollWrap} scroller`} ref={scrollContainerRef}>
                <IngredientSection id='bun' ingredients={buns} title='Булки'/>
                <IngredientSection id='sauce' ingredients={sauce} title='Соусы'/>
                <IngredientSection id='main' ingredients={main} title='Начинки'/>
            </section>
        </div>
    )
}

export default BurgerIngredients;
