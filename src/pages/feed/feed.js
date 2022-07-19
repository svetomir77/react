import styles from "./feed.module.css";
import AppHeader from "../../components/app-header/app-header";

function FeedPage() {

    return (
        <div className='page'>
            <AppHeader/>
            <section className={styles.main}>
                <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>

                </section>
                <section className={`${styles.colRight}`}>

                </section>
            </section>
        </div>
    );
}

export default FeedPage;
