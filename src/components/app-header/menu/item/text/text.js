import React from "react";
import PropTypes from "prop-types";
class HeaderMenuItemText extends React.Component {
    render() {
        return (
            <span className='text text_type_main-default pl-2'>
                {this.props.children}
            </span>
        );
    }
}
HeaderMenuItemText.propTypes = {
    children: PropTypes.string.isRequired
}

export default HeaderMenuItemText;
