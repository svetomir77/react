import burgerReducer, {
    addIngredient,
    removeIngredient,
    addBun,
    changeIngredientPosition,
    removeAllIngredients
} from './burger';

describe('burger reducer actions', () => {
    const initialState = {
        ingredients: [],
        bun: {
            price: 0,
            image: '',
            name: '',
            _id: '',
        },
    };

    it('addIngredient: should add new ingredient', () => {
        const action = {
            type: addIngredient,
            payload: {
                ingredient: {
                    _id:'60d3b41abdacab0026a733cd'
                }
            }
        }
        const state = burgerReducer(initialState, action)
        expect(state.ingredients.length).toEqual(1);
    })

    it('addIngredient: should add new ingredient before another', () => {
        const newIngredientId = '60d3b41abdacab0026a733cf';
        const beforeIngredientUUID = '60d3b41abdacab0026a733cd_1';
        const action = {
            type: addIngredient,
            payload: {
                ingredient: {
                    _id: newIngredientId,
                },
                before: beforeIngredientUUID,
            }
        }
        const state = burgerReducer({...initialState, ingredients: [
            {
                uuid: beforeIngredientUUID
            }
        ]}, action);
        expect(state.ingredients.length).toEqual(2);
        expect(state.ingredients[0]._id).toEqual(newIngredientId);
    })

    it('removeIngredient: should remove ingredient', () => {
        const ingredientUUID = '60d3b41abdacab0026a733cf_1';
        const action = {
            type: removeIngredient,
            payload: ingredientUUID,
        }
        const state = burgerReducer({...initialState, ingredients: [
                {
                    uuid: ingredientUUID
                }
            ]}, action);
        expect(state.ingredients.length).toEqual(0);
    })

    it('addBun: should add new bun', () => {
        const bunID = '60d3b41abdacab0026a733cf';
        const action = {
            type: addBun,
            payload: {
                _id: bunID,
            },
        }
        const state = burgerReducer(initialState, action);
        expect(state.bun).not.toBeNull();
    })

    it('changeIngredientPosition: should move ingredient before another', () => {
        const secondIngredientUUID = '60d3b41abdacab0026a733cd_2';
        const firstIngredientUUID = '60d3b41abdacab0026a733cd_1';
        const action = {
            type: changeIngredientPosition,
            payload: {
                ingredient: {
                    uuid: secondIngredientUUID,
                },
                before: firstIngredientUUID,
            }
        }
        const state = burgerReducer({...initialState, ingredients: [
                {
                    uuid: firstIngredientUUID
                },
                {
                    uuid: secondIngredientUUID
                }
            ]}, action);
        expect(state.ingredients[0].uuid).toEqual(secondIngredientUUID);
    })

    it('removeAllIngredients: clear state', () => {
        const action = {
            type: removeAllIngredients
        }
        const state = burgerReducer({
            ...initialState,
            ingredients: [
                {
                    uuid: '12312'
                },
                {
                    uuid: '55234234'
                }
            ],
            bun: {uuid: '7777'}
        }, action);
        expect(state).toEqual(initialState);
    })
});
