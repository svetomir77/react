import React from 'react';
import IngredientList from '../list/list';
import ingredientsTypes from '../../../utils/ingredients-types.js';
import PropTypes from 'prop-types';


function IngredientSection({id, ingredients, title}) {
    return (
        <section className='mt-10'>
            <h2 className='text text_type_main-medium' id={id}>{title}</h2>
            <IngredientList ingredients={ingredients}></IngredientList>
        </section>
    )
}
IngredientSection.ingredientsTypes = {
    id: PropTypes.string.isRequired,
    ingredients: ingredientsTypes,
    title: PropTypes.string.isRequired,
}

export default IngredientSection;
