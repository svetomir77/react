import ingredientsReducer, {
    fetchIngredients,
    selectIngredient,
} from './ingredients';

describe('ingredients reducer actions', () => {
    const initialState = {
        items: [],
        isLoading: false,
        hasError: null,
        selected: null
    };
    const errorMessage = 'loading error';


    it('selectIngredient: should select ingredient', () => {
        const ingredientId = '60d3b41abdacab0026a733cd';
        const action = {
            type: selectIngredient,
            payload: {
                _id: ingredientId,
            }
        }
        const state = ingredientsReducer(initialState, action)
        expect(typeof state.selected === 'object').toEqual(true);
        expect(state.selected._id).toEqual(ingredientId);
    })

    it('fetchIngredients: should set status to "pending"', async () => {
        const action = { type: fetchIngredients.pending.type }
        const state = ingredientsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            isLoading: true,
            hasError: null,
        })
    })

    it('fetchIngredients: should set status to "fullfilled" with data', async () => {
        const payload = [{
            _id:"60d3b41abdacab0026a733c6"
        }];
        const action = { type: fetchIngredients.fulfilled.type, payload: payload }
        const state = ingredientsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: null,
            isLoading: false,
            items: payload,
        })
    })

    it('fetchIngredients: should set status to "failed"', async () => {
        const action = {
            type: fetchIngredients.rejected.type,
            payload: errorMessage
        }
        const state = ingredientsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: errorMessage,
            isLoading: false,
        })
    })

});
