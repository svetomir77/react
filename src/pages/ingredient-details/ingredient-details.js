import Center from "../../components/center/center";
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import AppHeader from "../../components/app-header/app-header";
import React from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function IngredientDetailsPage() {
    const { id } = useParams();
    const ingredient = useSelector((store) => {
        return store.ingredients.items.filter(item => item._id === id)
    }
    );

    return (
        <div className='page'>
        <AppHeader/>
        <Center>
            <IngredientDetails ingredient={ingredient}/>
        </Center>
        </div>
    );
}

export default IngredientDetailsPage;
