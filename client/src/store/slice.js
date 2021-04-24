import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false };

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload !== undefined ? action.payload : !state.loading;
        }
    }
});

export const { setLoading } = slice.actions;

export default slice.reducer;
