import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../../index';

export const socketMiddleware = (wsActions:any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let url = '';

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            const {
                wsConnect,
                wsDisconnect,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions;

            if (type.endsWith('/wsConnect')) {
                url = action.payload;
                socket = new WebSocket(url);
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch({ type: onOpen.type});
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch({type: onError.type, payload: event.code.toString()});
                    } else {
                        dispatch({type: onClose.type});
                    }
                };

                socket.onerror = error => {
                    dispatch({ type: onError.type, payload: JSON.stringify(error) });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage.type, payload: JSON.parse(data) });
                };

                if (type.endsWith('/wsDisconnect')) {
                    socket.close();
                }
            }

            next(action);
        };
    }) as Middleware;
};
