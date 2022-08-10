import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import burgerIngredients from "./burger-ingredients.module.css";
import {TabBar} from './tab-bar/tab-bar';
import {IngredientSection} from "./section/section";
import {TIngredient} from "../../utils/types";

export const BurgerIngredients: FC = () => {
    const scrollContainerRef = useRef<HTMLElement>(null);
    const [currentTab, setCurrentTab] = useState('bun');

    const getClosestTabContainer = (containerBox: { top: number }, headers: HTMLHeadElement[]) => {
        const positions = [];
        let closest = Number.POSITIVE_INFINITY;
        let activeTab = 'bun';
        headers.forEach((header: HTMLHeadElement) => {
            const headerBox = header.getBoundingClientRect();
            const delta = Math.abs(headerBox.top - containerBox.top);
            if (delta < closest) {
                closest = delta;
                activeTab = header.id;
            }

        });
        return activeTab;
    }

    useEffect(() => {
        const container = scrollContainerRef.current;
        const headers = container ? Array.from(container.querySelectorAll('h2')) : null;
        if (container && headers) {
            const onScrollEvent = (event: Event): void => {
                const node = event.target as HTMLElement;
                const containerBox = node.getBoundingClientRect();
                const activeTab = getClosestTabContainer(containerBox, headers);

                setCurrentTab(activeTab);
            }

            container.addEventListener("scroll", onScrollEvent);
            return () => {
                container.removeEventListener("scroll", onScrollEvent);
            }
        }
    }, []);

    const onTabClick = (tab: string) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        if (el) el.scrollIntoView({behavior: "smooth"});
    }
    const ingredients = useSelector((store: any) => store.ingredients.items);
    const buns = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'main'), [ingredients]);

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
