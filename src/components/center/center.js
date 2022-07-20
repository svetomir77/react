import styles from './center.module.css';
import PropTypes from 'prop-types';

function Center(props) {
    const {children} = props;

    return (
        <section className={`${styles.container} ${props.className ? props.className : ''}`}>
            {children}
        </section>
    );
}

Center.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
}

export default Center;
