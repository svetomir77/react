import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from "./app-header.module.css";
import HeaderMenu from "./menu/menu";
import HeaderMenuItem from "./menu/item/item";
import HeaderMenuItemText from "./menu/item/text/text";

function AppHeader () {
    return (
        <header className={`${appHeader.main} p-4`}>
            <HeaderMenu>
                <HeaderMenuItem>
                    <BurgerIcon type="primary" /> <HeaderMenuItemText>Конструктор</HeaderMenuItemText>
                </HeaderMenuItem>
                <HeaderMenuItem>
                    <ListIcon type="secondary" /> <HeaderMenuItemText>Лента Заказов</HeaderMenuItemText>
                </HeaderMenuItem>
            </HeaderMenu>
            <section className={appHeader.logo}>
                <Logo/>
            </section>
            <HeaderMenu className={appHeader.account}>
                <HeaderMenuItem>
                    <ProfileIcon type="secondary" /> <HeaderMenuItemText>Лента Заказов</HeaderMenuItemText>
                </HeaderMenuItem>
            </HeaderMenu>
        </header>
    );
}

export default AppHeader;
