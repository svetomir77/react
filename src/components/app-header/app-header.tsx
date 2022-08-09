import React, {FC, useEffect, useState} from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";
import {HeaderMenu} from "./menu/menu";
import {HeaderMenuItemText} from "./menu/item/text/text";
import {NavLink, match as Match} from "react-router-dom";
export const AppHeader:FC = () => {
  let activeMenu:string = "";
  const [currentMenu, setCurrentMenu] = useState(activeMenu);


  const setActive = (match: Match | null):boolean => {
    if (match) {
      activeMenu = match.path.replace("\\/", "");
    }
    return match ? match.path === currentMenu : false;
  };

  useEffect(() => {
    setCurrentMenu(activeMenu);
  }, [activeMenu, setActive]);

  const isActiveProfile = currentMenu === "profile";
  const isActiveHome = currentMenu === "";
  const isActiveOrderList = currentMenu === "feed";

  return (
    <header className={`${appHeader.main} p-4`}>
      <HeaderMenu>
        <NavLink to="/" className="p-5 li-menu-item" isActive={setActive}>
          <BurgerIcon type={isActiveHome ? "primary" : "secondary"} />{" "}
          <HeaderMenuItemText isActive={isActiveHome}>
            Конструктор
          </HeaderMenuItemText>
        </NavLink>
        <NavLink to="/feed" className="p-5 li-menu-item" isActive={setActive}>
          <ListIcon type={isActiveOrderList ? "primary" : "secondary"} />{" "}
          <HeaderMenuItemText isActive={isActiveOrderList}>
            Лента Заказов
          </HeaderMenuItemText>
        </NavLink>
      </HeaderMenu>
      <section className={appHeader.logo}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </section>
      <HeaderMenu className={appHeader.account}>
        <NavLink
          to="/profile"
          className="p-5 li-menu-item"
          isActive={setActive}
        >
          <ProfileIcon type={isActiveProfile ? "primary" : "secondary"} />{" "}
          <HeaderMenuItemText isActive={isActiveProfile}>
            Личный Кабинет
          </HeaderMenuItemText>
        </NavLink>
      </HeaderMenu>
    </header>
  );
}
