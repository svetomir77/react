import React from "react";
import PropTypes from "prop-types";

function HeaderMenuItemText(props) {
    return (
        <span className={`${!props.isActive ? 'text_color_inactive' : 'text_color_active'} text text_type_main-default pl-2`}>
            {props.children}
        </span>
    );
}

HeaderMenuItemText.propTypes = {
    children: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
}

export default HeaderMenuItemText;
