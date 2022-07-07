import PropTypes from 'prop-types';
import ingredientTypes from "./ingredient-types";
const ingredientsTypes = PropTypes.arrayOf(ingredientTypes).isRequired;
export default ingredientsTypes;
