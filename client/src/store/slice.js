import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, jwtToken: null };

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload !== undefined ? action.payload : !state.loading;
        },
        setJwtToken(state, action) {
            state.jwtToken = action.payload;
        }
    }
});

export const { setLoading, setJwtToken } = slice.actions;

export default slice.reducer;
