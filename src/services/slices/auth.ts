import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    createUser,
    getUserRequest,
    postLogin,
    postLogout,
    postPasswordResetRequest,
    postPasswordResetUpdate,
    postToken,
    updateUser
} from "../../utils/api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {TAuthState, TLogin, TToken, TUser} from "../../utils/types";

export const authLogin = createAsyncThunk(
    'auth/login',
    async (params: TLogin, {rejectWithValue}) => {
        try {
            const response = await postLogin(params);
            setCookie('token', response.refreshToken || '');
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (params, {rejectWithValue}) => {
        try {
            const token = getCookie('token') || null;
            const response = await postLogout({token: token});
            deleteCookie('token');
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const authToken = createAsyncThunk(
    'auth/token',
    async (params, {rejectWithValue}) => {
        try {
            const token = getCookie('token') || '';
            const response = await postToken({token: token});
            setCookie('token', response.refreshToken || '');
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const passwordResetRequest = createAsyncThunk(
    'auth/passwordResetRequest',
    async (params: Pick<TLogin, 'email'>, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetRequest(params);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const passwordResetUpdate = createAsyncThunk(
    'profile/passwordResetUpdate',
    async (params: Pick<TLogin, 'password'> & TToken, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetUpdate(params);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const userUpdate = createAsyncThunk(
    'auth/userUpdate',
    async (params: TToken & { body: TUser }, {rejectWithValue}) => {
        try {
            const response = await updateUser(params);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const userCreate = createAsyncThunk(
    'auth/userCreate',
    async (params: TUser, {rejectWithValue}) => {
        try {
            const response = await createUser(params);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getUserAccess = createAsyncThunk(
    'auth/getUser',
    async (params:TToken, action) => {
        const {rejectWithValue} = action;
        try {
            const response = await getUserRequest(params);
            return response;
        } catch (err:any) {
            return rejectWithValue(err);
        }
    }
);

const initialState:TAuthState = {
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

const pendingState = (state:TAuthState) => {
    state.isLoading = true;
    state.hasError = false;
}
const fulfilledState = (state:TAuthState, action: PayloadAction<TAuthState>) => {
    const {payload} = action;
    state.message = payload.message || null;

    if (payload.user) {
        state.user = payload.user;
    }
    if (payload.accessToken) {
        state.accessToken = payload.accessToken;
    }
    if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
    }
    state.isLoading = false;
    state.hasError = false;
}
const rejectedState = (state:TAuthState, action:any) => {
    state.isLoading = false;
    state.hasError = true;
    state.message = action.payload;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, pendingState)
            .addCase(authLogin.fulfilled, fulfilledState)
            .addCase(authLogin.rejected, rejectedState)

            .addCase(authLogout.pending, pendingState)
            .addCase(authLogout.fulfilled, () => initialState)
            .addCase(authLogout.rejected, rejectedState)

            .addCase(authToken.pending, pendingState)
            .addCase(authToken.fulfilled, fulfilledState)
            .addCase(authToken.rejected, rejectedState)

            .addCase(passwordResetRequest.pending, pendingState)
            .addCase(passwordResetRequest.fulfilled, fulfilledState)
            .addCase(passwordResetRequest.rejected, rejectedState)

            .addCase(passwordResetUpdate.pending, pendingState)
            .addCase(passwordResetUpdate.fulfilled, fulfilledState)
            .addCase(passwordResetUpdate.rejected, rejectedState)

            .addCase(userUpdate.pending, pendingState)
            .addCase(userUpdate.fulfilled, fulfilledState)
            .addCase(userUpdate.rejected, rejectedState)

            .addCase(userCreate.pending, pendingState)
            .addCase(userCreate.fulfilled, fulfilledState)
            .addCase(userCreate.rejected, rejectedState)

            .addCase(getUserAccess.pending, pendingState)
            .addCase(getUserAccess.fulfilled, fulfilledState)
            .addCase(getUserAccess.rejected, rejectedState);
    },
});
export const {
    clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
