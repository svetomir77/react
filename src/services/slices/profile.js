import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postPasswordResetRequest, postPasswordResetUpdate} from "../../utils/api";

export const passwordResetRequest = createAsyncThunk(
    'profile/password-reset-request',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetRequest(params);
            return response.message;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const passwordResetUpdate = createAsyncThunk(
    'profile/password-reset-update',
    async (params, {rejectWithValue}) => {
        try {
            const response = await postPasswordResetUpdate(params);
            return response.message;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


const initialState = {
    message: null,
};

const pendingState = (state) => {
    state.isLoading = true;
    state.hasError = null;
}
const fulfilledState = (state, action) => {
    state.message = action.payload;
    state.isLoading = false;
    state.hasError = null;
}
const rejectedState = (state, action) => {
    state.isLoading = false;
    state.hasError = action.payload;
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(passwordResetRequest.pending, pendingState)
            .addCase(passwordResetRequest.fulfilled, fulfilledState)
            .addCase(passwordResetRequest.rejected, rejectedState)
            .addCase(passwordResetUpdate.pending, pendingState)
            .addCase(passwordResetUpdate.fulfilled, fulfilledState)
            .addCase(passwordResetUpdate.rejected, rejectedState);
    },
});

// export const {
//     getTotal,
// } = profileSlice.actions;
export default profileSlice.reducer;
