import orderDetailsReducer, {
    placeOrder,
    getTotal,
} from './order-details';

describe('order details reducer actions', () => {
    const initialState = {
        num: null,
        total: 0,
        isLoading: false,
        hasError: null,
    };
    const errorMessage = 'loading error';


    it('getTotal: should count total price', () => {
        const payload = {
            ingredients: [{
                price: 5
            }],
            bun: {
                price: 3
            },
        };
        const action = {
            type: getTotal,
            payload,
        }
        const state = orderDetailsReducer(initialState, action)
        expect(state.total).toEqual(11);
    })

    it('placeOrder: should set status to "pending"', async () => {
        const action = { type: placeOrder.pending.type }
        const state = orderDetailsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            isLoading: true,
            hasError: null,
        })
    })

    it('placeOrder: should set status to "fullfilled" with data', async () => {
        const orderNum = 345235;
        const action = { type: placeOrder.fulfilled.type, payload: orderNum }
        const state = orderDetailsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: null,
            isLoading: false,
            num: orderNum,
        })
    })

    it('placeOrder: should set status to "failed"', async () => {
        const action = {
            type: placeOrder.rejected.type,
            payload: errorMessage
        }
        const state = orderDetailsReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: errorMessage,
            isLoading: false,
        })
    })

});
