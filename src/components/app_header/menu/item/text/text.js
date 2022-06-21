import React from "react";
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
class HeaderMenuItemText extends React.Component {
    render() {
        return (
            <span className='text text_type_main-default pl-2'>
                {this.props.children}
            </span>
        );
    }
}

export default HeaderMenuItemText;
