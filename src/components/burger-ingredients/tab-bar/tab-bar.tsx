import React, {FC} from 'react';
import {Tab as TabUI} from '@ya.praktikum/react-developer-burger-ui-components';

export const Tab: FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children?: React.ReactNode;
}> = TabUI;

type TTabBarProps = {
    currentTab: string;
    onTabClick: (tab: string) => void;
}

export const TabBar: FC<TTabBarProps> = ({currentTab, onTabClick}) => {
    const onClick = (current: string) => {
        onTabClick(current);
    }
    return (
        <div style={{display: 'flex'}}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onClick}>
                Соусы
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onClick}>
                Начинки
            </Tab>
        </div>
    )
}
