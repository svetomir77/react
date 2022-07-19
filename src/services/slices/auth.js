import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    postLogin,
    postLogout,
    postPasswordResetRequest,
    postPasswordResetUpdate,
    postRegister,
    postToken
} from "../../utils/api";

export const authLogin = createAsyncThunk(
    'auth/login',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postLogin(params);
            return response.message;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postLogout(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const authRegister = createAsyncThunk(
    'auth/register',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postRegister(params);
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
            const response = await postToken(params);
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
    state.user = action.payload.user || null;
    state.accessToken = action.payload.accessToken || null;
    state.refreshToken = action.payload.refreshToken || null;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, pendingState)
            .addCase(authLogin.fulfilled, fulfilledState)
            .addCase(authLogin.rejected, rejectedState)
            .addCase(authLogout.pending, pendingState)
            .addCase(authLogout.fulfilled, fulfilledState)
            .addCase(authLogout.rejected, rejectedState)
            .addCase(authRegister.pending, pendingState)
            .addCase(authRegister.fulfilled, fulfilledState)
            .addCase(authRegister.rejected, rejectedState)
            .addCase(authToken.pending, pendingState)
            .addCase(authToken.fulfilled, fulfilledState)
            .addCase(authToken.rejected, rejectedState);
    },
});

export default authSlice.reducer;
