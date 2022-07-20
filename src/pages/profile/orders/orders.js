import {Link} from "react-router-dom";
import styles from "../profile.module.css";
import AppHeader from "../../../components/app-header/app-header";

function ProfileOrdersPage() {

    return (
        <div className='page'>
            <AppHeader/>
            <section className={styles.main}>
                <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                    <section className={`${styles.link} text_color_inactive`}><Link to='/profile'>Профиль</Link>
                    </section>
                    <h3 className={`${styles.header} text_type_main-medium`}>История заказов</h3>
                    <section className={`${styles.link} text_color_inactive`}><Link to='/logout'>Выход</Link></section>
                    <section className={`${styles.info} mt-20 text text_type_main-small text_color_inactive`}>

                    </section>
                </section>
                <section className={`${styles.colRight}`}>

                </section>
            </section>
        </div>
    );
}

export default ProfileOrdersPage;
