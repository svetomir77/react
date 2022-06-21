import React from "react";
import headerMenuItem from "./item.module.css";

class HeaderMenuItem extends React.Component {
    render() {
        return (
            <li className={`${headerMenuItem.item} li-menu-item p-5`}>
                {this.props.children}
            </li>
        );
    }
}

export default HeaderMenuItem;
