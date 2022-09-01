import ingredientDetailsReducer, {
    addIngredient,
    removeIngredient,
} from './ingredient-details';

describe('ingredient details reducer actions', () => {
    const initialState = {
        ingredient: null,
    }
    const ingredientId = '60d3b41abdacab0026a733cd';

    it('addIngredient: should add ingredient', () => {

        const action = {
            type: addIngredient,
            payload: {
                _id: ingredientId,
            }
        }
        const state = ingredientDetailsReducer(initialState, action)
        expect(typeof state.ingredient === 'object').toEqual(true);
        expect(state.ingredient._id).toEqual(ingredientId);
    })

    it('removeIngredient: should remove ingredient', () => {
        const ingredient = {
            _id: ingredientId,
        };
        const action = {
            type: removeIngredient,
        }
        const state = ingredientDetailsReducer({...initialState, ingredient}, action)
        expect(state.ingredient).toBeNull();
    })
});
