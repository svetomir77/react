import React from "react";
import headerMenuItem from "./item.module.css";
import PropTypes from "prop-types";

class HeaderMenuItem extends React.Component {
    render() {
        return (
            <li className={`${headerMenuItem.item} li-menu-item p-5`}>
                {this.props.children}
            </li>
        );
    }
}

HeaderMenuItem.propTypes = {
    children: PropTypes.any.isRequired
}

export default HeaderMenuItem;
