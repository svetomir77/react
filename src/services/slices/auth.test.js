import authReducer, {
    authLogin,
    authLogout,
    authToken, clearMessage, getUserAccess,
    passwordResetRequest,
    passwordResetUpdate, userCreate,
    userUpdate
} from './auth';

describe('auth reducer actions', () => {
    const initialState = {
        accessToken: null,
        refreshToken: null,
        user: {
            email: '',
            name: '',
        },
        message: null,
        isLoading: false,
        hasError: false,
    };

    const pendingState = {
        ...initialState,
        isLoading: true,
        hasError: false,
    };

    const errorMessage = 'loading error';

    const errorState = {
        ...initialState,
        hasError: true,
        isLoading: false,
        message: errorMessage,
    }

    it('should initial state match', async () => {
        const action = { type: 'init' }
        const state = authReducer(undefined, action)
        expect(state).toEqual(initialState)
    })

    it('authLogin: should set status to "pending"', async () => {
        const action = { type: authLogin.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('authLogin: should set status to "fullfilled" with data', async () => {
        const payload = {
            accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDZhYTZhNDJkMzRhMDAxYzI3OWU0NiIsImlhdCI6MTY2MTkyMzAxNiwiZXhwIjoxNjYxOTI0MjE2fQ.3oiRtUQRo0xRiLfuz9AmgwmLIVQ6-_ylrXSJmSrGADY',
            refreshToken: 'ed5516dab7ff8b0d3248775a1e6531be1380da544c0540af2151c54a65a8a759d8213f6f3197de40',
            user: {
                email: 'svetomir7@yandex.ru',
                name: 'Светомир',
            }
        }
        const action = { type: authLogin.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            user: payload.user,
        })
    })

    it('authLogin: should set status to "failed"', async () => {
        const action = {
            type: authLogin.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('authToken: should set status to "pending"', async () => {
        const action = { type: authToken.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('authToken: should set status to "fullfilled" with token', async () => {
        const payload = {
            accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDZhYTZhNDJkMzRhMDAxYzI3OWU0NiIsImlhdCI6MTY2MTkyMzAxNiwiZXhwIjoxNjYxOTI0MjE2fQ.3oiRtUQRo0xRiLfuz9AmgwmLIVQ6-_ylrXSJmSrGADY',
            refreshToken: 'ed5516dab7ff8b0d3248775a1e6531be1380da544c0540af2151c54a65a8a759d8213f6f3197de40',
        }
        const action = { type: authToken.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
        });
    })

    it('authToken: should set status to "failed"', async () => {
        const action = {
            type: authToken.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('passwordResetRequest: should set status to "pending"', async () => {
        const action = { type: passwordResetRequest.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('passwordResetRequest: should set status to "fullfilled" with message', async () => {
        const payload = {
            message: 'Reset email sent',
        }
        const action = { type: passwordResetRequest.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            message: payload.message,
        })
    })

    it('passwordResetRequest: should set status to "failed"', async () => {
        const action = {
            type: passwordResetRequest.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('passwordResetUpdate: should set status to "pending"', async () => {
        const action = { type: passwordResetUpdate.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('passwordResetUpdate: should set status to "fullfilled" with message', async () => {
        const payload = {
            message: 'Password successfully reset',
        }
        const action = { type: passwordResetUpdate.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            message: payload.message,
        })
    })

    it('passwordResetUpdate: should set status to "failed"', async () => {
        const action = {
            type: passwordResetUpdate.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('userUpdate: should set status to "pending"', async () => {
        const action = { type: userUpdate.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('userUpdate: should set status to "fullfilled" with data', async () => {
        const payload = {
            user: {
                name: 'Вася',
                email: 'pupkin@yandex.ru',
                password: '!23ssfsDfs',
            },
        }
        const action = { type: userUpdate.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            user: payload.user,
        })
    })



    it('userUpdate: should set status to "failed"', async () => {
        const action = {
            type: userUpdate.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('userCreate: should set status to "pending"', async () => {
        const action = { type: userCreate.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('userCreate: should set status to "fullfilled" with data', async () => {
        const payload = {
            user: {
                name: 'Вася',
                email: 'pupkin@yandex.ru',
                password: '!23ssfsDfs',
            },
        }
        const action = { type: userCreate.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            user: payload.user,
        })
    })

    it('userCreate: should set status to "failed"', async () => {
        const action = {
            type: userCreate.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('getUserAccess: should set status to "pending"', async () => {
        const action = { type: userCreate.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('getUserAccess: should set status to "fullfilled" with data', async () => {
        const payload = {
            user: {
                name: 'Вася',
                email: 'pupkin@yandex.ru',
                password: '!23ssfsDfs',
            },
        }
        const action = { type: getUserAccess.fulfilled.type, payload: payload }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            ...initialState,
            hasError: false,
            isLoading: false,
            user: payload.user,
        })
    })

    it('getUserAccess: should set status to "failed"', async () => {
        const action = {
            type: getUserAccess.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('authLogout: should set status to "pending"', async () => {
        const action = { type: authLogout.pending.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(pendingState)
    })

    it('authLogout: should set status to "fullfilled" and reset data', async () => {
        const action = { type: authLogout.fulfilled.type }
        const state = authReducer(initialState, action)
        expect(state).toEqual(initialState);
    })

    it('authLogout: should set status to "failed"', async () => {
        const action = {
            type: authLogout.rejected.type,
            payload: errorMessage
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(errorState)
    })

    it('clearMessage: should set message to null', () => {
        const action = {
            type: clearMessage,
        }
        const state = authReducer({...initialState, message: 'Some message'}, action)
        expect(state).toEqual({
            ...initialState,
            message: null,
        })
    })
});
