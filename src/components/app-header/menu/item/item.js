import React from "react";
import headerMenuItem from "./item.module.css";
import PropTypes from "prop-types";

function HeaderMenuItem (props) {
    return (
        <li className={`${headerMenuItem.item} li-menu-item p-5`}>
            {props.children}
        </li>
    );
}

HeaderMenuItem.propTypes = {
    children: PropTypes.any.isRequired
}

export default HeaderMenuItem;
