import React, {useState} from "react";
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientList from "./list.module.css";
import IngredientDetails from '../../ingredient-details/ingredient-details';
import Modal from "../../modal/modal";

function IngredientList (props) {
    const [state, setState] = useState({
        selectedIngredient: null
    });
    const handleOpenModal = (ingredient, e) => {
        setState({...state, selectedIngredient: ingredient});
        e.stopPropagation();
    }
    const handleCloseModal = () => {
        setState({...state, selectedIngredient: null });
    }
    return (
        <>
        <ul className={`${ingredientList.wrap} pt-6 pb-8`}>
            {props.data.map((item, index)=>(
                <li key={item._id} className={`${ingredientList.item} mr-3 ml-3 mt-4 mb-4`} onClickCapture={handleOpenModal.bind(this, item)}>
                    <img src={item.image} alt={item.text}/>
                    <span className={`${ingredientList.price} text text_type_digits-default p-1`}><span className={ingredientList.priceNum}>{item.price}</span> <CurrencyIcon type="primary" /></span>
                    <span className={`${ingredientList.text} text text_type_main-default`}>{item.name}</span>
                    <Counter count={1} size="default" />
                </li>
            ))}
        </ul>
        {state.selectedIngredient && <Modal width={720} height={540} title="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails ingredient={state.selectedIngredient}/>
        </Modal>}
        </>
    );
}

export default IngredientList;
