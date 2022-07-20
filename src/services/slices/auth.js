import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

export const authLogin = createAsyncThunk(
    'auth/login',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postLogin(params);
            setCookie('token', response.refreshToken || '');
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (params, {rejectWithValue}) => {
        try {
            const token = getCookie('token');
            const response = await postLogout({token: token});
            deleteCookie('token');
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
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
            return rejectWithValue(err.response.data);
        }
    }
);

export const passwordResetRequest = createAsyncThunk(
    'auth/passwordResetRequest',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetRequest(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const passwordResetUpdate = createAsyncThunk(
    'profile/passwordResetUpdate',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetUpdate(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const userUpdate = createAsyncThunk(
    'auth/userUpdate',
    async (params, {rejectWithValue}) => {
        try {
            const response = await updateUser(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const userCreate = createAsyncThunk(
    'auth/userCreate',
    async (params, {rejectWithValue}) => {
        try {
            const response = await createUser(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserAccess = createAsyncThunk(
    'auth/getUser',
    async (params, {rejectWithValue}) => {
        try {
            const response = await getUserRequest(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


const initialState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    message: null,
    isLoading: false,
    hasError: false,
};

const pendingState = (state) => {
    state.isLoading = true;
    state.hasError = null;
}
const fulfilledState = (state, action) => {
    state.message = action.payload.message || null;

    if (action.payload.user) {
        state.user = action.payload.user;
    }
    if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
    }
    if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
    }
    state.isLoading = false;
    state.hasError = null;
}
const rejectedState = (state, action) => {
    state.isLoading = false;
    state.hasError = action.payload;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearMessage(state, action) {
            state.message = '';
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
