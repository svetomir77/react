import {FC, ReactNode} from "react";

type HeaderMenuItemTextProps = {
    isActive?: boolean,
    children: ReactNode;
};
export const HeaderMenuItemText: FC<HeaderMenuItemTextProps> = props => {
    return (
        <span
            className={`${
                !props.isActive ? "text_color_inactive" : "text_color_active"
            } text text_type_main-default pl-2`}
        >
      {props.children}
    </span>
    );
};
