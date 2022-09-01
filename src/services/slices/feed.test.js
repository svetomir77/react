import feedReducer, {
    feedActions,
} from './feed';

describe('feed reducer actions', () => {
    const initialState = {
        orders: [],
        total: 0,
        totalToday: 0,
        connecting: false,
        online: false,
        connectionError: null,
        selected: null,
    };

    it('wsConnect: should change connectin status to true', () => {
        const action = {
            type: feedActions.wsConnect,
        }
        const state = feedReducer(initialState, action)
        expect(state.connecting).toEqual(true);
    })

    it('wsDisconnect: should change online status to false', () => {
        const action = {
            type: feedActions.wsDisconnect,
        }
        const state = feedReducer(initialState, action)
        expect(state.online).toEqual(false);
    })

    it('onOpen: should change online status to true', () => {
        const action = {
            type: feedActions.onOpen,
        }
        const state = feedReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            connecting: false,
            online: true,
        });
    })

    it('onClose: should change online status to false', () => {
        const action = {
            type: feedActions.onClose,
        }
        const state = feedReducer(initialState, action)
        expect(state.online).toEqual(false);
    })

    it('onError: should change online status to false', () => {
        const action = {
            type: feedActions.onError,
        }
        const state = feedReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            connecting: false,
            online: false,
        });
    })

    it('onMessage: should receive data', () => {
        const payload = {
            orders: [{_id:'6310287642d34a001c2852c9'}],
            total: 1,
            totalToday: 1,
        };
        const action = {
            type: feedActions.onMessage,
            payload
        }
        const state = feedReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            orders: payload.orders,
            total: payload.total,
            totalToday: payload.totalToday,
        });
    })

    it('select: should select order from list', () => {
        const orderId = '63103f4242d34a001c2852ce';
        const orderNumber = '777';
        const ingredientNameOne = 'Choosen one';
        const ingredientNameTwo = 'Choosen two';
        const payload = {
            orders: [{
                _id: '3453434363636',
                number: '456',
                ingredients: [
                    "66",
                    "77",
                    "88",
                ]}, {
                _id: orderId,
                number: orderNumber,
                ingredients: [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                ]}],
            ingredients: [{
                _id: '1',
                name: 'some'
            }, {
                _id: '60d3b41abdacab0026a733c6',
                name: ingredientNameOne
            }, {
                _id: '60d3b41abdacab0026a733cd',
                name: ingredientNameTwo
            }],
            id: orderNumber,
        };
        const action = {
            type: feedActions.select,
            payload
        }
        const state = feedReducer(initialState, action)

        // должен быть объектом
        expect(typeof state.selected === 'object').toBe(true);

        // id должен совпадать с выбранным
        expect(state.selected._id).toEqual(orderId);

        // ингредиентов должно быть 2 (выбираем уникальные)
        expect(state.selected.ingredients.length).toEqual(2);

        // имена выбранных ингредиентов должны быть правильными
        expect(state.selected.ingredients[0].name).toEqual(ingredientNameOne);
        expect(state.selected.ingredients[1].name).toEqual(ingredientNameTwo);

        // count у второго должен быть 2, так как одинаковые суммируются
        expect(state.selected.ingredients[1].count).toEqual(2);
    })

    it('clearState: should reset state to default', () => {
        const action = {
            type: feedActions.clearState,
            payload: {
                connecting: true,
                orders: [{
                    id: 'ssdf',
                }],
            }
        }
        const state = feedReducer(initialState, action)
        expect(state).toEqual(initialState);
    })

});
