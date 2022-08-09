import {FC, ReactNode} from "react";
import headerMenu from "./menu.module.css";
type HeaderMenuProps = {
  className?: string,
  children: ReactNode;
};
export const HeaderMenu: FC<HeaderMenuProps> = props => {
  return (
    <nav
      className={`${props.className ? props.className : ""} ${headerMenu.menu}`}
    >
      {props.children}
    </nav>
  );
};
