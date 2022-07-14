import styles from './center.module.css';
import PropTypes from 'prop-types';

function Center(props) {
    const {children} = props;

    return (
        <section className={styles.container}>
            {children}
        </section>
    );
}

Center.propTypes = {
    children: PropTypes.any.isRequired,
}

export default Center;
