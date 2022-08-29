import React, {FC} from 'react';
import {IngredientList} from '../list/list';
import {TIngredients} from '../../../utils/types';

type TSectionProps = {
    id: string,
    ingredients: TIngredients,
    title: string,
}

export const IngredientSection: FC<TSectionProps> = ({id, ingredients, title}) => {
    return (
        <section className='mt-10'>
            <h2 className='text text_type_main-medium' id={id}>{title}</h2>
            <IngredientList ingredients={ingredients}></IngredientList>
        </section>
    )
}
