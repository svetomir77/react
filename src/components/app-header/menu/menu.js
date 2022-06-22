import React from "react";
import headerMenu from "./menu.module.css";
import PropTypes from 'prop-types';

class HeaderMenu extends React.Component {
    render() {
        return (
            <nav className={`${(this.props.className ? this.props.className : '')} ${headerMenu.menu}`}>
                {this.props.children}
            </nav>
        );
    }
}

HeaderMenu.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
}

export default HeaderMenu;
