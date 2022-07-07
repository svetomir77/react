import React from "react";
import PropTypes from "prop-types";

function HeaderMenuItemText(props) {
    return (
        <span className='text text_type_main-default pl-2'>
            {props.children}
        </span>
    );
}

HeaderMenuItemText.propTypes = {
    children: PropTypes.string.isRequired
}

export default HeaderMenuItemText;
