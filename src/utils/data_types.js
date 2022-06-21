import PropTypes from 'prop-types';
const dataTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
        fat: PropTypes.number,
        proteins: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image:PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }))
}
export default dataTypes;
