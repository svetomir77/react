import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
const TabBar = props => {
    const [current, setCurrent] = React.useState('bun');
    const onClick = (current) => {
        setCurrent(current);
    }
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={onClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={onClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={onClick}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabBar;
