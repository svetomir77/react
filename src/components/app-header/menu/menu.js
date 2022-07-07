import React from "react";
import headerMenu from "./menu.module.css";
import PropTypes from 'prop-types';

function HeaderMenu(props) {
    return (
        <nav className={`${(props.className ? props.className : '')} ${headerMenu.menu}`}>
            {props.children}
        </nav>
    );
}

HeaderMenu.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
}

export default HeaderMenu;
