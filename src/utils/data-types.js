import PropTypes from 'prop-types';
import ingredientTypes from "./ingredient-types";
const dataTypes = PropTypes.arrayOf(ingredientTypes).isRequired;
export default dataTypes;
