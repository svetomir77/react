import {createSlice} from '@reduxjs/toolkit';
import {TFeedState, TIngredient, TIngredientsUid, TIngredientUid, TOrder} from "../../utils/types";

const initialState:TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    connecting: false,
    online: false,
    connectionError: null,
    selected: null,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        wsConnect(state, action) {
            state.connecting = true;
        },
        wsDisconnect(state) {
            state.online = false;
        },
        onOpen(state, action) {
            state.connecting = false;
            state.online = true;
        },
        onClose(state, action) {
            state.online = false;
        },
        onError(state, action) {
            state.online = false;
            state.connecting = false;
        },
        onMessage(state, action) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        select(state, action) {
          const {id, orders, ingredients} = action.payload;
            const [order] = orders && orders.filter((item: TOrder) => {
                return Number(item.number).toString() === Number(id).toString();
            });

            if (order) {
                const orderDetails = Object.assign({}, order);
                orderDetails.ingredients = [];
                orderDetails.price = 0;
                order.ingredients.forEach((id:string) => {
                        const [ingredient] = ingredients.filter((item: TIngredient) => item._id === id);

                        if (ingredient) {
                            orderDetails!.ingredients = [...orderDetails!.ingredients, ingredient];
                            orderDetails!.price += ingredient.price;
                        }
                    });
                state.selected = orderDetails;
            }
        },
        clearState: () => initialState,
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;
