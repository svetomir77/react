import styles from "./feed.module.css";
import {FC} from "react";

export const FeedPage:FC = () => {

    return (
        <section className={styles.main}>
            <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>

            </section>
            <section className={`${styles.colRight}`}>

            </section>
        </section>
    );
}
