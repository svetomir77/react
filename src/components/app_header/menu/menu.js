import React from "react";
import headerMenu from "./menu.module.css";

class HeaderMenu extends React.Component {
    render() {
        return (
            <nav className={`${(this.props.className ? this.props.className : '')} ${headerMenu.menu}`}>
                {this.props.children}
            </nav>
        );
    }
}

export default HeaderMenu;
