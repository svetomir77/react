import styles from './center.module.css';
import {FC, ReactNode} from "react";

type TCenterProps = {
    children: ReactNode,
    className?: string,
}
export const Center:FC<TCenterProps> = ({children, className}) => {

    return (
        <section className={`${styles.container} ${className ? className : ''}`}>
            {children}
        </section>
    );
}
