import React from 'react';
import IngredientList from '../list/list';
import dataTypes from '../../../utils/data-types.js';
import PropTypes from 'prop-types';


function IngredientSection({id, list, title}) {
    return (
        <section className='mt-10'>
            <h2 className='text text_type_main-medium' id={id}>{title}</h2>
            <IngredientList data={list}></IngredientList>
        </section>
    )
}
IngredientSection.dataTypes = {
    id: PropTypes.string.isRequired,
    list: dataTypes,
    title: PropTypes.string.isRequired,
}

export default IngredientSection;
