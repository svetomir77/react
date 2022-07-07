import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TabBar = ({currentTab, onTabClick}) => {
    const onClick = (current) => {
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

TabBar.propTypes = {
    currentTab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
}

export default TabBar;
